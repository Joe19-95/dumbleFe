import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addConnection } from "../utils/connectionSlice"
import { BASE_URL } from "../utils/constants"

function Connections() {
  const dispatch = useDispatch()
  const getConnections = async () => {
    const connect = await axios.get(BASE_URL + '/view/connections', { withCredentials: true })
    console.log(connect)
    dispatch(addConnection())
  }
  useEffect(() => {
    getConnections()
  }, [])
  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold">My Connections</h1>
    </main>
  )
}

export default Connections
