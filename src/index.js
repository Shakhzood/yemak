import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { BrowserRouter as Router } from "react-router-dom";

import { store } from "./Store/Store";
import { Provider } from "react-redux";

import { AppProvider } from "./context";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </AppProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);
