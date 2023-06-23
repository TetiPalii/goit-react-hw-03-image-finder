// import { Component } from 'react';
// import { fetchImages } from 'helpers/fetchImages';
import { ImageGalleryItem } from 'components/imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, toggleModal, renderModal }) => {
  //   console.log(images);
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, largeImageURL, value }) => {
        // console.log(id, webformatURL, largeformatURL);
        return (
          <ImageGalleryItem
            renderModal={renderModal}
            toggleModal={toggleModal}
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            value={value}
          />
        );
      })}
    </ul>
  );
};
