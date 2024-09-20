import { useEffect, useRef } from 'react'

/**
 * 用于判断组件是否是首次渲染
 * @returns {boolean} 返回布尔值，表示组件是否是首次渲染
 */
export function useIsFirstRender() {
  // 记录组件是否是首次渲染的状态
  const isFirst = useRef(true)

  useEffect(() => {
    // 在组件挂载后，将状态置为 false，表示组件已经不是首次渲染了
    isFirst.current = false
  }, [])

  // 返回组件是否是首次渲染的状态
  return isFirst.current
}
