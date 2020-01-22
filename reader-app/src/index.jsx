import "antd/dist/antd.css";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import graphqlClient from "./api/graphql";
import "./global.less";
import Home from "./pages/Home";
import Manga from "./pages/Manga";
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("service-worker.js");
// }

const App = () => {
  return (
    <div className="main-container">
      <Switch>
        <Route component={Manga} path="/:mangaId([a-z0-9]{24})-:mangaName([a-z-]+)" />
        <Route component={Home} path="/" />
      </Switch>
    </div>
  );
};

render(
  <ApolloProvider client={graphqlClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("app")
);
