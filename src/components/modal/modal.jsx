import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import IconClose from "../../images/IconClose";
import { PATH_HOME } from "../../utils/constants";

const modalRoot = document.querySelector("#root-modal");

const Modal = ({ children, onClose }) => {
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigate(PATH_HOME);
    }
  }, [navigate]);

  useEffect(() => {
    const close = (e) => {
      if (e.code === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
    };
  }, [handleClose]);

  return createPortal(
    <>
      <section className={styles.wrapper} onClick={handleClose}>
        {children}
        <div onClick={handleClose} className={styles.btn_close}>
          <IconClose />
        </div>
      </section>
    </>,
    modalRoot
  );
};

export default Modal;
