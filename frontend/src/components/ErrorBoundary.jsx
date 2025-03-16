import React, { useState, useEffect } from 'react';

// Error boundaries must be class components as of React 18
// There's no hook equivalent for componentDidCatch/getDerivedStateFromError
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 m-4" data-testid="error-boundary">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Something went wrong!</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>We've encountered an error in this component.</p>
                <p className="mt-2">Please try refreshing the page or contact support if the issue persists.</p>
              </div>
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-3 text-xs">
                  <summary className="cursor-pointer text-red-800 font-medium">Error Details (Development Only)</summary>
                  <pre className="mt-2 p-2 border border-red-200 bg-red-50 overflow-auto">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Named export
export { ErrorBoundary };

// Default export
export default ErrorBoundary;