const url = process.env.NEXT_PUBLIC_BASE_API_URL

export const API_URL = Object.freeze({
  /** AREA TUNES API Base URL */
  BASE_URL: url ?? "https://00ab-2c0f-2a80-7b2-b310-e18e-8650-d77f-b6e8.ngrok-free.app/api"
})
