import { Component, ErrorInfo, ReactNode } from 'react';
import './ErrorPage.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1 className="error-page__info">
            {`Ops..., something went wrong :(`}
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}
