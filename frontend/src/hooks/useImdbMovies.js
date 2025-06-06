import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getNowPlayingMovies } from '../redux/movieSlice';
import { IMDB_BASE_URL } from '../utils/constant';

const useImdbMovies = (searchTerm) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!searchTerm) return;
        axios.get(`/api/v1/imdb/search?q=${encodeURIComponent(searchTerm)}`)
            .then(res => {
                console.log('IMDB API response:', res.data);
                let moviesArray = [];
                if (Array.isArray(res.data)) {
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
