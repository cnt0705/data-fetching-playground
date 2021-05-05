import { act, renderHook } from '@testing-library/react-hooks'
import fetchMock from 'jest-fetch-mock'
import * as SWR from 'swr'

import { usePosts } from './usePosts'

jest.useFakeTimers()
jest.spyOn(SWR, 'mutate')

afterEach(() => {
  fetchMock.resetMocks()
})

it('returns default loading status', async () => {
  const { result, waitForNextUpdate } = renderHook(() => usePosts())

  expect(result.current.data).toStrictEqual({ loading: true })
  expect(result.current.createPost).toBeInstanceOf(Function)

  await waitForNextUpdate()
})

it('returns posts response', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ key: 'value' }))
  const { result, waitFor } = renderHook(() => usePosts())
  jest.runAllTimers()

  await waitFor(() => {
    expect(result.current.data).toStrictEqual({
      loading: false,
      posts: { key: 'value' },
    })
    expect(result.current.createPost).toBeInstanceOf(Function)
  })
})

it('return error object', async () => {
  fetchMock.mockRejectOnce(new Error('error occured'))
  const { result, waitFor } = renderHook(() => usePosts())
  jest.runAllTimers()

  await waitFor(() => {
    expect(result.current.data).toStrictEqual({
      loading: false,
      error: new Error('error occured'),
    })
    expect(result.current.createPost).toBeInstanceOf(Function)
  })
})

it('calls fetch and mutate when you create new post', async () => {
  const currentPosts = [
    {
      id: 1,
      title: 'dummy title',
      author: 'dummy author',
    },
  ]

  const { result, waitForNextUpdate } = renderHook(() => usePosts())
  act(() => {
    result.current.createPost(currentPosts)
  })

  expect(SWR.mutate).toHaveBeenCalled()
  expect(fetchMock).toHaveBeenCalled()
  expect(SWR.mutate).toHaveBeenCalled()

  await waitForNextUpdate()
})
