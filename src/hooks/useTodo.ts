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
      error?: Error
    }
  | {
      loading: false
      todo?: Todo
      error: Error
    }

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    throw error
  }

  return res.json()
}

export const useTodo = (id: string): Response => {
  const { data, error } = useSWR<Todo, Error>(
    `https://jsonplaceholder.typicode.com/todo/${id}`,
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
