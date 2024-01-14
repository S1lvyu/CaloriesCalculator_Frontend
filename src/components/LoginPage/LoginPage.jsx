import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import { loginUser } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getIsAuthenticated,
  getIsLoadingUser,
  getUserError,
} from "../../redux/selectors";
import buttonStyles from "../Button/Button.module.css";
import { Notify } from "notiflix";
import styles from "./LoginPage.module.css";
import Loader from "../Loader/Loader";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(getIsAuthenticated);
  const isLoading = useSelector(getIsLoadingUser);
  const userError = useSelector(getUserError);
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
      dispatch(loginUser(formData));
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    navigate("/register");
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/homepage");
    }
  }, [isAuth, navigate]);
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className={styles.login__form}>
          <label htmlFor="email">
            <input
              type="text"
              placeholder="Email *"
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.login__input}
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
              className={styles.login__input}
            />
          </label>
          <div className={styles.btn__container}>
            <Button
              type="submit"
              value="Login"
              style={buttonStyles.is_selected}
            />
            <Button type="button" value="Register" onclick={handleClick} />
          </div>
        </form>
      )}
    </div>
  );
}
