import { queryClient } from '@/libs/query-client'
import { luckyDrawService } from '@/services/luckydraw'
import { LoaderFunction } from 'react-router-dom'

export const getLuckyDrawQuery = (id: number) => {
  const queryKey = ['lucky-draw', id]
  return {
    queryKey,
    queryFn: () => luckyDrawService.getLuckyDrawById(id)
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) throw new Error('Missing lucky draw id')
  const id = parseInt(params.id)
  const luckyDrawQuery = getLuckyDrawQuery(id)

  const data = await queryClient.fetchQuery(
    luckyDrawQuery.queryKey,
    luckyDrawQuery.queryFn
  )

  if (!data) {
    throw new Response('Lucky draw not found', { status: 404 })
  }

  return data
}
