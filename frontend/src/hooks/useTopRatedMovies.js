import { useEffect } from 'react';
import axios from 'axios';
import { getPopularMovies } from "../redux/movieSlice";
import { IMDB_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";

const usePopularMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get(`/api/v1/imdb/search?q=top rated`)
            .then(res => {
                dispatch(getPopularMovies(res.data.results || res.data));
            })
            .catch(error => {
                console.log(error);
            });
    }, [dispatch]);
}

export default usePopularMovies;