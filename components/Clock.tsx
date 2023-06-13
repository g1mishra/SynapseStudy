import React, { useEffect, useState } from "react";

const Clock: React.FC = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();

      const options = {
        hour: "numeric" as const,
        minute: "numeric" as const,
        hour12: true,
      };
      const formattedTime = currentTime.toLocaleString("en-US", options);
      setTime(formattedTime);

      const dateOptions = {
        weekday: "long" as const,
        day: "numeric" as const,
        month: "long" as const,
        year: "numeric" as const,
      };
      const formattedDate = currentTime.toLocaleString("en-US", dateOptions);
      setDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-2xl text-white font-bold">
      <div>{time}</div>
      <div className="text-sm text-white font-light mt-2">{date}</div>
    </div>
  );
};

export default Clock;
