import styles from "./pagination.module.css";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import { Link } from "react-router-dom";
import Button from "../button/button";
import { BTN_PREV, BTN_NEXT } from "../../utils/constants";

const Pagination = ({ countItem, setCurrentPage }) => {
  const users = useContext(UsersContext);
  const countPages = Math.ceil(users?.length / countItem);
  const pageNumber = [];

  for (let i = 1; i <= countPages; i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < countPages ? prev + 1 : prev));
  };

  return (
    <section className={styles.wrapper}>
      <ul className={styles.list}>
        {pageNumber.length ? (
          <>
            <Button text={BTN_PREV} onClick={handlePrevPage} />
            <div className={styles.container_li}>
              {pageNumber.map((number) => (
                <Link
                  key={number}
                  onClick={() => paginate(number)}
                  className={styles.item_number}
                >
                  {number}
                </Link>
              ))}
            </div>
            <Button text={BTN_NEXT} onClick={handleNextPage} />
          </>
        ) : null}
      </ul>
    </section>
  );
};

export default Pagination;
