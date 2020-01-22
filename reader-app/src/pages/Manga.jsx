import React from "react";

const Manga = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h1>UWU</h1>
      <pre>{JSON.stringify(match.params, null, 2)}</pre>
    </div>
  );
};

export default Manga;
