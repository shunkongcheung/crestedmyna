import React from "react";
import "./App.css";

import Layout from "./base/Layout/Layout";

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout>
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </Layout>
    </div>
  );
};

export default App;
