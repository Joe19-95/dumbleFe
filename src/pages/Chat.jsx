import { useState } from 'react'
import { useParams } from 'react-router'

function Chat() {
  const { userId } = useParams()
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi, how are you?', sentByUser: false },
    { id: 2, text: "I'm good, thanks! How about you?", sentByUser: true },
    { id: 3, text: 'Doing well. Nice to connect!', sentByUser: false },
  ])
  const [message, setMessage] = useState('')

  function sendMessage(event) {
    event.preventDefault()
    const text = message.trim()
    if (!text) return

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), text, sentByUser: true },
    ])
    setMessage('')
  }

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Chat with {userId}</h1>

      <div className="flex min-h-80 flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-5">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`chat ${item.sentByUser ? 'chat-end' : 'chat-start'}`}
          >
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