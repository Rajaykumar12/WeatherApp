import React from "react";
import WeatherApp from "./components/WeatherApp";
import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <WeatherApp />
    </ErrorBoundary>
  );
};

export default App;
