import { OrderType } from "./eventTypes"

export type UserType = {
    id: number
    username: string
    email: string
    first_name: string
    last_name:  string
    profile_picture: string | null,
    phone_number: string | null,
    bio: string | null,
    location:  string | null,
   orders: OrderType[]
   access_token?: string,
   refresh_token?: string
}