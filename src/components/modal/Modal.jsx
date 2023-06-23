import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscape);
  }

  onEscape = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };
  render() {
    const { largeImageURL, value, toggleModal } = this.props;
    return (
      <div
        className={css.Overlay}
        onClick={() => {
          toggleModal();
        }}
      >
        <div className={css.Modal}>
          <img src={largeImageURL} alt={value} />
        </div>
      </div>
    );
  }
}
