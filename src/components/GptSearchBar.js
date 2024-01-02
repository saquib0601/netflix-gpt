import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addGptMoviesResult } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import openAi from '../utils/openAi';

const GptSearchBar = () => {

  const dispatch = useDispatch();

  const searchText = useRef(null);
    const langKey = useSelector(store => store.config.lang)

    // search movie in TMDB

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  }

    const handleGptSearchClick = async () => {
      console.log(searchText.current.value)
      // Make an API call  to GPT API and get Movie Results
      const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query " + searchText.current.value + ". only give me 5 name of 5 movies, comma separated like the example result ahead. Example Result : Gaddar, sholay, Don, Dabang, Golmal";
      const gptResults = await openAi.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });

      // If (!gptResults.choices) {
      //   // : write Error handling
      // };

      console.log(gptResults.choices?.[0]?.message?.content);
      // Andaz Apna Apna, Hera Pheri, Chupke chupke, Janne Bhi DO Yaar, Padosan
      // split will give me array of movies
      const gptMovies = gptResults.choices?.[0]?.message?.content.split(", ");

      //  ["Andaz Apna Apna", "Hera Pheri", Chupke chupke, Janne Bhi DO Yaar, Padosan]
      // For each movie i will search TMDB API

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      // result i will get in promoise
      // {promise, promise, promise, promise, promise}
      // promise will take time   
      const tmdbResults = await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addGptMoviesResult({movieNames: gptMovies, movieResults: tmdbResults}));
    }

  return (
    <div className="pt-10 flex justify-center">
        <form className="bg-black w-1/2 grid grid-cols-12" onSubmit={(e) => e.preventDefault()}>
            <input ref={searchText} type='text' className=" p-4 m-4 col-span-9"
            placeholder={lang[langKey].gptSearchPlaceholder} />
            <button className="col-span-3 py-2 px-4 m-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar