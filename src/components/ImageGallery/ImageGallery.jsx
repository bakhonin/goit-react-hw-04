import Modal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { ImageCard } from '../ImageCard/ImageCard';
import { useState } from 'react';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ items }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  const openModal = (image, description) => {
    setSelectedImage(image);
    setSelectedDescription(description);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedDescription(null);
    setModalIsOpen(false);
  };

  return (
    <div className={css.imageGallery}>
      <ul className={css.listImage}>
        {items.map(({ id, urls, alt_description }) => (
          <li key={id}>
            <ImageCard
              image={urls.small}
              description={alt_description}
              onClickImage={() => openModal(urls.regular, alt_description)}
            />
          </li>
        ))}
      </ul>

      <Modal
        className={css.Modal}
        overlayClassName={css.Overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <button className={css.btnCloseMolal} onClick={closeModal}>
          <AiOutlineClose size={17} />
        </button>
        {selectedImage && (
          <img className={css.imgModal} src={selectedImage} alt={selectedImage.description} />
        )}
        {selectedDescription && <h3 className={css.titleModal}>{selectedDescription}</h3>}
      </Modal>
    </div>
  );
};
