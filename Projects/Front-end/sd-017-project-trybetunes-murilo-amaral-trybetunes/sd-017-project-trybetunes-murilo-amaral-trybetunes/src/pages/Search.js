import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import albumResponse from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      validateButton: true,
      tracks: [],
      prevSearchInput: '',
      isLoading: false,
    };
  }

  componentDidUpdate(_prevProps, prevState) {
    const { searchInput } = this.state;
    if (prevState.searchInput !== searchInput) {
      this.handleButtonValidation();
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleButtonValidation = () => {
    const { searchInput } = this.state;
    const minimumCharacters = 2;
    this.setState({
      validateButton: (searchInput.length < minimumCharacters),
    });
  }

  getTracks = async () => {
    const { searchInput } = this.state;
    this.setState({
      prevSearchInput: searchInput,
      isLoading: true,
    });
    const result = await albumResponse(searchInput);
    this.setState({
      tracks: [...result],
      searchInput: '',
      isLoading: false,
    });
    document.getElementsByName('searchInput').value = '';
  }

  renderTracks() {
    const { tracks, prevSearchInput } = this.state;

    if (tracks.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <p>
          { `Resultado de álbuns de: ${prevSearchInput}`}
        </p>
        { tracks.map((track) => (
          <Link
            key={ track.collectionId }
            to={ `/album/${track.collectionId}` }
            data-testid={ `link-to-album-${track.collectionId}` }
          >
            <li>{track.collectionName}</li>
          </Link>
        ))}
      </section>
    );
  }

  render() {
    const {
      searchInput,
      validateButton,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-search">
        <h1>Search</h1>
        <Header />
        { isLoading ? (<Loading />) : (
          <form>
            <label htmlFor="searchInput">
              <input
                name="searchInput"
                type="text"
                data-testid="search-artist-input"
                value={ searchInput }
                onChange={ this.handleChange }
              />
            </label>
            <button
              name="searchArtistButton"
              type="button"
              data-testid="search-artist-button"
              disabled={ validateButton }
              onClick={ this.getTracks }
            >
              Pesquisar
            </button>
          </form>
        )}
        { this.renderTracks() }
      </div>
    );
  }
}

export default Search;
