import { FileSizeUnit } from '@/interfaces';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
export function convertFileSize(
  size: number,
  fromUnit: FileSizeUnit,
  toUnit: FileSizeUnit,
  decimalPoint = 2
) {
  // 定义单位与字节之间的转换关系
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  // 获取初始单位和目标单位的索引
  const fromIndex = units.indexOf(fromUnit);
  const toIndex = units.indexOf(toUnit);

  // 如果单位不在列表中，抛出错误
  if (fromIndex === -1 || toIndex === -1) {
    throw new Error('Invalid units');
  }

  // 计算初始单位与目标单位之间的转换系数
  const exponent = toIndex - fromIndex;
  // 计算结果大小
  const resultSize = size / Math.pow(1024, exponent);

  // 返回格式化后的结果
  return parseFloat(resultSize.toFixed(decimalPoint)) + ' ' + toUnit;
}

/**
 * 创建一个日志工具，该工具提供格式化日志打印功能，支持不同类型的消息，包括普通信息、警告、错误和成功消息。
 * 在开发模式下提供美化打印，在生产模式下则不打印任何日志，以优化性能。
 * @returns 返回一个包含不同日志打印方法（info, error, warning, success, picture）的对象。
 */
export function prettyLog() {
  // 判断当前环境是否为生产模式。
  const isProduction = import.meta.env.MODE === 'production';

  /**
   * 判断传入的值是否为空。
   * @param {any} value 需要判断的值。
   * @returns {boolean} 如果值为null、undefined或空字符串，则返回true；否则返回false。
   */
  const isEmpty = (value: unknown) => value == null || value === '';

  /**
   * 根据指定的标题和文本内容，以及颜色，打印美化的日志信息。
   * @param {string} title 日志信息的标题。
   * @param {string} text 日志信息的文本内容。
   * @param {string} color 用于日志信息的颜色。
   */
  const prettyPrint = (title: string, text: string, color: string) => {
    if (isProduction) return;
    console.log(
      `%c ${title} %c ${text}`,
      `background:${color}; border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`
    );
  };

  /**
   * 打印一个信息级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#197afa'] color 用于日志信息的颜色。
   */
  const info = (textOrTitle: string, content = '', color = '#197afa') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, color);
  };

  /**
   * 打印一个错误级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#F56C6C'] color 用于日志信息的颜色。
   */
  const error = (textOrTitle: string, content = '', color = '#F56C6C') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, color);
  };

  /**
   * 打印一个警告级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#E6A23C'] color 用于日志信息的颜色。
   */
  const warning = (textOrTitle: string, content = '', color = '#E6A23C') => {
    const title = isEmpty(content) ? 'Warning' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, color);
  };

  /**
   * 打印一个成功级别的日志。
   * @param {string} textOrTitle 日志的标题或文本。
   * @param {string} [content=''] 日志的正文内容。如果未提供，textOrTitle被视为文本内容。
   * @param {string} [content='#67C23A'] color 用于日志信息的颜色。
   */
  const success = (textOrTitle: string, content = '', color = '#67C23A') => {
    const title = isEmpty(content) ? 'Success' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, color);
  };

  /**
   * 在控制台显示一张图片。
   * @param {string} url 图片的URL地址。
   * @param {number} [scale=1] 图片的缩放比例，默认为1。
   */
  const picture = (url: string, scale = 1) => {
    if (isProduction) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = canvas.toDataURL('image/png');

        console.log(
          `%c sup?`,
          `font-size: 1px;
              padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor(
            (img.width * scale) / 2
          )}px;
              background-image: url(${dataUri});
              background-repeat: no-repeat;
              background-size: ${img.width * scale}px ${img.height * scale}px;
              color: transparent;
              `
        );
      }
    };
    img.src = url;
  };

  // 返回对象，封装了不同的日志功能。
  return { info, error, warning, success, picture };
}
