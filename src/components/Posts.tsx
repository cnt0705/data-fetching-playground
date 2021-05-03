import React from 'react'
import { usePosts } from 'hooks/usePosts'

export const PostsPage = () => {
  const { data, createPost } = usePosts()

  if (data.error) {
    throw data.error
  }

  if (data.loading) return <div>Loading...</div>

  return (
    <div>
      <h1>Fetching data with SWR</h1>
      <ul>
        {data.posts.map(post => {
          return (
            <li key={post.id}>
              <span>{post.title}</span> / <span>{post.author}</span>
            </li>
          )
        })}
      </ul>

      <button onClick={() => createPost(data.posts)}>Create New Post</button>
    </div>
  )
}
