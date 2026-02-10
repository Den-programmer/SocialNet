export type Nullable<T> = null | T 

export type ResolvedImage = {
  url: string
  revoke?: () => void
}