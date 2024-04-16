// pages/signup.js

import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import Notification from "../ui/notification";
const Signup = () => {
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    formData = Object.fromEntries(formData);
    console.log(formData);
    setRequestStatus("pending");
    try {
      const { data } = await axios.post("/api/auth/signup", formData);
      setRequestStatus("success");
    } catch (error) {
      console.log(error);
      setRequestStatus("error");
      setRequestError(error.response.data.error || "something went wrong");
    }
  };
  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Signing up...",
      message: "You are about to signup!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "User Registered successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }
  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </div>
  );
};

export default Signup;
