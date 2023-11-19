import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import classes from './DetailsPage.module.css';
import { useGetDetailedProductQuery } from '../../store/reducers/doomerApi';
import { useAppDispatch } from '../../hooks/redux';
import { setIsDetailedPageLoading } from '../../store/reducers/appSlice';
import { useEffect } from 'react';

function DetailsPage() {
  const params = useParams();
  const { data, isLoading } = useGetDetailedProductQuery(Number(params.id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = () => {
    navigate(`/${window.location.search}`);
  };

  useEffect(() => {
    dispatch(setIsDetailedPageLoading(isLoading));
  }, [dispatch, isLoading]);

  return (
    <div className={classes.productWrapper}>
      {isLoading && <Loader />}
      {!isLoading && data && (
        <div className={classes.productWrapper} data-testid="detailedCard">
          <div className={classes.middleware} onClick={handleClick}></div>
          <div className={classes.product}>
            <button className={classes.closeButton} onClick={handleClick}>
              Close
            </button>
            <img src={data.images[0]} alt="img" />
            <div className={classes.title}>{data.title}</div>
            <div className={classes.productDescription}>
              <div>
                <span>Brand:</span>
                {data.brand}
              </div>
              <div>
                <span>Price:</span>
                {data.price}
              </div>
              <div>
                <span>Description:</span>
                {data.description}
              </div>
              <div>
                <span>Rating:</span>
                {data.rating}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsPage;
