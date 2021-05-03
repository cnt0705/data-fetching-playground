import React from 'react'
import { useTodo } from './hooks/useTodo'

export const App = () => {
  const { todo, loading, error } = useTodo('1')

  if (error) {
    throw error
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Fetching data with SWR</h1>
      <ul>
        <li>{todo?.userId}</li>
        <li>{todo?.title}</li>
      </ul>
    </div>
  )
}
