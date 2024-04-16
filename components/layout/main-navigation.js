import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";
import Notification from "../ui/notification";
import { useState } from "react";

function MainNavigation() {
  const { data: session } = useSession();
  const [notification, setNotification] = useState();

  const handleLogout = async () => {
    setNotification({
      status: "success",
      title: "Success!",
      message: "Logout successfully!",
    });
    await signOut();
  };
  return (
    <header className={classes.header}>
      <Link href="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          {!session ? (
            <>
              <li>
                <Link href="/signup">Register</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/posts">Posts</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </header>
  );
}

export default MainNavigation;
