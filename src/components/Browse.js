import React from 'react';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {

  useNowPlayingMovies();

  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>

        {/* MainContainer
          - VideoBackground
          - VideoTitle
        SecondaryCOntainer
          - MovieList * n
          - MovieCard * n */}

    </div>
  )
}

export default Browse;