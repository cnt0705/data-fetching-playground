import React from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

export const TodosPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

const fetcher = async () => {
  const res = await fetch('http://localhost:3000/todos')

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return res.json()
}

const post = async newTodo => {
  await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  }).catch(e => {
    throw e
  })
}

const Todos = () => {
  const queryClient = useQueryClient()

  const { data, error, isLoading, isError } = useQuery('todos', fetcher)

  const mutation = useMutation(post, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  if (isError) {
    throw error
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Fetching data with SWR</h1>
      <ul>
        {data.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: Date.now(),
            title: 'Do Laundry',
            completed: false,
          })
        }}
      >
        Add Todo
      </button>
    </div>
  )
}
