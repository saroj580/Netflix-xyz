import { useEffect } from 'react';
import axios from 'axios';
import { getNowPlayingMovies } from "../redux/movieSlice";
import { IMDB_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`/api/v1/imdb/search?q=now playing`)
            .then(res => {
                dispatch(getNowPlayingMovies(res.data.results || res.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [dispatch]);
}

export default useNowPlayingMovies;