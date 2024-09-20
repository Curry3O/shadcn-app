import { Component, ErrorInfo } from 'react'

import { Button } from '@/components'

interface IProps {
  children: React.ReactNode
}

export class ErrorBoundary extends Component<IProps> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo })

    return { hasError: true }
  }

  onRefreshClick = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-center h-full w-full flex-col gap-4">
          <h2 className="text-words-title text-24 font-600">oops...发生一些未知错误</h2>
          <p className="text-words-secondary text-14">请尝试刷新页面恢复操作</p>
          <Button className="w-16" onClick={this.onRefreshClick}>
            刷新
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
