class MessageStore {
    constructor() {
        this.messages = [];
    }

    addMessage(message) {
        this.messages.push(message);
        this.messages.sort(a, b => a.timestamp - b.timestamp)
    }

    getMessages() {
        return this.messages;
    }
}