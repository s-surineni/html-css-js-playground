class MessageStore {
  constructor() {
    this.messages = []
  }

// for first iteration do messages.sort for simplicity
  addMessage(message) {
    // Find correct insertion position using binary search
    let left = 0
    let right = this.messages.length

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (this.messages[mid].timestamp < message.timestamp) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    this.messages.splice(left, 0, message)
  }

  getMessages() {
    return this.messages
  }
}

class ChatRenderer {
  constructor(container) {
    this.container = container
  }

  render(messages) {
    this.container.replaceChildren()

    messages.forEach(msg => {
      const message = document.createElement("article")
      message.className = msg.isSelf ? "message self" : "message"

      const avatar = document.createElement("div")
      avatar.className = "avatar"
      avatar.setAttribute("aria-hidden", "true")
      avatar.textContent = msg.senderName[0].toUpperCase()

      const content = document.createElement("div")
      content.className = "message-content"

      const header = document.createElement("div")
      header.className = "message-header"

      const sender = document.createElement("span")
      sender.className = "sender"
      sender.textContent = msg.senderName

      const timestamp = document.createElement("time")
      timestamp.className = "timestamp"
      timestamp.dateTime = new Date(msg.timestamp).toISOString()
      timestamp.textContent = new Date(msg.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })

      const text = document.createElement("p")
      text.className = "text"
      text.textContent = msg.text

      header.append(sender, timestamp)
      content.append(header, text)
      message.append(avatar, content)
      this.container.appendChild(message)
    })

    this.scrollToBottom()
  }

  scrollToBottom() {
    this.container.scrollTop =
      this.container.scrollHeight
  }
}

class ChatApp {
  constructor(container, form, input) {
    this.store = new MessageStore()

    this.renderer =
      new ChatRenderer(container)

    this.form = form

    this.input = input

    this.attachFormListener()
  }

  attachFormListener() {
    this.form.addEventListener(
      "submit",
      (e) => {
        e.preventDefault()

        const text =
          this.input.value.trim()

        if (!text) {
          return
        }

        this.receiveMessage({
          id: crypto.randomUUID(),

          senderName: "You",

          text,

          timestamp: Date.now(),

          isSelf: true
        })

        this.input.value = ""
      }
    )
  }

  receiveMessage(message) {
    this.store.addMessage(message)

    this.renderer.render(
      this.store.getMessages()
    )
  }
}

const messagesContainer =
  document.getElementById("messages")

const chatForm =
  document.getElementById("chatForm")

const messageInput =
  document.getElementById("messageInput")

const app =
  new ChatApp(messagesContainer, chatForm, messageInput)

app.receiveMessage({
  id: 1,
  senderName: "John",
  text: "Hello team!",
  timestamp: Date.now() - 100000,
  isSelf: false
})

app.receiveMessage({
  id: 2,
  senderName: "Alice",
  text: "Hi John 👋",
  timestamp: Date.now() - 80000,
  isSelf: false
})

app.receiveMessage({
  id: 3,
  senderName: "You",
  text: "Good morning!",
  timestamp: Date.now() - 50000,
  isSelf: true
})

setTimeout(() => {
  app.receiveMessage({
    id: 4,

    senderName: "Sam",

    text:
      "Messages are arriving asynchronously.",

    timestamp: Date.now(),

    isSelf: false
  })
}, 3000)
