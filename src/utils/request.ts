import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import cookie from 'js-cookie'

import { IApiResponse } from '@/interfaces'

import { deleteEmptyKey } from '@/utils'

// 判断是否是超时错误
const isTimeoutError = (error: unknown): error is AxiosError => {
  return axios.isAxiosError(error) && error.code === 'ECONNABORTED' && error.message.includes('timeout')
}

const token = import.meta.env.DEV ? import.meta.env.REACT_APP_LOCAL_TOKEN : cookie.get('token')

const instance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_HOST,
  headers: {
    token,
  },
  timeout: 15000,
})

instance.interceptors.request.use(
  (config) => {
    const params = deleteEmptyKey(config.params)
    config.params = params
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      console.log('服务异常')
    }
    if (response.data.code && response.data.code !== 200) {
      // 未登录
      if ([403, 10001].includes(response.data.code)) {
        document.location.href = import.meta.env.REACT_APP_LOGIN_HOST
      } else {
        console.log('response.data.msg: ', response.data.msg)
      }
      return Promise.reject(response.data)
    }
    return response
  },
  (error) => {
    // 提示
    return Promise.reject(error)
  },
)

export async function request<T>(config: AxiosRequestConfig): Promise<T>
export async function request<T>(config: AxiosRequestConfig, isReturnAllRes?: boolean): Promise<AxiosResponse<T>>
export async function request<T>(
  config: AxiosRequestConfig,
  isReturnAllRes?: boolean,
  isReturnAllResData?: boolean,
  retries?: number,
): Promise<IApiResponse<T>>
export async function request<T>(
  config: AxiosRequestConfig,
  isReturnAllRes?: boolean,
  isReturnAllResData?: boolean,
  retries: number = 3, // 设定默认的重试次数为3
): Promise<T | IApiResponse<T> | AxiosResponse<IApiResponse<T>>> {
  try {
    const res = await instance.request<IApiResponse<T>>(config)
    // 返回整个请求体
    if (isReturnAllRes) {
      return res
    }
    // 返回请求体中的数据
    if (isReturnAllResData) {
      return res.data
    }
    return res.data.data
  } catch (error) {
    if (isTimeoutError(error) && retries > 0) {
      console.log(`请求超时，剩余重试次数：${retries}，正在重试...`)

      // 延迟1秒后重试，避免立即重试可能遇到的相同网络问题
      return new Promise((resolve) =>
        setTimeout(() => resolve(request(config, isReturnAllRes, isReturnAllResData, retries - 1)), 1000),
      )
    } else {
      // 非超时错误或重试次数已用完，抛出错误
      throw error
    }
  }
}
