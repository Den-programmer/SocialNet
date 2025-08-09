import { NavLink } from 'react-router-dom'
import classes from './help.module.scss'
import { format, parseISO } from 'date-fns'

export const createFriendsNavBtn = (hint: string, link: string, nameOfBtn: string) => {
    return (
        <NavLink title={hint} className={classes.friends_button} to={link}>
            {nameOfBtn}
        </NavLink>
    )
}

export const createReviewChangesBtn = (func: (...args: any[]) => void, url?: string, error?: string, currentPageUrl?: string) => {
    const hasError = error && error !== ''
    const currentPageUrlCheckout = currentPageUrl ? currentPageUrl : '/'
    return (
        <NavLink onClick={func} to={hasError ? currentPageUrlCheckout : url ? url : currentPageUrlCheckout}>
            {/* <div>Rewiew Change</div> # */}
        </NavLink>
    )
}

export const formatDate = (dateString: string): string => {
    const date = parseISO(dateString)
    return format(date, 'dd/MM/yyyy')
}

export const scrollToTop = (topNumber: number = 0) => {
    window.scrollTo({
        top: topNumber,
        behavior: 'smooth'
    });
}

export const bufferToUrl = (
  input:
    | ArrayBuffer
    | Uint8Array
    | { type: 'Buffer'; data: number[] }
    | { data: any },  // any, чтобы ловить вложенность
  contentType: string
): string => {

  let byteArray: Uint8Array

  if (input instanceof Uint8Array) {
    byteArray = input
  } else if ('data' in input) {
    // Проверяем вложенность data.data
    if (Array.isArray(input.data)) {
      byteArray = new Uint8Array(input.data)
    } else if (input.data && Array.isArray(input.data.data)) {
      byteArray = new Uint8Array(input.data.data)
    } else {
      throw new Error('Unsupported nested buffer input format')
    }
  } else if (input instanceof ArrayBuffer) {
    byteArray = new Uint8Array(input)
  } else {
    throw new Error('Unsupported buffer input format')
  }

  const arrayBuffer = new ArrayBuffer(byteArray.byteLength)
  const view = new Uint8Array(arrayBuffer)
  view.set(byteArray)

  const blob = new Blob([arrayBuffer], { type: contentType })

  return URL.createObjectURL(blob)
}