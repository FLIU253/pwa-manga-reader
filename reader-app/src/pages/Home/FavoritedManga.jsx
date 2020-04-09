import React, {useContext} from 'react';
import {Spin, Typography, List, Tag} from 'antd';
import FavoritedMangaContext from "../../contexts/FavoritedMangaContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import {Link} from 'react-router-dom';
import sanitiseTitle from '../../helpers/sanitiseTitle';

const query = gql`
    query($ids: [ID!]!) {
        mangas(ids: $ids) {
            id
            lastUpdated
            title
        }
    }
`;

const {Title} = Typography;

const FavoritedManga = () => {

    const {favoritedManga} = useContext(FavoritedMangaContext);

    const {data, loading} = useQuery(query, {variables: {ids: favoritedManga}});

    if(loading)
        return (
            <div className="manga-details-spinner">
            <Spin/>
            </div>
        )

    return <div className = "favorited-manga-wrapper">
    <Title level = {4}>Favorited Mangas</Title>

    <List
    bordered
    dataSource={data.mangas}
    renderItem={manga => (
        <Link to={`/${manga.id}-${sanitiseTitle(manga.title)}`}>
      <List.Item className = "favorited-manga-list-item">
        {manga.title}
        <Tag className = "favorited-manga-list-item-tag">
        Updated {formatDistanceToNow(new Date(manga.lastUpdated))} ago 
        </Tag>
      </List.Item>
      </Link>
    )}
    size = "small"
    />
    </div>
}  

export default FavoritedManga;