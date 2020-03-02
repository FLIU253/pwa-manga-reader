import React, { useContext } from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import FavoritedMangaContext from "../../contexts/FavoritedMangaContext";
import * as R from "ramda";

const FavoriteButton = ({ manga }) => {
  const { favoriteManga, unfavoriteManga, isMangaFavorited } = useContext(
    FavoritedMangaContext
  );
  const isFavorited = isMangaFavorited(manga.id);
  const IconComponent = isFavorited ? StarFilled : StarOutlined;

  return (
    <IconComponent
      onClick={evt => {
        evt.stopPropagation();
        R.ifElse(isMangaFavorited, unfavoriteManga, favoriteManga)(manga.id);
      }}
      style={{
        color: isFavorited ? "orange" : "inherit"
      }}
    />
  );
};

export default FavoriteButton;
