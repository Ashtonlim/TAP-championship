const BASE = 'http://localhost:8000'

export const createHeaders = (args) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...args,
})

export const createReqParams = (method = 'GET', body, headers = 'json') => {
  const params = {}
  if (method) params['method'] = method.toUpperCase()
  if (body) params['body'] = JSON.stringify(body)

  if (headers === 'json') {
    let addToHeaders = {}
    params['headers'] = createHeaders(addToHeaders)
    // console.log({ log: "factory.js", params, token: Authorization });
  }

  return params
}

export const resHandler = async (res) => {
  if (res.ok) {
    return await res.json()
  }

  console.log('@factory.js: res from server is not okay :(')
  const jsonResErr = await res.json()
  if (jsonResErr instanceof Object) {
    if ('message' in jsonResErr) {
      console.log(jsonResErr.message)
      throw new Error(jsonResErr.message)
    }
  }
}

export const getRegisteredTeams = async (teamsDetails) => {
  return resHandler(
    await fetch(`${BASE}/`, createReqParams('GET', teamsDetails))
  )
}

export const registerTeams = async (teamDetails) => {
  return resHandler(
    await fetch(`${BASE}/teams`, createReqParams('POST', teamDetails))
  )
}
