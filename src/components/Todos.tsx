import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useTodos } from 'hooks/useTodos'

const queryClient = new QueryClient()

export const TodosPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

const Todos = () => {
  const { data, error, isLoading, isError, addTodo } = useTodos()

  if (isError) {
    throw error
  }

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      <h1>Fetching data with SWR</h1>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button onClick={() => addTodo('Do Laundry')}>Add Todo</button>
    </div>
  )
}
