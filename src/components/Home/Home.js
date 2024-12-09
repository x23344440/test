import { useState, useEffect } from "react";
import Login from "../Login/Login";
import './Home.css';

export default function Home(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);  // Use boolean for isLoggedIn

    useEffect(() => {
        const interval = setInterval(() => {
            const loginStatus = localStorage.getItem("loginStatus");
            setLoggedIn(loginStatus === "true");  // Check login status and set as boolean
        }, 5000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);  // Empty dependency array ensures this runs once on mount

    if (!isLoggedIn) {
        return (
            <div className="content">
                <div>
                    <h1>Eventify</h1>
                    <p className="tagline">
                        <em>‘Simplify’ your Events</em>
                    </p>
                    <p className="about">
                        Explore the magic of our application 'EVENTIFY'.
                        A go-to solution for managing amazing events effortlessly. From easy sign-ups to registering and managing event schedules, our user-friendly platform has everything you need for a flawless experience.
                        With powerful features, trust our system to handle the details, and let's bring your event vision to life!!!
                    </p>
                </div>

                <Login />
            </div>
        );
    } else {
        return (
            <div className="content">
                <div>
                    <h1>Eventify</h1>
                    <p className="tagline">
                        <em>‘Simplify’ your Events</em>
                    </p>
                    <p className="about">
                        Explore the magic of our application 'EVENTIFY'.
                        A go-to solution for managing amazing events effortlessly. From easy sign-ups to registering and managing event schedules, our user-friendly platform has everything you need for a flawless experience.
                        With powerful features, trust our system to handle the details, and let's bring your event vision to life!!!
                    </p>
                </div>
            </div>
        );
    }
}
