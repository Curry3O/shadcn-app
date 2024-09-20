import { Suspense } from 'react'

import { ShadcnRouter } from '@/router'

import { Loading, ThemeProvider } from '@/components'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Suspense fallback={<Loading />}>
        <ShadcnRouter />
      </Suspense>
    </ThemeProvider>
  )
}

export default App
