import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AutoComplete, Tag, Tooltip } from "antd";
import Search from "../antd/Search";
import { useState, useCallback } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const THROTTLE_TIME = 500;
const MIN_QUERY_LENGTH = 3;

const STATUS_TO_COLOR = {
  COMPLETED: "green",
  ONGOING: "blue",
  SUSPENDED: ""
};

const query = gql`
  query($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
      image
      title
      status
    }
  }
`;

// const sanitiseTitle = title =>
//   title
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "-")
//     .replace(/-{2,}/g, "-");

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManga, setSelectedManga] = useState(null);

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

  const dataSource =
    !loading &&
    data &&
    data.mangas &&
    data.mangas.map(manga => (
      <AutoComplete.Option key={manga.id} value={manga.title}>
        <span
          className="home-search-option"
          // to={`${manga.id}-${sanitiseTitle(manga.title)}`}
          onClick={() => setSelectedManga(manga)}
        >
          <Tooltip title={manga.title} mouseEnterDelay={0.5} placement="topLeft">
            <div className="home-search-option-title" title={manga.title}>
              {manga.title}
            </div>
          </Tooltip>
          <Tag
            className="home-search-option-status"
            color={STATUS_TO_COLOR[manga.status]}
          >
            {manga.status}
          </Tag>
        </span>
      </AutoComplete.Option>
    ));

  return (
    <div className="main-search-container">
      <Search dataSource={dataSource} onChange={handleChange} />

      {selectedManga && (
        <div>
          <img src={selectedManga.image} />
        </div>
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
