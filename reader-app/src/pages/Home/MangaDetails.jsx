import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Spin, List } from "antd";
import html_entity_decode from "locutus/php/strings/html_entity_decode";
import { Link } from "react-router-dom";
import sanitiseTitle from '../../helpers/sanitiseTitle';

const query = gql`
  query($mangaId: ID!) {
    manga(id: $mangaId) {
      id
      image
      info {
        description
        chapters {
          id
          title
        }
      }
      title
    }
  }
`;

const MangaDetails = ({ mangaId }) => {
  const { data, loading } = useQuery(query, {
    variables: { mangaId }
  });

  if (loading)
    return (
      <div className="manga-details-spinner">
        <Spin />
      </div>
    );

  return (
    <div className="manga-details-wrapper">
      <div className= "manga-details-image-wrapper">
      <img
      className="manga-details-image"
      src={data.manga.image}
      referrerPolicy="no-referrer"
      /></div>
      <div className="manga-details-info">
        <p> {html_entity_decode(data.manga.info.description)}</p>
        <List
          size="small"
          bordered
          dataSource={data.manga.info.chapters}
          renderItem={(chapter, index) => (
            <List.Item>
              <Link to={`/${mangaId}-${sanitiseTitle(data.manga.title)}/${chapter.id}`}>
                #
                {String(data.manga.info.chapters.length - index).padStart(
                  data.manga.info.chapters.length.toString().length,
                  "0"
                )}
                - {chapter.title}
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MangaDetails;
