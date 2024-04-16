// pages/signup.js

import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import Notification from "../ui/notification";
import { signIn, useSession } from "next-auth/react";
const Login = () => {
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const { status, data: session } = useSession();
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
    setRequestStatus("pending");

    try {
      const { data } = await axios.patch("/api/auth/changePassword", {
        session: session,
        data: formData,
      });
      console.log(data);
      setRequestStatus("success");
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.response.data.error || "something went wrong");
    }
  };
  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Updating...",
      message: "Your Password about to change!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Password Change successfully!",
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
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="password">Enter Old Password:</label>
          <input type="password" id="password" name="oldPassword" required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="newPassword" required />
        </div>
        <button type="submit" className={styles.button}>
          Change
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

export default Login;
