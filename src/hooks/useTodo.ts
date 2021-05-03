import useSWR from 'swr'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

type Response =
  | {
      loading: true
      todo?: undefined
      error?: undefined
    }
  | {
      loading: false
      todo: Todo
      error?: undefined
    }
  | {
      loading: false
      todo?: undefined
      error: Error
    }

export const useTodo = (id: string): Response => {
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error } = useSWR<Todo, Error>(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    fetcher
  )

  if (error) {
    return {
      loading: false,
      error,
    }
  }

  if (!data) {
    return {
      loading: true,
    }
  }

  return {
    loading: false,
    todo: data,
  }
}
