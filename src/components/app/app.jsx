import { UsersContext } from "../../context/UsersContext";
import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../main/main";
import { PATH_HOME, PATH_USER_ID } from "../../utils/constants";
import Modal from "../modal/modal";
import UserDetails from "../user-details/user-details";
import Error from "../error/error";

const App = () => {
  const [users, setUsers] = useState();
  const [error, setError] = useState();
  const [userRepos, setUserRepos] = useState();
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleCloseModal = () =>{
    setError('')
  }

  return (
    <>
      <UsersContext.Provider value={users}>
        <Routes location={background || location}>
          <Route
            path={PATH_HOME}
            element={<Main setUsers={setUsers} setError={setError} setUserRepos={setUserRepos}/>}
          ></Route>
        </Routes>
        {background && (
          <>
            <Routes>
              <Route
                path={PATH_USER_ID}
                element={
                  <Modal>
                    <UserDetails userRepos={userRepos}/>
                  </Modal>
                }
              />
            </Routes>
          </>
        )}
        {error && (
          <Modal onClose={handleCloseModal}>
            <Error error={error}/>
          </Modal>
        )}
      </UsersContext.Provider>
    </>
  );
};

export default App;
