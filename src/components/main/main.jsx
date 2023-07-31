import styles from "./main.module.css";
import Pagination from "../pagination/pagination";
import ResultRender from "../result-render/result-render";
import Search from "../search/search";
import { useState } from "react";

const Main = ({ setUsers, setError, setUserRepos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countItem] = useState(10);
  const lastIndex = currentPage * countItem;
  const firstIndex = lastIndex - countItem;

  return (
    <section className={styles.wrapper}>
      <Search
        setUsers={setUsers}
        setError={setError}
      />
      <ResultRender
        firstIndex={firstIndex}
        lastIndex={lastIndex}
        setUserRepos={setUserRepos}
      />
      <Pagination countItem={countItem} setCurrentPage={setCurrentPage} />
    </section>
  );
};

export default Main;
