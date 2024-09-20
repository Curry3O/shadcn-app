import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'

import { SvgPageNotFound } from '@/assets/svg'

const NoMatch: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex-center my-4 flex-1 flex-col gap-4 bg-white">
      <SvgPageNotFound className="h-50 w-100" />

      <section className="flex-center text-words-link flex-col gap-2">
        <div className="text-30 font-500">Page Not Found</div>
        <div>Sorry, we could not fnd the page you are looking for</div>
      </section>

      <Button variant="destructive" size="sm" className="w-20" onClick={() => navigate('/', { replace: true })}>
        返回
      </Button>
    </div>
  )
}

export default NoMatch
