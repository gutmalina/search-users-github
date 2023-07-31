import styles from "./search.module.css";
import {
  TEXT_PLACEHOLDER,
  TEXT_INPUT_SORT,
  SORT_DESC,
  SORT_ASC,
  BTN_SEARCH
} from "../../utils/constants";
import Button from "../button/button";
import api from "../../utils/api";
import { useEffect, useState } from "react";

const Search = ({ setUsers, setError }) => {
  const [login, setLogin] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [sort, setSort] = useState(SORT_DESC);

  const handleChange = (e) => {
    setLogin(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    api
      .getUsers(login, sort)
      .then((res) => {
          setUsers(res.items);
      })
      .catch((err) => setError(err));
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    isChecked ? setSort(SORT_DESC) : setSort(SORT_ASC);
  }, [isChecked]);

  return (
    <>
      <form onSubmit={handleSearch} className={styles.form}>
        <article className={styles.container_inputs}>
          <input
            type="text"
            name="login"
            value={login}
            onChange={handleChange}
            placeholder={TEXT_PLACEHOLDER}
            className={styles.input_search}
            autoFocus
          ></input>
          <div className={styles.container_checkbox}>
            <p>{TEXT_INPUT_SORT}</p>
            <label>
              <input
                className={styles.ckeckbox_input}
                type="checkbox"
                defaultChecked={isChecked}
                onClick={handleChecked}
              ></input>
              <span className={styles.checkbox}></span>
            </label>
          </div>
        </article>
        <Button text={BTN_SEARCH}/>
      </form>
    </>
  );
};

export default Search;
