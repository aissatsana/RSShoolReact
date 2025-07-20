import { Component } from 'react';

type State = {
  shouldThrow: boolean;
};

export class ErrorButton extends Component<{}, State> {
  state: State = { shouldThrow: false };

  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render() {
    if (this.state.shouldThrow) {
      throw new Error('Simulated error from ErrorButton!');
    }

    return <button onClick={this.handleClick}>Simulate Server Error</button>;
  }
}
