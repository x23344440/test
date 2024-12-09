import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import './eventform.css';

const EventRegistrationForm = (props) => {
  const [formData, setFormData] = useState({
    name: `${props.nameValue}`,
    startTime: `${props.startTimeValue}`,
    endTime: `${props.endTimeValue}`,
    date: `${props.dateValue}`,
    place: `${props.placeValue}`,
    description: `${props.descriptionValue}`,
    club: `${props.clubValue}`,
    slots: `${props.slotsValue}`,
  });

  const [title, setTitle] = useState("Event Creation Form");
  const [buttonTitle, setButtonTitle] = useState("Create");

  useEffect(() => {
    setFormData({
      name: `${props.nameValue}`,
      startTime: `${props.startTimeValue}`,
      endTime: `${props.endTimeValue}`,
      date: `${props.dateValue}`,
      place: `${props.placeValue}`,
      description: `${props.descriptionValue}`,
      club: `${props.clubValue}`,
      slots: `${props.slotsValue}`,
    });

    if (props.action === "update") {
      setTitle("Event Updation Form");
      setButtonTitle("Update");
    }
  }, [props.nameValue, props.startTimeValue, props.endTimeValue, 
      props.dateValue, props.placeValue, props.descriptionValue, 
      props.clubValue, props.slotsValue, props.action]);

  const [formErrors, setFormErrors] = useState({
    name: '',
    startTime: '',
    endTime: '',
    date: '',
    place: '',
    description: '',
    club: '',
    slots: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: value ? '' : 'This field is mandatory' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formErrors).some((error) => error)) {
      alert('Kindly fill out the required fields correctly');
      return;
    }

    if (props.action === "create") {
      Axios.post("http://3.86.59.163:4000/eventRoute/create-event", formData)
        .then((res) => {
          if (res.status === 200) {
            alert("Event created successfully");
            window.location.reload();
          } else {
            Promise.reject();
          }
        })
        .catch((err) => alert(err));
    } else if (props.action === "update") {
      let eventData = {
        name: `${formData.name}`,
        startTime: `${formData.startTime}`,
        endTime: `${formData.endTime}`,
        date: `${formData.date}`,
        place: `${formData.place}`,
        description: `${formData.description}`,
        club: `${formData.club}`,
        slots: `${formData.slots}`,
      };

      // Don't assign registeredUsers to itself
      // eventData.registeredUsers = eventData.registeredUsers; // Removed unnecessary line

      Axios.all([
        Axios.put("http://3.86.59.163:4000/eventRoute/update-event/" + props.id, eventData)
          .then((updateResponse) => {
            if (updateResponse.status === 200) {
              alert("Event updated successfully");
            } else {
              Promise.reject();
            }
          })
          .catch((updateErr) => alert(updateErr)),

        Axios.get("http://3.86.59.163:4000/eventRoute/user-list")
          .then((userResponse) => {
            if (userResponse.status === 200) {
              const collectedUsers = userResponse.data;
              for (let i = 0; i < collectedUsers.length; i++) {
                let userData = collectedUsers[i];
                userData.bookedEvents = userData.bookedEvents.map((event) => {
                  if (event._id === props.id) {
                    return { 
                      _id: props.id, 
                      name: eventData.name, 
                      date: eventData.date, 
                      place: eventData.place, 
                      club: eventData.club, 
                      description: eventData.description, 
                      startTime: eventData.startTime, 
                      endTime: eventData.endTime 
                    };
                  }
                  return event;
                });

                Axios.put("http://3.86.59.163:4000/eventRoute/update-user/" + collectedUsers[i]._id, userData)
                  .then((userUpdateResponse) => {
                    if (userUpdateResponse.status === 200) {
                      console.log("User details updated");
                    } else {
                      Promise.reject();
                    }
                  })
                  .catch((userUpdateError) => alert(userUpdateError));
              }
            }
          })
          .catch((userError) => alert(userError)),
      ]);
    }
  };

  return (
    <div className='eventForm'>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.name}</div>
        </div>
        <div>
          <label htmlFor="startTime">Event Start Time:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.startTime}</div>
        </div>
        <div>
          <label htmlFor="endTime">Event End Time:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.endTime}</div>
        </div>
        <div>
          <label htmlFor="date">Event Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.date}</div>
        </div>
        <div>
          <label htmlFor="place">Event Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.place}</div>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter details about event"
            required
          />
          <div className='error'>{formErrors.description}</div>
        </div>
        <div>
          <label htmlFor="club">Name of the Club:</label>
          <input
            type="text"
            id="club"
            name="club"
            value={formData.club}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.club}</div>
        </div>
        <div>
          <label htmlFor="slots">Number of Slots:</label>
          <input
            type="number"
            id="slots"
            name="slots"
            value={formData.slots}
            onChange={handleChange}
            required
          />
          <div className='error'>{formErrors.slots}</div>
        </div>
        <button className='button' type="submit">{buttonTitle}</button>
      </form>
    </div>
  );
};

export default EventRegistrationForm;
