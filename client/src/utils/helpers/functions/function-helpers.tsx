import { NavLink } from 'react-router-dom'
import classes from './help.module.scss'
import { format, parseISO } from 'date-fns'
import { ResolvedImage } from '../../../types/AppTypes/appTypes'

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
  input: any,
  contentType: string
): ResolvedImage => {
  const byteArray =
    input instanceof Uint8Array
      ? input
      : new Uint8Array(input.data?.data || input.data || input)

  const blob = new Blob([byteArray], { type: contentType })
  const url = URL.createObjectURL(blob)

  return {
    url,
    revoke: () => URL.revokeObjectURL(url)
  }
}