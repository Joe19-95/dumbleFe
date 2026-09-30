import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { createSocketConnection } from '../utils/socket'

function Chat() {
  const { target } = useParams()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const user = useSelector((store) => store.user)
  const userId = user?.user_id
  const fname = user?.fname
  const socketRef = useRef(null)

  const getChat = useCallback(async () => {
    if (!target) return

    const chat = await axios.get('/chat/' + target, { withCredentials: true })
    const final = chat.data.messages.map((item) => ({
      id: item?._id ?? `${item?.from?._id ?? 'unknown'}-${item?.text ?? 'message'}-${Date.now()}`,
      fname: item?.from?.fname ?? 'Unknown',
      lname: item?.from?.lname ?? '',
      text: item?.text ?? '',
      sentByUser: item?.from?._id === userId,
    }))
    setMessages(final)
  }, [target, userId])

  useEffect(() => {
    getChat()
  }, [getChat])

  useEffect(() => {
    if (userId && target) {
      const socket = createSocketConnection()
      socketRef.current = socket
      socket.emit('joinChat', { from: userId, to: target, name: fname })
      socket.on('newMessage', ({ fname: senderName, from, text }) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          { id: Date.now(), text, fname: senderName, sentByUser: from === userId },
        ])
      })
      return () => {
        socket.disconnect()
        socketRef.current = null
      }
    }
    return undefined
  }, [userId, target, fname])

  function sendMessage(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return

    const socket = socketRef.current
    if (!socket) return

    socket.emit('sendMessage', { fname, from: userId, to: target, text })
    setMessage('')
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Chat with {target}</h1>

      <div className="flex min-h-80 flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5">
        {messages.map((item) => {
          const senderName = item.sentByUser ? 'You' : [item.fname, item.lname].filter(Boolean).join(' ') || 'Them'

          return (
            <div
              key={item.id}
              className={`chat ${item.sentByUser ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-header">{senderName}</div>
              <p
                className={`chat-bubble ${item.sentByUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}
              >
                {item.text}
              </p>
            </div>
          )
        })}
      </div>

      <form className="mt-4 flex gap-2" onSubmit={sendMessage}>
        <input
          className="input input-bordered min-w-0 flex-1"
          aria-label="Message"
          placeholder="Type a message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Send
        </button>
      </form>
    </main>
  )
}

export default Chat