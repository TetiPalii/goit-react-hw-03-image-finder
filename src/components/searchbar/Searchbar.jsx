import { Component } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export class SearchBar extends Component {
  state = { value: '' };
  handleChange = ({ currentTarget: { value } }) => {
    this.setState({ value });
    // console.log(this.state);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css.SearchForm_button} type="submit">
            <span>
              <FiSearch />
            </span>
          </button>

          <input
            className={css.SearchForm_input}
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
