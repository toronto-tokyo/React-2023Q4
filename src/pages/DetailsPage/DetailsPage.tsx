import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DummyAPI } from '../../API/DummyAPI';
import { ProductData } from '../../types';
import Loader from '../../components/Loader/Loader';
import classes from './DetailsPage.module.css';

function DetailsPage() {
  const [product, setProduct] = useState<ProductData | string>('');
  const [isLoaded, setIsLoaded] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProduct(Number(params.id));
  }, [params]);

  const getProduct = async (id: number) => {
    setIsLoaded(false);
    try {
      const response = await DummyAPI.getProduct(id);
      setProduct(response);
    } catch (error) {
      console.error(error);
    }
    setIsLoaded(true);
  };

  const handleClick = () => {
    navigate(`/${window.location.search}`);
  };

  return (
    <div>
      {isLoaded ? (
        typeof product === 'object' && (
          <div className={classes.productWrapper}>
            <div className={classes.middleware} onClick={handleClick}></div>
            <div className={classes.product}>
              <button className={classes.closeButton} onClick={handleClick}>
                Close
              </button>
              <img src={product.images[0]} alt="img" />
              <div className={classes.title}>{product.title}</div>
              <div className={classes.productDescription}>
                <div>
                  <span>Brand:</span>
                  {product.brand}
                </div>
                <div>
                  <span>Price:</span>
                  {product.price}
                </div>
                <div>
                  <span>Description:</span>
                  {product.description}
                </div>
                <div>
                  <span>Rating:</span>
                  {product.rating}
                </div>
              </div>
            </div>
          </div>
        )
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
}

export default DetailsPage;
