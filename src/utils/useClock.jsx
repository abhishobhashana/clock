import { useEffect, useState } from "react";
import moment from "moment-timezone";

export const getFriendlyTimezoneLabel = (tz) => {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    timeZoneName: "long",
  });

  const parts = formatter.formatToParts(date);
  const tzName = parts.find((p) => p.type === "timeZoneName")?.value || tz;
  const offset = moment().tz(tz).format("Z");
  const short = moment.tz(tz).zoneAbbr();

  return {
    label: `${tzName} ${offset}`,
    value: tz,
    name: tzName,
    offset: offset,
    short: short,
  };
};

export const useLiveTime = (timezone) => {
  const defaultTimeZone = moment.tz.guess();
  const timezoneData = timezone || defaultTimeZone;

  const getZone = getFriendlyTimezoneLabel(timezoneData);

  const getTimeData = () => {
    const now = moment().tz(timezoneData);
    return {
      zone: getZone?.short || timezoneData,
      time: now.format("HH:mm:ss"),
      shortTime: now.format("HH:mm"),
      offset: getZone?.offset,
      fullTimeDay: now.format("dddd, D MMM YYYY"),
    };
  };

  const [timeData, setTimeData] = useState(getTimeData());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeData(getTimeData());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timezone]);

  return timeData;
};
