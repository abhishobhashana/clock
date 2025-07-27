import React, { useEffect, useRef } from "react";

const ClockSvg = ({ height = 180, width = 180, time }) => {
  const secondRef = useRef(null);
  const minuteRef = useRef(null);
  const hourRef = useRef(null);

  const [hh, mm, ss] = time.split(":").map(Number);
  const startTime = new Date();
  startTime.setHours(hh, mm, ss, 0);
  const startTimestamp = startTime.getTime();

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const elapsedMs = now.getTime() - startTimestamp;
      const totalSeconds = ss + elapsedMs / 1000;

      const seconds = totalSeconds % 60;
      const minutes = (mm + seconds / 60) % 60;
      const hours = (hh % 12) + minutes / 60;

      const secondDeg = (seconds / 60) * 360;
      const minuteDeg = (minutes / 60) * 360;
      const hourDeg = (hours / 12) * 360;

      if (secondRef.current)
        secondRef.current.setAttribute(
          "transform",
          `rotate(${secondDeg - 7} 100 100)`
        );
      if (minuteRef.current)
        minuteRef.current.setAttribute(
          "transform",
          `rotate(${minuteDeg} 100 100)`
        );
      if (hourRef.current)
        hourRef.current.setAttribute("transform", `rotate(${hourDeg} 100 100)`);

      requestAnimationFrame(updateClock);
    };

    requestAnimationFrame(updateClock);
  }, [startTimestamp]);

  return (
    <svg width={width} height={height} viewBox="0 0 200 200">
      {/* Clock face */}
      <circle cx="100" cy="100" r="96" fill="#fff" />

      {/* Tick marks */}
      {[...Array(60)].map((_, i) => {
        const angle = i * 6 * (Math.PI / 180);
        const outerRadius = 92;
        const innerRadius = i % 5 === 0 ? 85 : 86;

        const x1 = 100 + Math.sin(angle) * outerRadius;
        const y1 = 100 - Math.cos(angle) * outerRadius;
        const x2 = 100 + Math.sin(angle) * innerRadius;
        const y2 = 100 - Math.cos(angle) * innerRadius;

        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i % 5 === 0 ? "rgb(38, 38, 38)" : "rgb(168, 168, 174)"}
            strokeWidth="2"
          />
        );
      })}

      {/* Hour numbers */}
      {[...Array(12)].map((_, i) => {
        const hour = i + 1;
        const angle = (i * 30 - 60) * (Math.PI / 180);
        const x = 100 + 70 * Math.cos(angle);
        const y = 100 + 70 * Math.sin(angle);
        return (
          <text
            key={hour}
            x={x}
            y={y + 8}
            textAnchor="middle"
            fontSize="20"
            fontFamily="Inter"
            fontWeight="bold"
            fill="rgb(38, 38, 38)"
          >
            {hour}
          </text>
        );
      })}

      {/* Hour hand */}
      <line
        ref={hourRef}
        x1="100"
        y1="100"
        x2="100"
        y2="50"
        stroke="rgb(38, 38, 38)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Minute hand */}
      <line
        ref={minuteRef}
        x1="100"
        y1="100"
        x2="100"
        y2="10"
        stroke="rgb(38, 38, 38)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <circle
        cx="100"
        cy="100"
        r="5"
        fill="none"
        stroke="#000"
        strokeWidth="2"
      />

      {/* Second hand */}
      <line
        ref={secondRef}
        x1="100"
        y1="115"
        x2="100"
        y2="8"
        stroke="rgb(255, 146, 48)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="100"
        cy="100"
        r="3"
        fill="#fff"
        stroke="rgb(255, 146, 48)"
        strokeWidth="2"
      />
    </svg>
  );
};

export default ClockSvg;
