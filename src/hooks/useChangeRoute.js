import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function useChangeRoute() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [urlParams, setUrlParams] = useState(
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrlParams(new URLSearchParams(window.location.search))
    }
  }, [pathname])

  let query = {}
  if (typeof window !== 'undefined') {
    urlParams.forEach((value, key) => {
      query[key] = value
    })
  }

  const changeRoute = newQueries => {
    const queryParams = new URLSearchParams()
    Object.entries({ ...query, ...newQueries }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    replace(`${pathname}?${queryParams.toString()}`, { scroll: false })
  }

  return changeRoute
}