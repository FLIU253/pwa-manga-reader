import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AutoComplete, Tag, Tooltip } from "antd";
import Search from "../../antd/Search";
import { useState, useCallback } from "react";
import _ from "lodash";
import MangaDetails from "./MangaDetails";
import FavoriteButton from "./FavoriteButton";
import FavoritedManga from './FavoritedManga';
import {Link} from 'react-router-dom';
import sanitiseTitle from '../../helpers/sanitiseTitle';


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

const Home = ({match}) => {
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
    data.mangas.map(manga => {
      return (
        <AutoComplete.Option key={manga.id} value={manga.title}>
          <Link
            className="home-search-option"
            // to={`${manga.id}-${sanitiseTitle(manga.title)}`}
            onClick={() => setSelectedManga(manga)}
            to={`/${manga.id}-${sanitiseTitle(manga.title)}`}
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
            <FavoriteButton manga={manga} />
          </Link>
        </AutoComplete.Option>
      );
    });

  return (
    <div className="main-search-container">
      <Search dataSource={dataSource} onChange={handleChange} />
      {match?.params?.mangaId ? <MangaDetails mangaId={match?.params?.mangaId} /> : (
        <FavoritedManga/>
      )}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
