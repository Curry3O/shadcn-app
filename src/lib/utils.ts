import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并并处理类名
 * 使用 `clsx` 生成类名字符串，并使用 `twMerge` 合并 Tailwind CSS 类
 * 能够处理字符串、对象或数组形式的类名，并合并重复的 Tailwind CSS 类
 *
 * @param inputs 类名的不同格式，可以是字符串、对象或数组
 * @returns 返回处理后的类名字符串，适用于 className 属性
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
