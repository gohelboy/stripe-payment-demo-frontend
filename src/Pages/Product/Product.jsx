import styles from "./product.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const getProduct = async () => {
    setIsLoading(true);
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await res.json();
    setData(data);
    setIsLoading(false);
  };
  function decrement() {
    if (qty <= 1) {
      setQty(1);
      return;
    }
    setQty(qty - 1);
  }

  function increment() {
    if (qty <= 1) {
      setQty(1);
    }
    setQty(qty + 1);
  }

  const checkout = async (product) => {
    const res = await fetch(`https://stripe-paymnet-demo-backend.onrender.com/api/create-checkout-session`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: {
            name: product.title,
            image: product.image,
            price: product.price,
            quantity: qty,
          },
        }),
      }
    );
    const data = await res.json();
    window.location.href = data.url;
  };

  useEffect(() => {
    getProduct();
  }, [qty]);

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>Product</h1>
      </div>
      <div className={styles.product_container}>
        {data ? (
          <div className={styles.product}>
            <div className={styles.image}>
              <img src={data?.image} alt={data?.image} />
            </div>
            <div className={styles.content}>
              <h2>{data?.title}</h2>
              <p className={styles.desc}>{data?.description}</p>
              <p className={styles.price}>Rs.{data?.price}</p>
              <div className={styles.quantity_btn}>
                <button onClick={decrement}>
                  <span>-</span>
                </button>
                <span className={styles.qty}>{qty}</span>
                <button onClick={increment}>
                  <span>+</span>
                </button>
              </div>
              <div className={styles.order_btn}>
                <button onClick={() => checkout(data)}>Buy</button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {isLoading === true ? (
              <div className={styles.loader}></div>
            ) : (
              <div style={{ color: "white" }}>Something went wrong!</div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Product;
