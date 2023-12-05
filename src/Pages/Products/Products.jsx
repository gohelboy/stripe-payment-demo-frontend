import { useState, useEffect } from "react";
import styles from "./products.module.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setLimit((prev) => prev + 3);
  };

  const getProducts = async (limit) => {
    if (limit <= 21) {
      setIsLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
      const data = await res.json();
      setData(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(limit);
  }, [limit]);

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>List</h1>
      </div>
      <div className={styles.products_container}>
        <div className={styles.container}>
          {data.length > 0 ? (
            <>
              {data?.map((product, key) => {
                return (
                  <Link className={styles.product} key={key} to={`/product/${product.id}`}>
                    <div className="image">
                      <img style={{ width: "100px" }} src={product.image} alt={key} />
                    </div>
                    <div className={styles.content}>
                      <p>{product.category}</p>
                      <h2 className={styles.name}>{product.title}</h2>
                      <p className={styles.price}>Rs.{product.price}</p>
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <>
              {isLoading === true ? (<div className={styles.loader}></div>) :
                (<div className={styles.no_data}>
                  <p>No data available!</p>
                </div>)}
            </>
          )}
        </div>
        {data.length > 0 && (
          <div className={styles.load_more_btn}>
            <button
              disabled={isLoading === true || limit >= 20}
              onClick={loadMore}>
              {isLoading === true ? (<div className={styles.loader}></div>) : (
                <span>
                  {limit >= 20 ? "No more data available!" : "Load more"}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Products;
