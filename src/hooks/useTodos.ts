import { useMutation, useQuery, useQueryClient } from 'react-query'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type Todos = Todo[]

type Response = {
  data: Todos | undefined
  error: Error | null
  isError: boolean
  isLoading: boolean
  addTodo: (title: string) => void
}

const KEY = 'http://localhost:3000/todos'

const fetcher = async () => {
  const res = await fetch(KEY)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return res.json()
}

const post = async (newTodo: Todo) => {
  await fetch(KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTodo),
  }).catch(e => {
    throw e
  })
}

export const useTodos = (): Response => {
  const queryClient = useQueryClient()

  const { data, error, isLoading, isError } = useQuery<Todos, Error>(
    'todos',
    fetcher
  )

  const mutation = useMutation(post, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const addTodo = (title: string) => {
    mutation.mutate({
      id: Date.now(),
      title,
      completed: false,
    })
  }

  return {
    data,
    error,
    isError,
    isLoading,
    addTodo,
  }
}
