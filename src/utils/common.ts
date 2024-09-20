import { FileSizeUnit } from '@/interfaces'

/**
 * 删除对象中value为空字符串、undefined、null、空数组的key，并返回删除后的对象
 * @param T extends Object
 * @returns T
 */
export function deleteEmptyKey<T>(obj: T): T {
  const newObj = { ...obj }
  for (const objKey in newObj) {
    const value = newObj[objKey]
    if (value === '' || value === undefined || value === null || (Array.isArray(value) && value.length === 0)) {
      delete newObj[objKey]
    }
  }
  return newObj
}

/**
 * 检查提供的值是否不为空
 *
 * 不为空的条件包括：
 * - 不是 null 或 undefined
 * - 如果是数组，不能是空数组
 * - 如果是对象（排除数组和日期对象），不能是空对象
 *
 * @param {any} value 要检查的值
 * @returns {boolean} 如果值不为空返回true，否则返回false
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNotEmpty(value: any): boolean {
  // 检查值是否为 null 或 undefined
  if (value === null || value === undefined) return false

  // 检查值是否为数组，且不为空
  if (Array.isArray(value) && value.length === 0) return false

  // 检查值是否为对象，且不为空（先确保它不是日期对象或其他非对象类型的实例）
  if (typeof value === 'object' && value.constructor === Object && Object.keys(value).length === 0) return false

  // 对于其他所有情况，值均不为空
  return true
}

/**
 * 实现千位分隔符
 * @param num 数值
 * @returns string
 */
export function toThousands(num: number) {
  // 将数字转换为字符串并分割整数和小数部分
  const parts = num.toString().split('.')
  // 获取整数部分，并将其添加千分位分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  // 重新组合为有逗号的字符串
  return parts.join('.')
}

/**
 * 高亮搜索词
 * @param {string} str 需要处理的字符串
 * @param {string} searchTerm 搜索词，不区分大小写。若未提供，将返回原字符串
 * @param {string} color 高亮文本的颜色，默认为 'red'
 * @param {boolean} forceHighlight 是否强制应用高亮颜色（即使存在其他样式规则），默认为 false
 * @returns 返回加工后的HTML字符串，其中搜索词被一个含有指定颜色样式的<span>标签包围
 */
export function highlightSearchTerm(str: string, searchTerm?: string, color = 'red', forceHighlight = false) {
  // 若未提供搜索词，直接返回原字符串
  if (!searchTerm) return str
  // 将字符串中的特殊正则字符前加上反斜杠进行转义
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // 使用正则表达式构造一个模式，匹配时不区分大小写
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')
  // 将匹配的搜索词替换为含有指定颜色样式的<span>标签
  return str.replace(regex, `<span style="color:${color}${forceHighlight ? ' !important' : ''};">$1</span>`)
}

/**
 * 获取当前浏览器名称
 * @returns 浏览器名称
 */
export function getBrowserName(): string {
  const userAgent: string = navigator.userAgent.toLowerCase()

  if (userAgent.includes('chrome')) {
    return 'Chrome'
  } else if (userAgent.includes('firefox')) {
    return 'Firefox'
  } else if (userAgent.includes('safari')) {
    return 'Safari'
  } else if (userAgent.includes('edge')) {
    return 'Edge'
  } else if (userAgent.includes('opera') || userAgent.includes('opr')) {
    return 'Opera'
  } else if (userAgent.includes('ucbrowser')) {
    return 'UC'
  } else if (userAgent.includes('MSIE')) {
    return 'MSIE'
  } else if (userAgent.includes('qqbrowser')) {
    return 'QQ'
  } else if (userAgent.includes('micromessenger')) {
    return 'WeChat'
  } else {
    return 'Unknown'
  }
}

/**
 * 滚动到指定位置
 * @param target 滚动目标，默认为'#sub-root'
 * @param options 滚动选项
 */
export function scrollToPosition(
  target = '#sub-root',
  options: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' },
) {
  const targetElement = document.querySelector(target)

  if (targetElement instanceof Element) {
    targetElement.scrollTo(options)
  }
}

/**
 * 滚动至指定目标
 * @param target 目标元素的选择器
 * @param options 滚动选项
 */
