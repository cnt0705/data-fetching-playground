import React from 'react'
import useSWR from 'swr'

export const App = () => {
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/todos/2',
    fetcher
  )

  if (error) {
    throw error
  }

  if (!data) return <div>Loading...</div>

  console.log(data)

  return (
    <div>
      <h1>Fetching data with SWR</h1>
    </div>
  )
}
