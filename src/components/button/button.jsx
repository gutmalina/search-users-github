import styles from './button.module.css';

const Button = ({text, onClick}) => {
  return (
    <>
      <button type="submit" className={styles.btn} onClick={onClick}>{text}</button>
    </>
  );
};

export default Button;
