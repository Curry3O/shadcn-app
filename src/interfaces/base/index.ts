export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'

/**
 * 接口返回的数据类型
 */
export interface IApiResponse<T> {
  code: number
  data: T
  msg: string
}

export interface IDetailQuery {
  /** 商品skc_id */
  skc_id: string
  /** 详见上面接口描述 */
  origin?: string
}

export interface IDetailResponse {
  /** 2用户skc改款数量 */
  total: number
  /** 生成失败的图片数量 */
  failed_count: number
}
