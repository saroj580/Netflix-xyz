import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getNowPlayingMovies } from '../redux/movieSlice';

const useImdbMovies = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.movie.searchTerm);

    useEffect(() => {
        if (!searchTerm) return;
        axios.get(`/api/v1/imdb/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => {
                console.log('IMDB API response:', res.data);
                let moviesArray = [];
                if (Array.isArray(res.data.description)) {
                    moviesArray = res.data.description;
                } else if (Array.isArray(res.data)) {
                    moviesArray = res.data;
                } else if (Array.isArray(res.data.results)) {
                    moviesArray = res.data.results;
                } else if (res.data && typeof res.data === 'object') {
                    moviesArray = [res.data];
                }
                dispatch(getNowPlayingMovies(moviesArray));
            })
            .catch(error => {
                console.log(error);
            });
    }, [dispatch, searchTerm]);
};

export default useImdbMovies;
