import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Spin } from "antd";

const query = gql`
  query($chapterId: ID!) {
    chapter(id: $chapterId) {
      id
      images {
        height
        url
        width
      }
    }
  }
`;

const MangaChapter = ({
  match: {
    params: { chapterId }
  }
}) => {
  const { data, loading } = useQuery(query, { variables: { chapterId } });

  if (loading) return <Spin />;

  return (
    <div className="manga-chapter-wrapper">
      {[...data.chapter.images].reverse().map((image, index) => (
        <div key={index}>
          <img src={image.url} referrerPolicy="no-referrer" />
        </div>
      ))}
    </div>
  );
};

export default MangaChapter;
