import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  selectModal,
  getCalories,
  getIsAuthenticated,
  getUserToken,
  getIsLoadingDiary,
  getDiaryError,
} from "../../redux/selectors";
import { openModal, closeModal } from "../../redux/ModalSlice";
import { getCaloriesPublic, getCaloriesPrivate } from "../../redux/operations";
import styles from "./Calculator.module.css";

import Loader from "../Loader/Loader";
import { Notify } from "notiflix";

export default function Calculator() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectModal);
  const data = useSelector(getCalories);
  const isAuth = useSelector(getIsAuthenticated);
  const token = useSelector(getUserToken);
  const date = moment(new Date()).format("DD.MM.YYYY");
  const diaryError = useSelector(getDiaryError);
  const isLoading = useSelector(getIsLoadingDiary);

  const [userInput, setUserInput] = useState({
    height: "",
    age: "",
    currentWeight: "",
    desiredWeight: "",
    bloodType: "",
  });
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(closeModal);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (diaryError) {
      Notify.failure(diaryError);
    }
  }, [diaryError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const handleOpenModal = () => {
    dispatch(openModal());
  };
  const handleSubmitPublic = (event) => {
    event.preventDefault();
    try {
      dispatch(getCaloriesPublic(userInput));
      handleOpenModal();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitPrivate = (event) => {
    event.preventDefault();
    try {
      const userInputPrivate = { ...userInput, date };

      dispatch(getCaloriesPrivate({ token, inputData: userInputPrivate }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.calculator__container}>
      {isLoading ? (
        <Loader />
      ) : isOpen.isOpen ? (
        <Modal data={data} />
      ) : (
        <div>
          <h1 className={styles.title}>
            Calculate your daily calorie intake right now
          </h1>
          <form
            onSubmit={isAuth ? handleSubmitPrivate : handleSubmitPublic}
            className={styles.form}
          >
            <label htmlFor="height">
              <input
                type="number"
                id="height"
                name="height"
                value={userInput.height}
                onChange={handleChange}
                required
                min="130"
                max="230"
                placeholder="Height*"
                className={styles.form__input}
              />
            </label>
            <label htmlFor="age">
              <input
                type="number"
                id="age"
                name="age"
                value={userInput.age}
                onChange={handleChange}
                required
                min="14"
                max="105"
                placeholder="Age*"
                className={styles.form__input}
              />
            </label>
            <label htmlFor="currentWeight">
              <input
                type="number"
                id="currentWeight"
                name="currentWeight"
                value={userInput.currentWeight}
                onChange={handleChange}
                required
                min="30"
                max="200"
                placeholder="Current weight*"
                className={styles.form__input}
              />
            </label>
            <label htmlFor="desiredWeight">
              <input
                type="number"
                id="desiredWeight"
                name="desiredWeight"
                value={userInput.desiredWeight}
                onChange={handleChange}
                required
                min="30"
                max="200"
                placeholder="Desired weight*"
                className={styles.form__input}
              />
            </label>
            <fieldset className={styles.fieldset}>
              <legend className={styles.fieldset__title}>Blood type*</legend>
              {[1, 2, 3, 4].map((type) => (
                <label
                  key={type}
                  htmlFor={`bloodType${type}`}
                  className={styles.radioInput__label}
                >
                  <input
                    type="radio"
                    id={`bloodType${type}`}
                    name="bloodType"
                    value={type}
                    onChange={handleChange}
                    required
                    className={styles.radioInput}
                  />
                  {type}
                </label>
              ))}
            </fieldset>
            <button type="submit" className={styles.form__button}>
              Start losing weight
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
