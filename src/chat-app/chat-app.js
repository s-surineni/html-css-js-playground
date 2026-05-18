class MessageStore {
  constructor() {
    this.messages = []
  }

  addMessage(message) {
    this.messages.push(message)

    this.messages.sort((a, b) => {
      return a.timestamp - b.timestamp
    })
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
    this.container.innerHTML = ""

    messages.forEach(msg => {
      const div = document.createElement("div")

      div.className = msg.isSelf
        ? "message self"
        : "message"

      div.innerHTML = `
        <div class="avatar">
          ${msg.senderName[0].toUpperCase()}
        </div>

        <div class="message-content">

          <div class="message-header">

            <span class="sender">
              ${msg.senderName}
            </span>

            <span class="timestamp">
              ${new Date(
                msg.timestamp
              ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>

          </div>

          <p class="text">
            ${msg.text}
          </p>

        </div>
      `

      this.container.appendChild(div)
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