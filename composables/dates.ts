import {formatDistanceToNow} from 'date-fns'

export function fromUnixTimestampToDate(unixTimestamp: number): Date {
  return new Date(unixTimestamp * 1000)
}

export function getRelativeDate(date: Date) {
  return formatDistanceToNow(date, {addSuffix: true, includeSeconds: true})
}
