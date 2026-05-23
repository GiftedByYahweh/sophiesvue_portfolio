async function handleFetchResponse(response) {
  const result = await response.json()
  return {
    ok: response.ok,
    message: result.message,
    data: result.data,
  }
}

export const createTransport = (baseUrl) => ({
  get: async (url, params) => {
    try {
      const fullUrl = `${baseUrl}${url}`
      const response = await fetch(fullUrl, {
        ...params,
        credentials: "include",
      })
      return handleFetchResponse(response)
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        data: null,
        message: "Щось пішло не так",
      }
    }
  },
  post: async (url, data) => {
    try {
      const fullUrl = `${baseUrl}${url}`
      const headers = {}
      const isFormData = data instanceof FormData
      const payload = isFormData ? data : JSON.stringify(data)
      if (!isFormData && data !== undefined) {
        headers["Content-Type"] = "application/json"
      }
      const response = await fetch(fullUrl, {
        method: "POST",
        credentials: "include",
        headers,
        body: payload,
      })
      return handleFetchResponse(response)
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        data: null,
        message: "Щось пішло не так",
      }
    }
  },
  patch: async (url, data) => {
    try {
      const fullUrl = `${baseUrl}${url}`
      const headers = {}
      const isFormData = data instanceof FormData
      const payload = isFormData ? data : JSON.stringify(data)
      if (!isFormData && data !== undefined) {
        headers["Content-Type"] = "application/json"
      }
      const response = await fetch(fullUrl, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: payload,
      })
      return handleFetchResponse(response)
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        data: null,
        message: "Щось пішло не так",
      }
    }
  },
  delete: async (url) => {
    try {
      const fullUrl = `${baseUrl}${url}`
      const response = await fetch(fullUrl, {
        method: "DELETE",
        credentials: "include",
      })
      return handleFetchResponse(response)
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        data: null,
        message: "Щось пішло не так",
      }
    }
  },
})
