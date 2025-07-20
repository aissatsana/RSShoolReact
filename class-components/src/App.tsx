import { Component, type ChangeEvent, type ReactNode } from 'react';
import './App.css';
import { API_URL } from './constants';
import type { AppState } from './types';
import { Header } from './components/Header';
import { CardList } from './components/CardList/CardList';
import { Loader } from './components/Loader';
import { ErrorButton } from './components/ErrorButton';

export default class App extends Component {
  private _isMounted = false;
  state: AppState = {
    inputValue: '',
    searchTerm: '',
    results: [],
    isLoading: false,
    fetchError: null,
  };

  componentDidMount() {
    this._isMounted = true;
    const stored = localStorage.getItem('searchTerm');
    const term = stored || '';

    this.setState({ inputValue: term, searchTerm: term }, () => {
      this.fetchResults(term);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchResults(term: string = '') {
    this.setState({ isLoading: true });
    const url = term
      ? `${API_URL}?name=${encodeURIComponent(term)}&page=1`
      : `${API_URL}?page=1`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (this._isMounted) {
          this.setState({ results: data.results, isLoading: false });
        }
      })
      .catch((err) => {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            fetchError: err,
          });
        }
      });
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ inputValue: e.target.value });
  };

  handleSearchClick = (): void => {
    const trimmed = this.state.inputValue.trim();

    this.setState({ searchTerm: trimmed }, () => {
      localStorage.setItem('searchTerm', trimmed);
      this.fetchResults(trimmed);
    });
  };

  render(): ReactNode {
    const { isLoading, fetchError, results, inputValue } = this.state;
    if (fetchError) {
      throw fetchError;
    }

    return (
      <>
        <Header
          inputValue={inputValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearchClick}
        />
        <main>
          {isLoading ? <Loader /> : <CardList items={results} />}

          <ErrorButton />
        </main>
      </>
    );
  }
}
