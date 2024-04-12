// Spinner.js

import React from "react";
import styles from "./spinner.module.css"; // Import the module CSS file

const Spinner = () => {
  return (
    <div className={styles["spinner-overlay"]}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Spinner;
