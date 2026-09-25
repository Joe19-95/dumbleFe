import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConnectionCard from '../components/ConnectionCard.jsx'
import { removeConnection } from '../utils/connectionSlice.js'
import { BASE_URL } from '../utils/constants.js'
import { addRequests, removeRequest } from '../utils/requestSlice.js'

function Requests() {
  const dispatch = useDispatch()
  const requests = useSelector((state) => state.requests)
  const [error, setError] = useState('')
  const [reviewingId, setReviewingId] = useState(null)

  useEffect(() => {
    if (requests !== null) return

    async function getRequests() {
      try {
        const response = await axios.get(`${BASE_URL}/view/requests`, {
          withCredentials: true,
        })
        const receivedRequests = response.data.data ?? response.data

        if (!Array.isArray(receivedRequests)) {
          throw new Error('Requests API did not return an array')
        }

        dispatch(addRequests(receivedRequests))
      } catch (err) {
        console.error('Unable to load requests:', err)
        setError('Unable to load your requests. Please try again.')
      }
    }

    getRequests()
  }, [dispatch, requests])

  async function reviewRequest(status, requestId) {
    setReviewingId(requestId)
    setError('')

    try {
      await axios.post(
        `${BASE_URL}/reviewRequest/${status}/${requestId}`,
        {},
        { withCredentials: true },
      )
      dispatch(removeRequest(requestId))
      if (status === 'accepted') dispatch(removeConnection(requestId))
    } catch (err) {
      console.error('Unable to review request:', err)
      const responseError = err.response?.data
      setError(
        (typeof responseError === 'string' ? responseError : responseError?.message) ??
          'Unable to update this request. Please try again.',
      )
    } finally {
      setReviewingId(null)
    }
  }

  if (requests === null && !error) {
    return <div className="grid min-h-96 place-items-center">Loading requests...</div>
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">Requests</h1>

      {error && <p className="mb-5 text-error" role="alert">{error}</p>}

      {requests?.length === 0 ? (
        <div className="rounded-box border border-dashed border-base-300 p-10 text-center text-base-content/70">
          You do not have any pending requests.
        </div>
      ) : (
        <div className="space-y-5">
          {requests?.map((request) => (
            <ConnectionCard key={request._id} user={request.from}>
              <button
                className="btn btn-outline btn-error"
                type="button"
                disabled={reviewingId === request._id}
                onClick={() => reviewRequest('rejected', request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary"
                type="button"
                disabled={reviewingId === request._id}
                onClick={() => reviewRequest('accepted', request._id)}
              >
                {reviewingId === request._id ? 'Updating...' : 'Accept'}
              </button>
            </ConnectionCard>
          ))}
        </div>
      )}
    </main>
  )
}

export default Requests
