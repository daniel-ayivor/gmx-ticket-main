import NewEventDetailPage from '@/components/pages/EventDetailPage/NewEventDetailPage'
import React from 'react'

type Props = {
  params: { id: string }
}

const EventDetail = (props: Props) => {
  return <NewEventDetailPage id={props?.params?.id} />
}

export default EventDetail