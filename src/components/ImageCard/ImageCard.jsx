import css from './ImageCard.module.css';

export const ImageCard = ({ image, description, onClickImage }) => {
  return (
    <div>
      <img className={css.ImageCard} src={image} alt={description} onClick={onClickImage} />
    </div>
  );
};
