import styles from "./user-details.module.css";
import { useParams, Link } from "react-router-dom";
import { UsersContext } from "../../context/UsersContext";
import { useContext, useEffect, useState } from "react";
import {
  TEXT_USER_COUTN_REPOS,
  TEXT_USER_TYPE,
  LINK_REPOS,
} from "../../utils/constants";
import IconGithub from "../../images/IconGithub";

const UserDetails = ({ userRepos }) => {
  const { id } = useParams();
  const users = useContext(UsersContext);
  const [user, setUser] = useState();

  useEffect(() => {
    users && setUser(users.filter((item) => item.id === +id));
  }, [users, id]);

  return (
    <>
      <div className={styles.container}>
        {user ? (
          <>
            <article className={styles.container_title}>
              <h2 className={styles.title}>{user[0].login} </h2>
              <Link
                to={user[0].html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconGithub />
              </Link>
            </article>
            <article className={styles.about_user}>
              <section className={styles.description}>
                <p className={styles.subtitle}>
                  {TEXT_USER_TYPE}
                  {user[0].type}
                </p>

                <p className={styles.subtitle}>
                  {TEXT_USER_COUTN_REPOS}
                  {userRepos?.length}
                </p>
              </section>
              <img
                src={user[0].avatar_url}
                alt={user[0].login}
                className={styles.img}
              ></img>
            </article>
            <ul className={styles.list_repos}>
              {userRepos
                ? userRepos.map((item, index) => (
                    <li key={item.id} className={styles.item_repos}>
                      <p>{index + 1}</p>
                      <h3 className={styles.title_repos}>{item.name}</h3>
                      <Link
                        to={item.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link_repos}
                      >
                        {LINK_REPOS}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </>
        ) : null}
      </div>
    </>
  );
};

export default UserDetails;
