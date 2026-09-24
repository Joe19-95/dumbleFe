import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnectionCard from '../components/ConnectionCard.jsx'
import { addConnection } from '../utils/connectionSlice.js'
import { BASE_URL } from '../utils/constants.js'

function Connections() {
  const dispatch = useDispatch()
  const connections = useSelector((state) => state.connect)
  const [error, setError] = useState('')

  useEffect(() => {
    if (connections !== null) return

    async function getConnections() {
      try {
        const response = await axios.get(`${BASE_URL}/view/connections`, {
          withCredentials: true,
        })
        const users = response.data.data ?? response.data

        if (!Array.isArray(users)) {
          throw new Error('Connections API did not return an array')
        }

        dispatch(addConnection(users))
      } catch (err) {
        console.error('Unable to load connections:', err)
        setError('Unable to load your connections. Please try again.')
      }
    }

    getConnections()
  }, [connections, dispatch])

  if (connections === null && !error) {
    return <div className="grid min-h-96 place-items-center">Loading connections...</div>
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">My Connections</h1>

      {error ? (
        <p className="text-error" role="alert">{error}</p>
      ) : connections.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center text-base-content/70">
          You do not have any connections yet.
        </div>
      ) : (
        <div className="space-y-5">
          {connections.map((user) => (
            <ConnectionCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Connections
