import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import Clock from "./components/Clock";
import CreateSchedule from "./components/CreateSchedule";
import Schedules from "./components/Schedules";
//React Toastify imports
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = socketIO.connect("http://localhost:3000");

const App = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    socket.on("sendSchedules", (schedules) => {
      setSchedules(schedules);
    });

    socket.on("notification", (date) => {
      toast.success(`It's time for ${date.title}`);
    });
  }, []);

  console.log("The Details are: ", schedules);

  return (
    <div className="app__container">
      <Clock />
      <CreateSchedule socket={socket} />
      <Schedules schedules={schedules} />
      <ToastContainer />
    </div>
  );
};

export default App;
