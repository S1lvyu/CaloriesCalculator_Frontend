import React from "react";
import { closeModal } from "../../redux/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectModal } from "../../redux/selectors";
import { useNavigate } from "react-router-dom";
import closeBtn from "../../images/close_button.png";
import styles from "./Modal.module.css";
export default function Modal({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectModal);
  const handleClose = () => {
    dispatch(closeModal());
  };
  if (!isOpen) {
    return null;
  }
  const handleClick = () => {
    navigate("/login");
    handleClose();
  };
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.close__button}>
          x
        </button>
        <button onClick={handleClose} className={styles.mobile__close__btn}>
          <img
            src={closeBtn}
            alt="close button"
            className={styles.mobile__close__img}
          />
        </button>
        <h2 className={styles.title}>
          Your recommended daily calorie intake is
        </h2>
        <p className={styles.calories}>
          {data.caloriesIntake}{" "}
          <span className={styles.calories__span}>kcal</span>
        </p>
        <h4 className={styles.second__title}>Foods you should not eat</h4>
        <ol className={styles.notrecommended__list}>
          {data.notAllowedFood
            ?.reduce((uniqueCategories, item) => {
              if (!uniqueCategories.includes(item.categories)) {
                uniqueCategories.push(item.categories);
              }
              return uniqueCategories;
            }, [])
            .map((category) => (
              <li key={category} className={styles.list__element}>
                {category}
              </li>
            ))}
        </ol>
        <button className={styles.modal__button} onClick={handleClick}>
          Start losing weight
        </button>
      </div>
    </div>
  );
}
