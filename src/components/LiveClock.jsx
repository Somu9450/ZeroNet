import React, { useEffect, useState } from "react";

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <h2 className="text-md font-semibold">
        {time.toDateString()}
      </h2>

      <p className="text-gray-500">
        {time.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default LiveClock;