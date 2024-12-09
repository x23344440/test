import { useState, useEffect } from "react";
import Axios from "axios";
import RegistrationForm from "../Login/RegistrationForm";

function UserUpdateForm() {
  const [formData, setFormData] = useState({
    usernameValue: '',
    fullNameValue: '',
    emailValue: '',
    phoneValue: '',
    passwordValue: '', 
  });

  const [bookedEventsValue, setBookedEventsValue] = useState();

  useEffect(() => {
    const user = localStorage.getItem('user');
    Axios.get("http://3.86.59.163:4000/eventRoute/check-user/" + user)
      .then(response => {
        setFormData({
          usernameValue: response.data.username,
          fullNameValue: response.data.fullName,
          emailValue: response.data.email,
          phoneValue: response.data.phone,
          passwordValue: response.data.password,
        });
        setBookedEventsValue(response.data.bookedEvents);
        console.log("From profile page:", formData, bookedEventsValue);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [bookedEventsValue,formData]);
  return (
    <RegistrationForm
      usernameValue={formData.usernameValue}
      fullNameValue={formData.fullNameValue}
      emailValue={formData.emailValue}
      phoneValue={formData.phoneValue}
      passwordValue={formData.passwordValue}
      bookedEventsValue={bookedEventsValue}
      id={localStorage.getItem("userID")}
      action="update"
    />
  );
}

export default UserUpdateForm;
