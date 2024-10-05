import React, { useState, useEffect } from "react";
import { gapi } from "gapi-script";

const AddToCalendar = () => {
  const [events, setEvents] = useState([
    {
      code: "CSC420",
      name: "Image Processing and Pattern Recognition",
      sec: "1",
      room: "BC5014",
      day: "S",
      timeslot: "18:30-21:30",
    },
    {
      code: "CSE310",
      name: "Electronics II",
      sec: "1",
      room: "BC5012",
      day: "MW",
      timeslot: "16:20-17:50",
    },
    {
      code: "CSE310L",
      name: "Labwork based on CSE 310",
      sec: "1",
      room: "CENLAB",
      day: "M",
      timeslot: "14:40-16:10",
    },
    {
      code: "CSE406",
      name: "Cryptography and Network Security",
      sec: "1",
      room: "BC5013",
      day: "T",
      timeslot: "18:30-21:30",
    },
    {
      code: "MAT301",
      name: "Ordinary Diff Equations",
      sec: "2",
      room: "BC5012",
      day: "ST",
      timeslot: "09:40-11:10",
    },
  ]);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY, // Use environment variable for API key
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Use environment variable for Client ID
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuthClick = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        console.log("User signed in");
        handleAddEvents();
      })
      .catch((error) => {
        console.error("Error signing in: ", error); // Added error handling for sign-in
      });
  };

  const handleAddEvents = () => {
    const calendar = gapi.client.calendar;
    events.forEach((event) => {
      const [startHour, endHour] = event.timeslot.split("-");
      const startDateTime = new Date(`2023-10-01T${startHour}:00`);
      const endDateTime = new Date(`2023-10-01T${endHour}:00`);
      const eventDetails = {
        summary: `${event.code} - ${event.name}`,
        location: event.room,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: "America/New_York",
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: "America/New_York",
        },
      };

      calendar.events
        .insert({
          calendarId: "primary",
          resource: eventDetails,
        })
        .then(() => {
          console.log(`Event added: ${event.code}`);
        })
        .catch((error) => {
          console.error("Error adding event: ", error);
        });
    });
  };

  return (
    <div>
      <h2>Add Events to Google Calendar</h2>
      <button onClick={handleAuthClick}>Sign in and Add Events</button>
    </div>
  );
};

export default AddToCalendar;
