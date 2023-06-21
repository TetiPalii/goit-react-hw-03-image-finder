import { Button } from 'components/button/Button';
import { ImageGallery } from 'components/imageGallery/ImageGallery';
import { SearchBar } from 'components/searchbar/Searchbar';
import { fetchImages } from 'helpers/fetchImages';
import { Component } from 'react';
import css from './App.module.css';

export class App extends Component {
  state = {
    value: '',
    images: [],
    isLoading: false,
    error: null,
  };

  getSubmitValue = value => {
    this.setState({ value });
  };
  componentDidUpdate(_, prevState) {
    if (prevState.value !== this.state.value) {
      fetchImages(this.state.value)
        .then(({ hits }) =>
          this.setState({ images: [...hits], isLoading: false })
        )
        .catch(error => console.log(error));
      // console.log(this.state.images);
    }
  }
  render() {
    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.getSubmitValue} />
        <ImageGallery images={this.state.images} />
        {this.state.images.length > 0 && <Button />}
      </div>
    );
  }
}
