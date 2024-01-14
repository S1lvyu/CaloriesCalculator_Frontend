import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { registerUser } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import buttonStyles from "../Button/Button.module.css";
import { Notify } from "notiflix";
import { getIsLoadingUser, getUserError } from "../../redux/selectors";
import Loader from "../Loader/Loader";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userError = useSelector(getUserError);
  const isLoading = useSelector(getIsLoadingUser);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (userError) {
      Notify.failure(userError);
    }
  }, [userError]);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(registerUser(formData));
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div>
      <h1 className={styles.title}>Register</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className={styles.register__form}>
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Name *"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.register__input}
            />
          </label>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="Email *"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.register__input}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Password *"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.register__input}
            />
          </label>
          <div className={styles.btn__container}>
            <Button
              type="submit"
              value="Register"
              style={buttonStyles.is_selected}
            />
            <Button type="button" value="Login" onclick={handleClick} />
          </div>
        </form>
      )}
    </div>
  );
}
