import React from "react";
import { Link, Redirect } from "@reach/router";

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    redirect: false,
  };

  static getDerivedStateFromError = () => ({ hasError: true });

  componentDidCatch(error, info) {
    console.error("Error boundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
      // Or use navigate directly. Without use complimentary state (redirect)
      // setTimeout(() => navigate("/"), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong <Link to="/">Go home</Link>. You will be
          redirected to homepage after five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}
