import useSWR, { SWRResponse } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { API_URL } from '../../common'

type UseConditionalFetchDataTypes = {
  condition: unknown
  endpoint: string
  token?: string
  refreshInterval?: number
}

type UseConditionalFetchDataTypesV2 = {
  condition: any
  endpoint: string
  token?: string
  refreshInterval?: number
}

export const fetcher = async (url: string, token?: string) => {
  const headers: any = token ? {
    Authorization: `Bearer ${token}`
  } : {}


  const response = await fetch(url, {
    headers,
    credentials: 'include'
  })

  const textResponse = await response.text() // Get response as text

  if (!response.ok) {
    throw new Error(textResponse) // Throw the response text in case of errors
  }

  return JSON.parse(textResponse) // Attempt to parse JSON
}



/** @description Fetches data from an endpoint
 * @param endpoint - The endpoint to fetch data from
 * @param token
 *
 * @example
 * const { data, error, mutate } = useFetchData("user")
 */
export const useFetchData = <ReturnData>(endpoint: string) => {
  const { data, error, mutate, isLoading } = useSWR<ReturnData>(
    `${API_URL.BASE_URL}/${endpoint}`,
    fetcher,
    {
      keepPreviousData: false,
      revalidateOnFocus: false,  // Prevent refetching on focus
      revalidateOnReconnect: false, // Prevent refetching on reconnect
    }
  )
  return { data, error, mutate, isLoading }
}



/** @description Fetches data from an endpoint if a condition is met
 * @param condition - The condition to check before fetching data
 * @param endpoint - The endpoint to fetch data from
 * @param token - The token to use for authentication (optional)
 * @example
 * const { data, error, mutate } = useConditionalFetchData({
 *   condition: user,
 *   endpoint: "user",
 *   token: "token"
 * });
 */
export const useConditionalFetchData = <ReturnData>(
  props: UseConditionalFetchDataTypes
) => {
  const { condition, endpoint, token } = props

  const fetchWithToken = ([url, token]: [string, string]) =>
    fetcher(url, token)

  const { data, error, mutate, isLoading } = useSWR(
    condition ? [`${API_URL.BASE_URL}/${endpoint}`, token] : null,
    fetchWithToken,
    {
      keepPreviousData: false,
      revalidateOnFocus: false,  // Prevent refetching on focus
      revalidateOnReconnect: false, // Prevent refetching on reconnect
    }
  ) as SWRResponse<ReturnData>

  const isLoadingInitialData = !data && !error

  return { data, error, mutate, isLoading, isLoadingInitialData }
}

export const useFetchPaginatedDataUpdated = <ReturnData>(
  props: UseConditionalFetchDataTypesV2 & {
    per_page?: number
  }
) => {
  const { condition, endpoint, token } = props

  // Define the fetcher function with token handling
  const fetcher = async (url: string) => {
    const headers: { [key: string]: string } = token ? { Authorization: `Bearer ${token}` } : {}

    const response = await fetch(url, { headers })

    // Debugging information
    const textResponse = await response.text() // Get response as text

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${textResponse}`)
    }

    try {
      return JSON.parse(textResponse) // Attempt to parse JSON
    } catch (e) {
      throw new Error(`Invalid JSON response: ${textResponse}`)
    }
  }

  /** A function to get the SWR key of each page, its return value will be accepted by `fetcher` */
  const getKey = (pageIndex: number) => {
    /** first page is 1, not 0, so we add 1 to the page index because the default page index is 0 */
    const page = pageIndex + 1

    // The endpoint to fetch data from
    let final_endpoint = `${API_URL.BASE_URL}/${endpoint}`

    if (final_endpoint.includes("?")) {
      final_endpoint += `&page=${page}`
    } else {
      final_endpoint += `?page=${page}`
    }

    return condition ? final_endpoint : null
  }

  // SWR hook to fetch infinite data from the API
  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,  // Prevent refetching on focus
      revalidateOnReconnect: false, // Prevent refetching on reconnect
    }
  )

  const response = data ? ([] as Array<any>).concat(...data) : []

  const isLoadingInitialData = !data && !error

  const lastDataItem = data?.[data.length - 1]
  const lastDataItemLength = lastDataItem?.data?.length

  const firstDataItemLength = data?.[0]?.data?.length

  const isLoadingMore =
    isValidating && data && lastDataItem && lastDataItemLength > 0
  const isEmpty = firstDataItemLength === 0
  const isReachingEnd = isEmpty || (data && lastDataItemLength < 9)

  const mapDataInObject = (field: string) => {
    const data = response.map((item) => item?.[field])
    return data?.[0]
  }

  return {
    /** The data returned by the API is an array of objects */
    data: {
      data: response.map((item) => item.data).flat(),
      message: mapDataInObject("message"),
      status: mapDataInObject("status"),
      meta: mapDataInObject("meta"),
    } as ReturnData,
    /** The function to mutate or refresh the data */
    mutate,
    /** The error returned by the API */
    error,
    /** The number of pages loaded so far, this is used to determine if there are more pages to load. */
    size,
    /** A function to load more pages, this is used to trigger the loading of more pages. */
    setSize,
    /** A boolean to determine if the initial data is loading, this is used to show a loading indicator. */
    isLoadingInitialData,
    /** A boolean to determine if more data is loading, this is used to show a loading indicator.*/
    isLoadingMore,
    /**
     * A boolean to determine if there are more pages to load,
     * this is used to determine if the "Load More" or "Next Page"
     * button should be shown.
     * */
    isReachingEnd,
  }
}