import { banknotesType } from './types'

export const clearValue = (valueNew: string | number, valueOld: string) => {
  const val = valueOld[0] === '0' || valueOld[0] === ',' ? '' : valueOld

  if (valueNew.toString().match(/\d/g)) {
    return `${val}${valueNew}`
  }

  if (valueNew === ',' && (val?.match(/,/g)?.length || 0) < 1) {
    return `${val}${valueNew}`
  }

  if (valueNew === 'Backspace' || valueNew === '<') {
    return val.slice(0, val.length - 1)
  }

  return val
}

export const amountBanknotes = (banknotes: banknotesType) => {
  return Object.keys(banknotes)
    .map(Number)
    .reduce((res: number, key: number) => (res += banknotes[key] * key), 0)
}
