import { Component, type ReactNode } from 'react';
import './style.css';

export class Loader extends Component {
  render(): ReactNode {
    return (
      <>
        <div className="loader">
          <div className="loader__spinner"></div>
          <p className="loader__text">Loading...</p>
        </div>
      </>
    );
  }
}
