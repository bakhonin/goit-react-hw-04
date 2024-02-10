import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSearch }) => {
  const handleSubmit = e => {
    e.preventDefault();

    if (e.target.elements.query.value.trim() === '') {
      toast.error('Empty sring!');
      return;
    }

    onSearch(e.target.elements.query.value);
    e.target.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.inputForm}
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btnSearch} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
