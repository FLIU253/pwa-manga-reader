import useLocalStorage from "../hooks/UseLocalStorage";
import * as R from "ramda";
import React, { createContext } from "react";

const FavoritedMangaContext = createContext();

export default FavoritedMangaContext;

export const Provider = ({ children }) => {
  const [favoritedManga, setFavoritedManga] = useLocalStorage("favoritedManga", []);

  const isMangaFavorited = R.flip(R.includes)(favoritedManga);

  const favoriteManga = mangaId => {
    return R.compose(
      setFavoritedManga,
      R.ifElse(isMangaFavorited, R.identity, R.append(mangaId))
    )(favoritedManga);
  };

  const unfavoriteManga = mangaId => {
    return R.compose(setFavoritedManga, R.reject(R.equals(mangaId)))(favoritedManga);
  };

  return (
    <FavoritedMangaContext.Provider
      value={{
        favoriteManga,
        favoritedManga,
        isMangaFavorited,
        unfavoriteManga
      }}
    >
      {children}{" "}
    </FavoritedMangaContext.Provider>
  );
};
