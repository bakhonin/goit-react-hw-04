import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { SearchBar } from '../SearchBar/SearchBar';
import { useEffect, useState } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { fetchImages } from '../../images-api';
import { LoadMoreBtn } from '../LoadMoreBtn/LoadMoreBtn';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import css from './App.module.css';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const searchImages = async newQuery => {
    setQuery(`${Date.now()}/${newQuery}`);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const { images: fetchedImages, total_pages } = await fetchImages(query.split('/')[1], page);
        if (total_pages === 0) {
          toast.error('No images found for your request 😞');
          setShowBtn(false);
        } else if (page <= total_pages) {
          setImages(prevImages => [...prevImages, ...fetchedImages]);
          setShowBtn(page < total_pages);
        }
      } catch (error) {
        toast.error('Oops, there was an error, please try reloading 😭');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={searchImages} />
      {images.length > 0 && <ImageGallery items={images} />}
      {loading && <Loader />}
      {showBtn && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {error && <ErrorMessage message={error} />}
      <Toaster position="top-right" />
    </div>
  );
};
