import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../BLL/redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectIsAuthStatus } from '../BLL/selectors/auth-selectors'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useAuthRedirect = () => {
  const isAuth = useAppSelector(selectIsAuthStatus)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) navigate('/login')
  }, [isAuth, navigate])
}