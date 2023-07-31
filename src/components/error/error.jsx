import styles from "./error.module.css";
import { TEXT_ERROR_LOADER } from "../../utils/constants";

const Error = ({ error }) => {
  
  return (
    <>
      <div className={styles.container}>
        {error ? (
          <>
            <h3>{TEXT_ERROR_LOADER}{error}</h3>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Error;
