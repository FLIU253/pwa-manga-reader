import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Search from "../antd/Search";
import { useState, useCallback } from "react";
import _ from "lodash";

const THROTTLE_TIME = 500;
const MIN_QUERY_LENGTH = 3;

const query = gql`
  query($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
      title
    }
  }
`;

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading } = useQuery(query, {
    skip: searchQuery.length < MIN_QUERY_LENGTH,
    variables: { searchTitle: searchQuery }
  });

  const handleChange = useCallback(
    _.throttle(searchQuery => {
      setSearchQuery(searchQuery);
    }, THROTTLE_TIME),
    [setSearchQuery]
  );

  return (
    <div className="main-search-container">
      <Search onChange={handleChange} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Home;
