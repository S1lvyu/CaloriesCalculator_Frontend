import React from "react";
import styles from "./Button.module.css";

export default function Button({ value, type, onclick, style }) {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`${styles.button} ${style}`}
    >
      {value}
    </button>
  );
}
