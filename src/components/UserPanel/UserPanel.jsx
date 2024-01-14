import React, { useState, useEffect } from "react";
import { UpdateUser } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { getUserToken, getUserError } from "../../redux/selectors";
import styles from "./UserPanel.module.css";
import { Notify } from "notiflix";
export default function UserPanel({ name, email, closeModal }) {
  const dispatch = useDispatch();
  const token = useSelector(getUserToken);
  const [inputName, setInputName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userError = useSelector(getUserError);
  const handleChangeName = (event) => {
    setInputName(event.target.value);
  };
  const toggleInputForm = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (userError) {
      Notify.failure(userError);
    }
  }, [userError]);
  const handleChangeUserName = (event) => {
    event.preventDefault();

    try {
      dispatch(UpdateUser({ token, name: inputName }));
      setInputName("");
      toggleInputForm();
      setIsOpen(false);
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      <button className={styles.close__btn} onClick={closeModal}>
        x
      </button>
      <p className={styles.text}> Name: {name}</p>
      <p className={styles.text}>Email: {email}</p>
      <button onClick={toggleInputForm} className={styles.button}>
        Change Name
      </button>
      {isOpen && (
        <form onSubmit={handleChangeUserName} className={styles.form}>
          <label htmlFor="changeName">
            <input
              type="text"
              required
              min="3"
              placeholder="Enter new name"
              id="changeName"
              value={inputName}
              onChange={handleChangeName}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Done
          </button>
        </form>
      )}
    </div>
  );
}
