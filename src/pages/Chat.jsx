import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { createSocketConnection } from '../utils/socket'
import { useSelector } from 'react-redux'

function Chat() {
  const { target } = useParams()
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const user = useSelector(store => store.user)
  const userId = user?.user_id
  useEffect(() => {
    if (userId && target) {
      const socket = createSocketConnection()
      socket.emit('joinChat', { from: userId, to: target, name: user.fname })
      socket.on('newMessage', ({ fname, from, text }) => {
        console.log(fname, text)
        setMessages((messages) => [...messages, { id: Date.now(), text, fname, sentByUser: from === userId }])
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [userId, target])



  function sendMessage(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return

    // setMessages((currentMessages) => [
    //   ...currentMessages,
    //   { id: Date.now(), text, sentByUser: true },
    // ])
    setMessage('')
    const socket = createSocketConnection()
    socket.on('sendMessage', { fname: user.fname, from, to, text: message })
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Chat with {target}</h1>

      <div className="flex min-h-80 flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`chat ${item.sentByUser ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-header">
              {item.fname || (item.sentByUser ? 'You' : 'Them')}
            </div>
            <p
              className={`chat-bubble ${item.sentByUser ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}
            >
              {item.text}
            </p>
          </div>
        ))}
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