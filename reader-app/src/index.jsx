import "antd/dist/antd.css";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";

import graphqlClient from "./api/graphql";
import "./global.less";
import Search from "./antd/Search";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("service-worker.js");
// }

const App = () => {
  return (
    <div className="main-container">
      <div className="main-search-container">
        <Search />
      </div>
    </div>
  );
};

render(
  <ApolloProvider client={graphqlClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("app")
);
