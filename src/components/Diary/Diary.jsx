import React, { useState, useEffect } from "react";
import {
  getDate,
  getDiariesData,
  getSearchResults,
  getIsLoadingDiary,
  getDiaryError,
} from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import closeBtn from "../../images/close_button.png";
import ProductsList from "../ProductsList/ProductsList";
import SearchForm from "../SearchForm/SearchForm";
import styles from "./Diary.module.css";
import { editDate, setSearchQuery } from "../../redux/DiarySlice";
import moment from "moment";

import { Notify } from "notiflix";
import Loader from "../Loader/Loader";

export default function Diary() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("DD.MM.YYYY")
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const searchResults = useSelector(getSearchResults);
  const diaryError = useSelector(getDiaryError);
  const date = useSelector(getDate);
  const diaries = useSelector(getDiariesData);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoadingDiary);
  const consumedFood = diaries?.filter((item) => item.date === date)[0]
    ?.consumedProducts;
  useEffect(() => {}, [diaries]);
  useEffect(() => {}, [date]);
  useEffect(() => {
    if (diaryError) {
      Notify.failure(diaryError);
    }
  }, [diaryError]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleOpenModal = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 1000);
  };
  const handleSelectProduct = (event) => {
    try {
      const extractedText = event.target.textContent.match(/^[^\d]*/)[0].trim();

      dispatch(setSearchQuery(extractedText));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateChange = (e) => {
    try {
      const inputDate = e.target.value;

      setSelectedDate(moment(inputDate).format("DD.MM.YYYY"));
      dispatch(editDate(moment(inputDate).format("DD.MM.YYYY")));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.date__container}>
          <p className={styles.date}>{date}</p>

          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
            max={moment().format("YYYY-MM-DD")}
            className={styles.date__input}
          />
        </div>
      )}

      {windowWidth > 320 ? (
        <SearchForm
          handleInputBlur={handleInputBlur}
          handleInputFocus={handleInputFocus}
        />
      ) : (
        <div>
          <button
            className={`${styles.form__btn} ${styles.form__btn_modifier}`}
            onClick={toggleOpenModal}
          >
            +
          </button>
          {isOpen && (
            <div className={styles.form__modal}>
              <SearchForm
                handleInputBlur={handleInputBlur}
                handleInputFocus={handleInputFocus}
              />
              <button className={styles.close__btn} onClick={toggleOpenModal}>
                <img src={closeBtn} alt="close btn" />
              </button>
              {isLoading ? (
                <Loader />
              ) : (
                isInputFocused && (
                  <ProductsList
                    data={searchResults}
                    onSelect={handleSelectProduct}
                  />
                )
              )}
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : isInputFocused ? (
        <ProductsList data={searchResults} onSelect={handleSelectProduct} />
      ) : (
        <ProductsList consumedProducts={consumedFood} title="Consumed food" />
      )}
    </div>
  );
}
