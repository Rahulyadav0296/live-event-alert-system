const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const { title } = require("process");
const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"], // Specify methods allowed by CORS
  },
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// Simple API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello world" });
});

// Socket.IO connection handling
let eventList = [];
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //event listener for new Events
  socket.on("newEvent", (event) => {
    console.log(event);
    eventList.unshift(event);
    socket.emit("sendSchedules", eventList);
    console.log(eventList);
  });

  let interval = setInterval(() => {
    if (eventList.length > 0) {
      for (let i = 0; i < eventList.length; i++) {
        if (
          Number(eventList[i].hour) === new Date().getHours() &&
          Number(eventList[i].minute) === new Date().getMinutes() &&
          new Date().getSeconds() === 0
        ) {
          socket.emit("notification", {
            title: eventList[i].title,
            hour: eventList[i].hour,
            mins: eventList[i].minute,
          });
        }
      }
    }
  }, 1000);

  // Handle disconnection
  socket.on("disconnect", () => {
    socket.disconnect();
  });
});

// Start server
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
