import { useCallback } from 'react'
import useSWR, { mutate } from 'swr'

type Post = {
  id: number
  title: string
  author: string
}

type Posts = Post[]

type Response =
  | {
      loading: true
      posts?: undefined
      error?: undefined
    }
  | {
      loading: false
      posts: Posts
      error?: Error
    }
  | {
      loading: false
      posts?: Posts
      error: Error
    }

type HooksReturn = {
  data: Response
  createPost: (data: Posts) => void
}

const KEY = 'http://localhost:3000/posts'

const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  // intentional error
  // if (Math.random() < 0.1) throw new Error('An error has occurred!')

  return res.json()
}

const post = async (currentPosts: Posts) => {
  const newPost = {
    id: Date.now(),
    title: 'New one',
    author: 'You',
  }

  // update the local data immediately, but disable the revalidation
  mutate(KEY, [...currentPosts, newPost], false)

  // send a request to the API to update the source
  await fetch(KEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  }).catch(e => {
    throw e
  })

  // trigger a revalidation (refetch) to make sure our local data is correct
  mutate(KEY)
}

export const usePosts = (): HooksReturn => {
  const { data, error } = useSWR<Posts, Error>(KEY, fetcher)

  const handler = {
    createPost: useCallback((currentPosts: Posts) => {
      post(currentPosts)
    }, []),
  }

  if (error) {
    return {
      ...handler,
      data: { loading: false, error },
    }
  }

  if (!data) {
    return {
      ...handler,
      data: { loading: true },
    }
  }

  return {
    ...handler,
    data: {
      loading: false,
      posts: data,
    },
  }
}
