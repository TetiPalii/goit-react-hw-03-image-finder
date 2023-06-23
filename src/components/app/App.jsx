import { Button } from 'components/button/Button';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { SearchBar } from 'components/searchbar/Searchbar';
import { fetchImages } from 'helpers/fetchImages';
import { Component } from 'react';
import css from './App.module.css';
import { Audio } from 'react-loader-spinner';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    totalPages: 0,
    images: [],
    isLoading: false,
    error: null,
  };

  getSubmitValue = value => {
    this.setState({ value });
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
    this.setState(prevState => ({ page: prevState.page + 40 }));
  };

  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.getSubmitValue} />
        {this.state.error && <p> {this.state.error}</p>}
        {this.state.isLoading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        )}
        <ImageGallery images={this.state.images} />
        {this.state.images.length > 0 &&
          this.state.page !== this.state.totalPages && (
            <Button onBtnClick={this.onLoadMoreClick} />
          )}
      </div>
    );
  }
}
