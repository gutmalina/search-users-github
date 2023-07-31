import styles from './result-render.module.css';
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../context/UsersContext";
import { Link, useLocation } from "react-router-dom";
import { PATH_HOME, TEXT_FOUND } from "../../utils/constants";
import api from "../../utils/api";

const ResultRender = ({ firstIndex, lastIndex, setUserRepos }) => {
  const users = useContext(UsersContext);
  const location = useLocation();
  const [renderUsers, setRenderUsers] = useState();

  const handleClick = (login ) => {
    setUserRepos('')
    api
      .getRepositories(login)
      .then((res) => setUserRepos(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    users && setRenderUsers(users.slice(firstIndex, lastIndex));
  }, [users, firstIndex, lastIndex]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>{TEXT_FOUND}{renderUsers?.length}</h1>
      <ul className={styles.list}>
        {renderUsers
          ? renderUsers.map((item, index) => (
              <li key={item.id} className={styles.li}>
                <Link
                  to={`${PATH_HOME}${item.id}`}
                  state={{ background: location }}
                  onClick={() => {
                    handleClick(item.login);
                  }}
                  className={styles.link}
                >
                  <p>{index + 1}</p>
                  <p id='name_user'>{item.login}</p>
                </Link>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
};

export default ResultRender;
