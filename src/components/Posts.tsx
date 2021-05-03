import React from 'react'
import { usePosts } from 'hooks/usePosts'

export const Posts = () => {
  const data = usePosts('1')

  if (data.loading) return <div>Loading...</div>

  if (data.error) {
    throw data.error
  }

  return (
    <div>
      <h1>Fetching data with SWR</h1>
      <ul>
        <li>{data.todo.userId}</li>
        <li>{data.todo.title}</li>
      </ul>
    </div>
  )
}
