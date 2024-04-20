import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const shortenWords = (str: string, length = 15) => {
  let result = ''
  if (str.length > length) {
    result = str.substr(0, length - 2) + '...'
  } else {
    result = str
  }
  return result
}
