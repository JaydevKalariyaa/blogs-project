import Link from "next/link";

import Logo from "./logo";
import classes from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";
function MainNavigation() {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut();
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
    </header>
  );
}

export default MainNavigation;
