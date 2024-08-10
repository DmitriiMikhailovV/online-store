interface Token {
  sub: number
  user: string
  iat: number
}

export const decodeToken = (token: string): Token => {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Invalid token format')
  }

  const payloadBase64 = parts[1]
  const payloadJson = atob(payloadBase64)
  const payload = JSON.parse(payloadJson)
  return payload
}

export const capitalizeFirstLetter = (input: string): string => {
  if (input.length === 0) return input
  return input.charAt(0).toUpperCase() + input.slice(1)
}
