import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="app">
          <div className="error-banner">
            Frontend error: {this.state.error.message}
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
