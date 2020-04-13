import React, {useRef} from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Spin } from "antd";

import LazyLoadedImage from '../components/LazyLoadedImage';

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

  const wrapperRef = useRef();

  if (loading) return <div className="manga-chapter-spinner">
  <Spin /></div>;

  return (
    <div className="manga-chapter-wrapper">
      {[...data.chapter.images].reverse().map((image, index) => (

        <div key = {index}>
        <LazyLoadedImage src={image.url} referrerPolicy="no-referrer" rootRef = {wrapperRef} 
        placeholderHeight  = {1000}/>
        </div>
        
        // <div key={index}>
        //   <img src={image.url} referrerPolicy="no-referrer" />
        // </div>
      ))}
    </div>
  );
};

export default MangaChapter;
