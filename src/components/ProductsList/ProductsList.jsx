import React, { useEffect } from "react";
import styles from "./ProductsList.module.css";
import { deleteProduct } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import {
  getDate,
  getUserToken,
  getIsLoadingDiary,
  getDiaryError,
} from "../../redux/selectors";
import { Notify } from "notiflix";
import Loader from "../Loader/Loader";

export default function ProductsList({
  data,
  onSelect,
  title,
  consumedProducts,
}) {
  const dispatch = useDispatch();
  const date = useSelector(getDate);
  const token = useSelector(getUserToken);
  const diaryError = useSelector(getDiaryError);
  const isLoading = useSelector(getIsLoadingDiary);
  useEffect(() => {
    if (diaryError) {
      Notify.failure(diaryError);
    }
  }, [diaryError]);
  const handleDelete = (id) => {
    try {
      dispatch(
        deleteProduct({ token: token, productId: id, selectedDate: date })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className={`${styles.results__container} ${styles.result__container__modal}`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          <ul className={`${styles.list} ${styles.list__modal}`}>
            <li className={styles.list__header}>
              <span className={styles.list__name}>Name</span>{" "}
              <span className={styles.list__weight}>weight</span>{" "}
              <span className={styles.list__category}>category</span>{" "}
              <span className={styles.list__calories}>calories</span>
            </li>
            <div className={styles.results}>
              {data?.map((item) => (
                <li
                  key={item._id}
                  onClick={onSelect}
                  className={styles.list__item}
                >
                  <span className={styles.list__name}>{item.title}</span>{" "}
                  <span className={styles.list__weight}>{item.weight} g</span>{" "}
                  <span className={styles.list__category}>
                    {item.categories}
                  </span>{" "}
                  <span className={styles.list__calories}>
                    {item.calories} kcal
                  </span>
                </li>
              ))}
            </div>
          </ul>
        )
      )}
      {isLoading ? (
        <Loader />
      ) : (
        consumedProducts && (
          <div
            className={`${styles.results__container} ${styles.results__container__modifier}`}
          >
            <h4 className={styles.consumedproducts__title}>{title}</h4>
            <ul>
              {consumedProducts?.map((item) => {
                return (
                  <li key={item._id} className={styles.consumedproducts__item}>
                    <span className={styles.consumedproducts__name}>
                      {item.title}
                    </span>
                    <span className={styles.consumedproducts__weight}>
                      {item.weight} g
                    </span>
                    <span className={styles.consumedproducts__calories}>
                      {item.calories} kcal
                    </span>
                    <button
                      className={styles.delete__btn}
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      x
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )
      )}
    </div>
  );
}
