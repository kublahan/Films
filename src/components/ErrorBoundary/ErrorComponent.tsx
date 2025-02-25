import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Обновить состояние для следующего рендера.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Можно также записать информацию об ошибке в журнал ошибок.
    console.error("Ошибка:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI вместо упавшего компонента.
      return (
        <div>
          <h1>Упс! Что-то пошло не так.</h1>
          <p>Пожалуйста, попробуйте перезагрузить страницу.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;