import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/operations";
import { Navigate } from "react-router-dom";
import styles from "./SidePanel.module.css";
import leaves from "../../images/leaves.png";
import { Notify } from "notiflix";

import {
  getDiariesData,
  getUserToken,
  getDate,
  getUserError,
  getIsLoadingDiary,
  getUser,
} from "../../redux/selectors";
import Loader from "../Loader/Loader";
import UserPanel from "../UserPanel/UserPanel";
export default function SidePanel() {
  const user = useSelector(getUser);
  const diaries = useSelector(getDiariesData);
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const date = useSelector(getDate);
  const userError = useSelector(getUserError);
  const isLoading = useSelector(getIsLoadingDiary);
  const [isOpenUserPanel, setIsOpenUserPanel] = useState(false);
  useEffect(() => {
    if (userError) {
      Notify.failure(userError);
    }
  }, [userError]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpenUserPanel(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  const handleLogout = (event) => {
    event.preventDefault();

    try {
      dispatch(logoutUser(token));
      <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };

  const currentDiary = diaries?.filter((item) => item.date === date);
  const toggleUserPanel = () => {
    setIsOpenUserPanel(!isOpenUserPanel);
  };

  return (
    <div>
      <div className={styles.user__container}>
        <p className={styles.user__name} onClick={toggleUserPanel}>
          {user?.name}
        </p>{" "}
        <button onClick={handleLogout} className={styles.logout__user}>
          logout
        </button>
        {isOpenUserPanel && (
          <UserPanel
            name={user.name}
            email={user.email}
            closeModal={toggleUserPanel}
          />
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.side__panel}>
          <div className={styles.info__container}>
            <div>
              <h3 className={styles.info__container__title}>
                Summary for {currentDiary[0]?.date}
              </h3>
              <div className={styles.details__container}>
                <p className={styles.details__container__item}>
                  Left{" "}
                  <span>
                    {currentDiary[0]?.remainingCalories ||
                      currentDiary[0]?.necessaryCalories}{" "}
                    kcal
                  </span>
                </p>
                <p className={styles.details__container__item}>
                  Consumed{" "}
                  <span>{currentDiary[0]?.consumedCalories || 0} kcal</span>
                </p>
                <p className={styles.details__container__item}>
                  Daily rate{" "}
                  <span>{currentDiary[0]?.necessaryCalories} kcal</span>
                </p>
                <p className={styles.details__container__item}>
                  n% of normal{" "}
                  <span>{currentDiary[0]?.percentageRemaining || 100} %</span>
                </p>
              </div>
            </div>
            <div>
              <h3 className={styles.info__container__title}>
                Food not recommended
              </h3>
              <ul className={styles.details__container}>
                {currentDiary && currentDiary.length > 0 ? (
                  currentDiary[0]?.nonRecommendedFood
                    ?.reduce((uniqueCategories, item) => {
                      if (!uniqueCategories.includes(item.categories)) {
                        uniqueCategories.push(item.categories);
                      }
                      return uniqueCategories;
                    }, [])
                    .map((category) => (
                      <li
                        key={category}
                        className={styles.details__container__item}
                      >
                        {category}{" "}
                      </li>
                    ))
                ) : (
                  <li className={styles.details__container__item}>
                    Nothing yet
                  </li>
                )}
              </ul>
            </div>
          </div>
          <img src={leaves} alt="leaves" className={styles.leaves} />
        </div>
      )}
    </div>
  );
}
