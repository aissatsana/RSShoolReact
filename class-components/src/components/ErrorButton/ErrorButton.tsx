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
      throw new Error(
        'Oops... Rick is unavaliable right now, please try later!'
      );
    }

    return <button onClick={this.handleClick}>Simulate Server Error</button>;
  }
}
