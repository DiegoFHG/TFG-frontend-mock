type FetchFunction = (url: string, options?: RequestInit) => Promise<Response>;

function fetchBaseUrl(): FetchFunction {
  const baseUrl = "http://localhost:4000"

  return function(url: string, options?: any)  {
    const fullUrl = new URL(url, baseUrl)

    return fetch(fullUrl, options)
  }
}


const http: FetchFunction = fetchBaseUrl()


export default http
