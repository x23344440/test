import { useState, useEffect } from "react";
import Axios from "axios";
import EventRegistrationForm from "./eventform";

function UpdateEvent() {
    const [formData, setFormData] = useState({
        nameValue: "",
        startValue: "",
        endTimeValue: "",
        dateValue: "",
        placeValue: "",
        descriptionValue: "",
        clubValue: "",
        slotsValue: "",
    });

    const [registeredUsersValue, setRegisteredUsersValue] = useState();

    useEffect(() => {
        const eventID = localStorage.getItem("eventID");

        Axios.get("http://3.86.59.163:4000/eventRoute/check-event/" + eventID)
            .then(response => {
                setFormData({
                    nameValue: response.data.name,
                    startValue: response.data.startTime,
                    endTimeValue: response.data.endTime,
                    dateValue: response.data.date,
                    placeValue: response.data.place,
                    descriptionValue: response.data.description,
                    clubValue: response.data.club,
                    slotsValue: response.data.slots,
                });
                setRegisteredUsersValue(response.data.registeredUsers);
            })
            .catch(error => {
                console.error('Error fetching event details:', error);
            });
    }, []); // Empty array ensures this effect runs only once, when the component mounts

    return (
        <EventRegistrationForm
            nameValue={formData.nameValue}
            startTimeValue={formData.startValue}
            endTimeValue={formData.endTimeValue}
            dateValue={formData.dateValue}
            placeValue={formData.placeValue}
            descriptionValue={formData.descriptionValue}
            clubValue={formData.clubValue}
            slotsValue={formData.slotsValue}
            action="update"
            id={localStorage.getItem("eventID")}
            registeredUsersValue={registeredUsersValue}
        />
    );
}

export default UpdateEvent;
