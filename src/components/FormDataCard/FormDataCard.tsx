import { IFormData } from '../../redux/reducers/formsDataSlice';
import classes from './FormDataCard.module.css';

interface IProps {
  cardTitle: string;
  formData: IFormData;
}

function FormDataCard({ formData, cardTitle }: IProps) {
  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{cardTitle}</h2>
      <ul className={classes.itemsList}>
        <li>
          <span className={classes.key}>Name:</span> {formData.name || '-'}
        </li>
        <li>
          <span className={classes.key}>Age:</span> {formData.age || '-'}
        </li>
        <li>
          <span className={classes.key}>Email:</span> {formData.email || '-'}
        </li>
        <li>
          <span className={classes.key}>Password:</span>{' '}
          {formData.password || '-'}
        </li>
        <li>
          <span className={classes.key}>Confirm password:</span>{' '}
          {formData.confirmPassword || '-'}
        </li>
        <li>
          <span className={classes.key}>Gender:</span> {formData.gender || '-'}
        </li>
        <li>
          <span className={classes.key}>Accept T&C:</span>{' '}
          {formData.acceptTC || '-'}
        </li>
        <li>
          <span className={classes.key}>Img:</span>
          <img style={{ width: '100%' }} src={formData.imgFile} />
          {!formData.imgFile && <span> - </span>}
        </li>
        <li>
          <span className={classes.key}>Country:</span>{' '}
          {formData.country || '-'}
        </li>
      </ul>
    </div>
  );
}

export default FormDataCard;
