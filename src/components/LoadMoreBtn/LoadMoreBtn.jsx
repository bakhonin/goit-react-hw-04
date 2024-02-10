import css from './LoadMoreBtn.module.css';

export const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={css.btnLoadMore} onClick={onClick}>
      Load more
    </button>
  );
};
