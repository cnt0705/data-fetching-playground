import React from 'react'
import { useTodo } from 'hooks/useTodo'

export const Todo = () => {
  const data = useTodo('1')

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