export function scrollIntoTarget(
  target: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' },
) {
  const targetElement = document.querySelector(target)

  if (targetElement instanceof Element) {
    targetElement.scrollIntoView(options)
  }
}

/**
 * 将文件大小从一个单位转换为另一个单位。
 *
 * @param {number} size 文件大小。
 * @param {FileSizeUnit} fromUnit 初始单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {FileSizeUnit} toUnit 目标单位（'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'）。
 * @param {number} [decimalPoint=2] 结果保留的小数位数，默认为2。
 * @return {string} 转换后的文件大小，带单位。
 */
export function convertFileSize(size: number, fromUnit: FileSizeUnit, toUnit: FileSizeUnit, decimalPoint = 2) {
  // 定义单位与字节之间的转换关系
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  // 获取初始单位和目标单位的索引
  const fromIndex = units.indexOf(fromUnit)
  const toIndex = units.indexOf(toUnit)

  // 如果单位不在列表中，抛出错误
  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid units')
  }

  // 计算初始单位与目标单位之间的转换系数
  const exponent = toIndex - fromIndex
  // 计算结果大小
  const resultSize = size / Math.pow(1024, exponent)

  // 返回格式化后的结果
  return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit
}

/**
 * 创建一个日志工具，该工具提供格式化日志打印功能，支持不同类型的消息，包括普通信息、警告、错误和成功消息。
 * 在开发模式下提供美化打印，在生产模式下则不打印任何日志，以优化性能。
 * @returns 返回一个包含不同日志打印方法（info, error, warning, success, picture）的对象。
 */
export function prettyLog() {
  // 判断当前环境是否为生产模式。
  const isProduction = import.meta.env.MODE === 'production'

  /**
   * 判断传入的值是否为空。
   * @param {any} value 需要判断的值。
   * @returns {boolean} 如果值为null、undefined或空字符串，则返回true；否则返回false。
   */
  const isEmpty = (value: unknown) => value == null || value === ''

  /**
   * 根据指定的标题和文本内容，以及颜色，打印美化的日志信息。
   * @param {string} title 日志信息的标题。
   * @param {string} text 日志信息的文本内容。
   * @param {string} color 用于日志信息的颜色。
   */
  const prettyPrint = (title: string, text: string, color: string) => {
    if (isProduction) return
    console.log(
      `%c ${title} %c ${text}`,
      `background:${color}; border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
    )
  }

  /**
   * 打印一个信息级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#197afa'] color 用于日志信息的颜色。
   */
  const info = (textOrTitle: string, content = '', color = '#197afa') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, color)
  }

  /**
   * 打印一个错误级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#F56C6C'] color 用于日志信息的颜色。
   */
  const error = (textOrTitle: string, content = '', color = '#F56C6C') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, color)
  }

  /**
   * 打印一个警告级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#E6A23C'] color 用于日志信息的颜色。
   */
  const warning = (textOrTitle: string, content = '', color = '#E6A23C') => {
    const title = isEmpty(content) ? 'Warning' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, color)
  }

  /**
   * 打印一个成功级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#67C23A'] color 用于日志信息的颜色。
   */
  const success = (textOrTitle: string, content = '', color = '#67C23A') => {
    const title = isEmpty(content) ? 'Success' : textOrTitle
    const text = isEmpty(content) ? textOrTitle : content
    prettyPrint(title, text, color)
  }

  /**
   * 在控制台显示一张图片。
   * @param {string} url 图片的URL地址。
   * @param {number} [scale=1] 图片的缩放比例，默认为1。
   */
  const picture = (url: string, scale = 1) => {
    if (isProduction) return
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.fillStyle = 'red'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        const dataUri = canvas.toDataURL('image/png')

        console.log(
          `%c sup?`,
          `font-size: 1px;
              padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
              background-image: url(${dataUri});
              background-repeat: no-repeat;
              background-size: ${img.width * scale}px ${img.height * scale}px;
              color: transparent;
              `,
        )
      }
    }
    img.src = url
  }

  // 返回对象，封装了不同的日志功能。
  return { info, error, warning, success, picture }
}
