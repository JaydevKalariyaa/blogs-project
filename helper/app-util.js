import axios from "axios";
import { getEvents } from "../pages/api/getevents";
import { useContext } from "react";
import NotificationContext from "../store/notification-context";

export async function getAllEvents() {
  try {
    const data = await getEvents();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// export async function getEventById(id) {
//   const events = await getAllEvents();
//   console.log(events.length);
//   return events.find((event) => event._id === id);
// }
// export async function getFeaturedEvents() {
//   const events = await getAllEvents();
//   if (events) return events.filter((event) => event.isFeatured);
//   else return [];
// }
// export async function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;
//   const events = await getAllEvents();
//   let filteredEvents = events.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }
