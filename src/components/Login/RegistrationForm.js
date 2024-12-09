import React, { useState, useEffect } from 'react';
import Axios from "axios";

import './register.css';

const RegistrationForm = (props) => {
  const [formData, setFormData] = useState({
    username: `${props.usernameValue}`,
    fullName: `${props.fullNameValue}`,
    email: `${props.emailValue}`,
    phone: `${props.phoneValue}`,
    password: `${props.passwordValue}`,
    repassword: '',
  });
  const [readonly, setReadOnly] = useState(false);
  const [title, setTitle] = useState("User Registration");
  const [buttonTitle, setButtonTitle] = useState("Register");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      username: `${props.usernameValue}`,
      fullName: `${props.fullNameValue}`,
      email: `${props.emailValue}`,
      phone: `${props.phoneValue}`,
      password: `${props.passwordValue}`,
      repassword: '',
    });

    if (props.action === "update") {
      setReadOnly(true);
      setTitle("Edit Profile");
      setButtonTitle("Update");
    }

  }, [props.usernameValue, props.fullNameValue, props.emailValue, props.phoneValue, props.passwordValue, props.action]);

  const validateForm = () => {
    const validationErrors = {};

    if (formData.username.includes(' ')) {
      validationErrors.username = 'Username should not contain spaces';
    }

    if (formData.fullName.length < 3) {
      validationErrors.fullName = 'Full Name must have at least 3 characters';
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      validationErrors.phone = 'Phone number should consist of 10 digits';
    }

    if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (formData.password !== formData.repassword) {
      validationErrors.repassword = 'Passwords do not match';
    }

    return validationErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear previous errors for the field
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = validateForm();

    // If there are validation errors, update the state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If no validation errors, you can proceed with form submission logic
    if (props.action === "create") {
      Axios.post('http://3.86.59.163:4000/eventRoute/create-user', formData)
        .then((res) => {
          if (res.status === 200) {
            alert("User created successfully");
            setFormData({
              username: '',
              fullName: '',
              email: '',
              phone: '',
              password: '',
              repassword: '',
            });
          } else {
            Promise.reject();
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          alert("There was an error creating the user. Please try again.");
        });
    }

    else if (props.action === "update") {
      let userData = {
        username: formData.username,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
      userData.bookedEvents = props.bookedEventsValue;

      Axios.put(`http://3.86.59.163:4000/eventRoute/update-user/${props.id}`, userData)
        .then(() => alert('User updated successfully'))
        .catch((error) => {
          console.error('Error updating user:', error);
          alert("There was an error updating the user. Please try again.");
        });

      // Update event details
      Axios.get("http://3.86.59.163:4000/eventRoute/event-list")
        .then((eventResponse) => {
          if (eventResponse.status === 200) {
            const collectedEvents = eventResponse.data;
            const eventUpdates = collectedEvents.map(event => {
              event.registeredUsers = event.registeredUsers.filter((user) => user.username !== userData.username);
              event.registeredUsers = [...event.registeredUsers, { username: userData.username, fullName: userData.fullName, email: userData.email, phone: userData.phone }];
              return Axios.put(`http://3.86.59.163:4000/eventRoute/update-event/${event._id}`, event);
            });

            Promise.all(eventUpdates)
              .then(() => console.log('Event details updated'))
              .catch((updateError) => alert(updateError));
          }
        })
        .catch((error) => {
          console.error("Error fetching event list:", error);
        });
    }
  };

  return (
    <div className="registration-container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            readOnly={readonly}
          />
          {errors.username && <span className="register-error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <span className="register-error">{errors.fullName}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="register-error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone No:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="register-error">{errors.phone}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="register-error">{errors.password}</span>}
        </div>
        <div>
          <label htmlFor="repassword">Confirm Password:</label>
          <input
            type="password"
            id="repassword"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            required
          />
          {errors.repassword && <span className="register-error">{errors.repassword}</span>}
        </div>

        <button className='button' type="submit">{buttonTitle}</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
