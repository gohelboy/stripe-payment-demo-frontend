import style from "./confirm.module.css";
import confirm from "../../assets/confirm.png";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
  const navigate = useNavigate();
  return (
    <main className={style.main}>
      <div className={style.title}>
        <h1>Your payment process done successfully</h1>
      </div>
      <div className={style.image}>
        <img src={confirm} alt="success" />
      </div>
      <div className={style.button}>
        <button onClick={() => navigate("/", { replace: true })}>
          Back to shop
        </button>
      </div>
    </main>
  );
};

export default Confirm;
