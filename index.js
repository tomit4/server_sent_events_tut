// Following a tutorial by youtuber Hussein Nasser to understand server side
// events: https://www.youtube.com/watch?v=4HlNv1qpZFY

const app = require("express")()
const cors = require('cors')

app.use(cors({
    origin: true,
    credentials: true
}))

app.get("/", (req, res) => {
  res.send("hello!")
})

app.get("/stream", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream")
    send(res)
    // res.write("data: " + "hello!\n\n")
})

let i = 0
function send(res) {
    res.write("data: " + `hello${i++}!\n\n`)
    setTimeout(() => send(res), 1000)
}

app.listen(8080)
console.log("listening on 8080")

// Navigate to http://localhost:8080 and enter into browser console:

// let sse = new EventSource("http://localhost:8080/stream")
// sse.onmessage = console.log

// If you wish to close the connection, simply call:
// sse.close()

// NOTE: If you kill the connection, the console will continue to print out the
// res.write() above while it waits for the server to reconnect.
// It is "as if" it is stateless.

// FURTHER READING:
// https://developer.mozilla.org/en-US/docs/Web/API/EventSource
// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events
