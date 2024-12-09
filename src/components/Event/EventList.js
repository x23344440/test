import { useEffect, useState } from "react";
import Axios from "axios";
import EventCard from './EventCard';

const EventList = () => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    Axios.get("http://3.86.59.163:4000/eventRoute/event-list")
      .then((res) => {
        if (res.status === 200)
          setArr(res.data);
        else
          Promise.reject();
      })
      .catch((err) => alert(err));
  }, []); // Added empty dependency array to prevent infinite loop

  const EventListItems = () => {
    return arr.map((val, index) => {
      const slotsLeft = `Slots Left: ${val.slots}`;  // Updated with template literal
      return <EventCard obj={val} action="book" slotsLeft={slotsLeft} />;
    });
  }

  return (
    <div>
      <div fluid className='cardContainer'>
        {EventListItems()}
      </div>
    </div>
  );
};

export default EventList;
