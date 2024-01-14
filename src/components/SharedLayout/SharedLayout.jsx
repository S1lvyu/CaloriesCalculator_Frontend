import React from "react";
import logo from "../../images/SlimMomLogo.png";
import slim from "../../images/Slim.png";
import mom from "../../images/Mom.png";
import graybackground from "../../images/gray background.png";
import banana from "../../images/banana.png";
import strawberry from "../../images/strawberry.png";
import leaves from "../../images/leaves.png";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styles from "./SharedLayout.module.css";
import { useLocation } from "react-router-dom";
export default function SharedLayout() {
  const location = useLocation();
  const setlocation = () => {
    if (location.pathname === "/") {
      return true;
    } else {
      return false;
    }
  };
  const pageLocation = setlocation();

  return (
    <div className={styles.sharedlayout__container}>
      <nav className={styles.navbar}>
        <div>
          <NavLink to="/" className={styles.logo__link}>
            <img src={logo} alt="Slim mom logo" className={styles.logo} />

            <div className={styles.logo__container}>
              <img src={slim} alt="slim mom logo" />
              <img src={mom} alt="slim mom logo" />
            </div>
          </NavLink>
        </div>

        <div className={styles.links__container}>
          <NavLink to="/login" className={styles.link}>
            Login
          </NavLink>
          <NavLink to="/register" className={styles.link}>
            Register
          </NavLink>
        </div>
      </nav>
      <Outlet />
      <img
        src={graybackground}
        alt="gray form for background"
        className={styles.background}
      />
      <img src={banana} alt="banana" className={styles.banana} />
      <img src={strawberry} alt="strawberry" className={styles.strawberry} />
      <img
        src={leaves}
        alt="leaves"
        className={
          pageLocation
            ? `${styles.leaves} ${styles.leaves__homepage}`
            : `${styles.leaves} ${styles.leaves__tablet}`
        }
      />
    </div>
  );
}
