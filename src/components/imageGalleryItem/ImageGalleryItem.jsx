import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {};
  onImageClick = () => {
    // console.log(this.props.id);
    this.props.renderModal(this.props.id);
    this.props.toggleModal();
  };
  render() {
    return (
      <li className={css.ImageGalleryItem} onClick={this.onImageClick}>
        <img
          className={css.ImageGalleryItem_image}
          src={this.props.webformatURL}
          alt={this.props.value}
        />
      </li>
    );
  }
}

// export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
//   return (
//     <li className={css.ImageGalleryItem}>
//       <img
//         className={css.ImageGalleryItem_image}
//         src={webformatURL}
//         alt={tags}
//       />
//     </li>
//   );
// };
