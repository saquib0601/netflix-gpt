import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/movieSlices";

const usePopularMovies = () => {


    // Fetch Data from TMDB API and update store
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);
      dispatch(addPopularMovies(json.results));
    }
  
    useEffect(() => {
        getPopularMovies();
    }, [])

    return (
        <></>
    )
}

export default usePopularMovies;