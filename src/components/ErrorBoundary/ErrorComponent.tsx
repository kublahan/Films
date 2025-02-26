import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from '../../assets/error.gif';

interface ErrorBoundaryState {
  error: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorComponent extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render(): ReactNode {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}