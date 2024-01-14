import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import {
  getIsAuthenticated,
  getUserToken,
  getTokenValability,
} from "../../redux/selectors";
import { getDiaries } from "../../redux/operations";
import { NavLink } from "react-router-dom";
import logo from "../../images/SlimMomLogo.png";
import slim from "../../images/Slim.png";
import mom from "../../images/Mom.png";
import menu from "../../images/menu_icon.png";

import styles from "../SharedLayout/SharedLayout.module.css";
import style from "./PrivateRoutes.module.css";

export default function PrivateRoutes() {
  const isAuth = useSelector(getIsAuthenticated);
  const dispatch = useDispatch();
  const userToken = useSelector(getUserToken);
  const tokenValability = useSelector(getTokenValability);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const checkTokenValidity = () => {
      if (Date.now() >= tokenValability) {
        sessionStorage.removeItem("user");
        navigate("/");
      }
    };

    checkTokenValidity();
    if (isAuth) {
      dispatch(getDiaries(userToken));
    }
  }, [isAuth, dispatch, userToken, tokenValability, navigate]);
  return (
    <div>
      {isAuth ? (
        <div>
          <nav className={styles.navbar}>
            <div className={style.nav__link__container}>
              <NavLink to="/homepage" className={style.nav__link}>
                <img src={logo} alt="Slim mom logo" className={style.logo} />

                <div className={style.logo__container}>
                  <img src={slim} alt="slim mom logo" />
                  <img src={mom} alt="slim mom logo" />
                </div>
              </NavLink>
            </div>
            <div className={style.links__container}>
              <NavLink to="/homepage/diary" className={styles.link}>
                Diary
              </NavLink>
              <NavLink to="/homepage" className={styles.link}>
                Calculator
              </NavLink>
            </div>
            {!isOpen ? (
              <img
                src={menu}
                alt="menu icon"
                className={style.menu__icon}
                onClick={handleOpenModal}
              />
            ) : (
              <button className={style.close__btn} onClick={handleClose}>
                x
              </button>
            )}

            {isOpen ? (
              <div>
                <div className={style.menu__modal} onClick={handleClose}>
                  <NavLink to="/homepage/diary" className={style.menu__link}>
                    Diary
                  </NavLink>
                  <NavLink to="/homepage" className={style.menu__link}>
                    Calculator
                  </NavLink>
                </div>
              </div>
            ) : (
              ""
            )}
          </nav>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
}
