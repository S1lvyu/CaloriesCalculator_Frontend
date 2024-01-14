import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDate,
  getSearchResults,
  getUserToken,
  getSearchQuery,
  getDiaryError,
} from "../../redux/selectors";
import { setSearchResults, setSearchQuery } from "../../redux/DiarySlice";
import { searchProducts, addProducts } from "../../redux/operations";

import { Notify } from "notiflix";
import styles from "./SearchForm.module.css";

export default function SearchForm({ handleInputFocus, handleInputBlur }) {
  const [productWeight, setProductWeight] = useState(100);
  const searchQuery = useSelector(getSearchQuery);
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const searchResults = useSelector(getSearchResults);
  const date = useSelector(getDate);
  const diaryError = useSelector(getDiaryError);
  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      const result = await dispatch(
        searchProducts({ token: token, query: searchQuery })
      );

      dispatch(setSearchResults(result.payload.data));
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, token, dispatch]);
  useEffect(() => {
    if (diaryError) {
      Notify.failure(diaryError);
    }
  }, [diaryError]);

  const handleChangeSearchQuery = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };
  const handleChangeProductWeight = (event) => {
    setProductWeight(event.target.value);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    try {
      const found = searchResults?.some((item) => item.title === searchQuery);

      if (!found) {
        Notify.warning("You have to select one product");
        return;
      }
      const itemToAdd = searchResults?.find(
        (item) => item.title === searchQuery
      );
      const caloriesPerGram = itemToAdd.calories / itemToAdd.weight;

      const productToAdd = {
        selectedDate: date,
        products: {
          title: itemToAdd.title,
          categories: itemToAdd.categories,
          weight: productWeight,
          calories: caloriesPerGram * productWeight,
          groupBloodNotAllowed: itemToAdd.groupBloodNotAllowed,
        },
      };

      dispatch(addProducts({ token: token, userSelection: productToAdd }));
      dispatch(setSearchQuery(""));
      Notify.success("Product Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={styles.form}>
      <label htmlFor="searchProduct">
        <input
          type="text"
          name="searchProduct"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={styles.form__input}
          placeholder="Enter product name"
        />
      </label>
      <label htmlFor="productWeight">
        <input
          type="number"
          name="productWeight"
          value={productWeight}
          onChange={handleChangeProductWeight}
          className={`${styles.form__input} ${styles.form__input__modifier}`}
        />
      </label>

      <button className={styles.form__btn} onClick={handleAddProduct}>
        +
      </button>
    </form>
  );
}
