import { Component, type ChangeEvent, type ReactNode } from 'react';
import './App.css';
import { API_URL } from './constants';
import type { AppState } from './types';
import { Header } from './components/Header';
import { CardList } from './components/CardList/CardList';
import { Loader } from './components/Loader';
import { ErrorButton } from './components/ErrorButton';

export default class App extends Component {
  state: AppState = {
    inputValue: '',
    searchTerm: '',
    results: [],
    isLoading: false,
    errorMessage: '',
  };
  componentDidMount() {
    const stored = localStorage.getItem('searchTerm');
    const term = stored || '';

    this.setState({ inputValue: term, searchTerm: term }, () => {
      this.fetchResults(term);
    });
  }

  fetchResults(term: string = '') {
    this.setState({ isLoading: true, errorMessage: '' });
    const url = term
      ? `${API_URL}?name=${encodeURIComponent(term)}&page=1`
      : `${API_URL}?page=1`;

    fetch(url)
      .then((res) => {
        // console.log(res);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        this.setState({ results: data.results, isLoading: false });
      })
      .catch((err) => {
        // console.error(err);
        this.setState({
          isLoading: false,
          errorMessage:
            'Oops... Rick is unavaliable right now, please try later',
        });
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

  triggerError = () => {
    throw new Error('Simulated server error!');
  };

  render(): ReactNode {
    return (
      <>
        <Header
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearchClick}
        />
        <main>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <CardList items={this.state.results} />
          )}

          <ErrorButton />
        </main>
      </>
    );
  }
}
