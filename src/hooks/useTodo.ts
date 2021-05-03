import useSWR from 'swr'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const useTodo = (id: string) => {
  const fetcher = (url: string) => fetch(url).then(res => res.json())

  const { data, error } = useSWR<Todo>(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    fetcher
  )

  return {
    todo: data,
    loading: !error && !data,
    error: error,
  }
}
