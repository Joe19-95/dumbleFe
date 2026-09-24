import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from '../components/UserCard.jsx'
import { BASE_URL } from '../utils/constants.js'
import { addFeed } from '../utils/feedSlice.js'

function Feed() {
  const dispatch = useDispatch()
  const feed = useSelector((state) => state.feed)
  const [error, setError] = useState('')

  useEffect(() => {
    if (feed !== null) return

    const getFeed = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        })
        const users = response.data.data ?? response.data

        if (!Array.isArray(users)) {
          throw new Error('Feed API did not return a user array')
        }

        dispatch(addFeed(users))
      } catch (err) {
        console.error('Unable to load feed:', err)
        setError('Unable to load the feed. Please try again.')
      }
    }

    getFeed()
  }, [dispatch, feed])

  if (feed === null && !error) {
    return <div className="grid min-h-96 place-items-center">Loading feed...</div>
  }

  if (error) {
    return <p className="mx-auto max-w-7xl px-6 py-12 text-error">{error}</p>
  }

  if (feed.length === 0) {
    return <p className="mx-auto max-w-7xl px-6 py-12">No users available right now.</p>
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Discover people</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {feed.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </main>
  )
}

export default Feed
