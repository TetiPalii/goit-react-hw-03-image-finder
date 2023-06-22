import { Button } from 'components/button/Button';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { SearchBar } from 'components/searchbar/Searchbar';
import { fetchImages } from 'helpers/fetchImages';
import { Component } from 'react';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    page: 1,
    images: [],
    isLoading: false,
    error: null,
  };

  getSubmitValue = value => {
    this.setState({ value });
  };
  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value) {
      fetchImages(this.state.value, this.state.page)
        .then(({ hits }) =>
          this.setState({ images: [...hits], isLoading: false })
        )
        .catch(error => console.log(error));
    }
    if (prevState.page !== this.state.page) {
      // console.log(prevState);
      // console.log(this.state);
      console.log(this.state.page);
      fetchImages(this.state.value, this.state.page) //
        .then(({ hits }) => {
          console.log(hits);
          this.setState({ images: [...prevState.images, ...hits] });
        })
        .catch(error => console.log(error));
    }
    console.log(this.state.images);
  }

  onLoadMoreClick = e => {
    // console.log(e);
    this.setState(prevState => ({ page: prevState.page + 1 }));
    // console.log(this.state.page);
  };
  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.getSubmitValue} />
        <ImageGallery images={this.state.images} />
        {this.state.images.length > 0 && (
          <Button onBtnClick={this.onLoadMoreClick} />
        )}
      </div>
    );
  }
}
