import cancel from "../../assets/cancel.png";
import { useNavigate } from "react-router-dom";
import style from "../Confirm/confirm.module.css";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <main className={style.main}>
      <div className={style.title}>
        <h1>Your payment process failed for some reason.</h1>
      </div>
      <div className={style.image}>
        <img src={cancel} alt="success" />
      </div>
      <div className={style.button}>
        <button onClick={() => navigate("/", { replace: true })}>
          Back to shop
        </button>
      </div>
    </main>
  );
};

export default Cancel;
