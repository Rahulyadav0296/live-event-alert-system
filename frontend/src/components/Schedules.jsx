import React from "react";

const Schedules = ({ schedules }) => {
  // Create dummy schedules for now
  console.log("Schedules item: ", schedules);
  return (
    <div className="schedules__container">
      <h2 className="schedules__header">Upcoming Events</h2>
      <ul className="schedules__list">
        {schedules.map((schedule) => (
          <li key={schedule.title} className="schedules__list-item">
            <span>{schedule.title}</span> - {schedule.hour}:{schedule.minute}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedules;
