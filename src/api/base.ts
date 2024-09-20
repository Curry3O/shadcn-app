import { IDetailQuery, IDetailResponse } from '@/interfaces'

import { request } from '@/utils'

export const getDetails = (params: IDetailQuery) =>
  request<IDetailResponse>({
    url: '/v2/collect_picture/detail_images',
    params: params,
  })
