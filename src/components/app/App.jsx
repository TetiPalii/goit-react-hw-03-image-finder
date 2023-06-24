import { Button } from 'components/button/Button';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { SearchBar } from 'components/searchbar/Searchbar';
import { fetchImages } from 'helpers/fetchImages';
import { Component } from 'react';
import css from './App.module.css';
import { Circles } from 'react-loader-spinner';
import { Modal } from 'components/modal/Modal';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    totalPages: 0,
    images: [],
    isLoading: false,
    error: null,
    openModal: false,
    largeImageURL: '',
  };

  getSubmitValue = value => {
    this.setState({ images: [], value, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetchImages(this.state.value, this.state.page)
        .then(({ hits, totalHits }) => {
          const totalPages = Math.floor(totalHits / 12);
          this.setState({ totalPages });

          if (this.state.page !== prevState.page) {
            this.setState(prevState => {
              return {
                images: [...prevState.images, ...hits],
                isLoading: false,
              };
            });
          } else {
            this.setState({ images: hits, isLoading: false });
          }
        })
        .catch(error => this.setState({ error }));
    }
  }

  onLoadMoreClick = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleModal = () => {
    this.setState(prevState => ({ openModal: !prevState.openModal }));
  };

  renderModal = id => {
    const modalData = this.state.images.find(image => {
      return image.id === id;
    });
    this.setState({ largeImageURL: modalData.largeImageURL });
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.getSubmitValue} />
        {this.state.error && <p> {this.state.error}</p>}
        {this.state.isLoading && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
          value={this.state.value}
          renderModal={this.renderModal}
        />
        {this.state.images.length > 0 &&
          this.state.page !== this.state.totalPages && (
            <Button onBtnClick={this.onLoadMoreClick}></Button>
          )}
        {this.state.openModal && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            value={this.state.value}
            toggleModal={this.toggleModal}
          />
        )}
      </div>
    );
  }
}
