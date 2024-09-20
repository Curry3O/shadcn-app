import { useEffect, useRef } from 'react'

import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/index.css'
import '@logicflow/core/es/index.css'
import { Control } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'

import { data, SilentConfig, styleConfig } from './config'

export default function App() {
  const refContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (refContainer.current) {
      const lf = new LogicFlow({
        container: refContainer.current,
        grid: true,
        height: 600,
        ...SilentConfig,
        ...styleConfig,
        plugins: [Control],
      })
      lf.render(data)
      lf.translateCenter()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="App" ref={refContainer}></div>
}
