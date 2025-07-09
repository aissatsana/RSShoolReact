import { Component, type ChangeEvent, type ReactNode } from 'react';
import './App.css';
import { API_URL } from './constants';
import type { AppState } from './types';
import { Header } from './components/Header';

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
      ? `${API_URL}?search=${encodeURIComponent(term)}`
      : API_URL;

    fetch(url)
      .then((res) => {
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
          errorMessage: 'Oops... Something went wrong, no Star Wars for today',
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

  render(): ReactNode {
    return (
      <>
        <Header
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onSearch={this.handleSearchClick}
        />
        <main>
          <div>there will be smth</div>
        </main>
      </>
    );
  }
}
