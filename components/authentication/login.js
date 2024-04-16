// pages/signup.js

import React, { useEffect, useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import Notification from "../ui/notification";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const Login = () => {
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
  const [requestError, setRequestError] = useState();
  const router = useRouter();
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

    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result.ok) {
      setRequestStatus("success");
      router.replace("/profile");
    }
    if (result.error) {
      setRequestStatus("error");
      setRequestError(result.error);
    }
  };
  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Loging...",
      message: "You are about to login!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Login successfully!",
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
      <h1>Login</h1>
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
          Login
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
