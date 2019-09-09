import React from "react";
import classNames from "./App.module.css";

import Layout from "./base/Layout/Layout";

const App: React.FC = () => {
  return (
    <div className={classNames.app}>
      <Layout>
        <header className={classNames.appHeader}>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </header>
      </Layout>
    </div>
  );
};

export default App;
