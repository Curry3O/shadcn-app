import { Fragment, useState } from 'react'

import { ModeToggle } from '@/components/base/ModeToggle'
import { Button } from '@/components/ui/button'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <ModeToggle />
      <h1 className="my-2">Vite + React</h1>
      <div className="card">
        <Button className="my-2" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </Fragment>
  )
}

export default Home
