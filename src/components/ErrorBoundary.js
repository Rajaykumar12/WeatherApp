import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      const { darkMode = false } = this.props;
      
      return (
        <div className={`font-sf-pro w-screen h-screen transition-all duration-500 ${
          darkMode 
            ? 'bg-gradient-to-br from-darkPalette-blend1 via-darkPalette-blend2 to-darkPalette-accent' 
            : 'bg-gradient-to-br from-lightPalette-primary via-lightPalette-secondary to-lightPalette-tertiary'
        } ${
          darkMode ? 'text-darkPalette-text' : 'text-lightPalette-text'
        } p-4 relative overflow-hidden flex flex-col justify-center items-center`}>
          
          <div className={`text-center max-w-md mx-auto p-8 rounded-2xl backdrop-blur-xl border transition-colors duration-300 ${
            darkMode 
              ? 'bg-white/5 border-red-400/30' 
              : 'bg-white/10 border-red-500/30'
          }`}>
            <div className={`w-16 h-16 mx-auto mb-6 p-4 rounded-full ${
              darkMode ? 'bg-red-900/20' : 'bg-red-100/20'
            }`}>
              <AlertTriangle className={`w-8 h-8 ${
                darkMode ? 'text-red-300' : 'text-red-500'
              }`} />
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-red-300' : 'text-red-600'
            }`}>
              Something went wrong
            </h2>
            
            <p className={`text-sm mb-6 opacity-80 ${
              darkMode ? 'text-darkPalette-textSecondary' : 'text-lightPalette-textSecondary'
            }`}>
              We encountered an unexpected error. Please try refreshing the page or try again later.
            </p>
            
            <button
              onClick={this.handleRetry}
              className={`flex items-center justify-center gap-2 py-3 px-6 rounded-full transition-all duration-300 backdrop-blur-sm border-2 hover:scale-105 active:scale-95 w-full ${
                darkMode 
                  ? 'bg-darkPalette-card/40 border-darkPalette-accent/30 text-darkPalette-text hover:bg-darkPalette-card/60 hover:border-darkPalette-accent/50'
                  : 'bg-lightPalette-accent/20 border-lightPalette-secondary/20 text-lightPalette-text hover:bg-lightPalette-accent/30 hover:border-lightPalette-secondary/40'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Try Again</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
