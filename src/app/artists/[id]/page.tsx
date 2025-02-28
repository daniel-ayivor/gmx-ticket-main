import ArtistDetailPage from '@/components/pages/ArtistDetailPage/page'
import React from 'react'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function ArtistDetail(prop: Props) {
  return <ArtistDetailPage id={prop?.params?.id} />
}
