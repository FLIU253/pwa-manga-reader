import React from "react";
import { render } from "react-dom";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

render(<h1>working</h1>, document.getElementById("app"));
