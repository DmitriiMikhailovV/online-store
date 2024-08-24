import { Token } from '@/utils/interfaces'

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

export const capitalizeLettersStrings = (input: string | string[]): string => {
  if (typeof input === 'string') {
    return input.charAt(0).toUpperCase() + input.slice(1)
  } else if (Array.isArray(input)) {
    return input.map((word) => word.charAt(0).toUpperCase()).join('')
  }
  return ''
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export const formatPurchaseDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return new Date(date).toLocaleDateString('en-US', options)
}
