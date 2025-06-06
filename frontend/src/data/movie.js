export const crimeMovies = [
  { '#TITLE': 'HIT: The Third Case', '#IMG_POSTER': '...', '#ACTORS': 'Actor 1, Actor 2', '#YEAR': 2023, '#IMDB_URL': '...' },
  { '#TITLE': 'K.O.', '#IMG_POSTER': '...', '#ACTORS': 'Actor 3, Actor 4', '#YEAR': 2022, '#IMDB_URL': '...' },
  // ...more movies
];

export const tvShows = [
  { '#TITLE': 'Star Trek: The Next Generation', '#IMG_POSTER': '...', '#ACTORS': 'Patrick Stewart', '#YEAR': 1987, '#IMDB_URL': '...' },
  { '#TITLE': 'Suits', '#IMG_POSTER': '...', '#ACTORS': 'Gabriel Macht', '#YEAR': 2011, '#IMDB_URL': '...' },
  // ...more shows
];

export const top10 = [
  { '#TITLE': 'Movie 1', '#IMG_POSTER': '...', '#ACTORS': '...', '#YEAR': 2024, '#IMDB_URL': '...' },
  // ...more movies
];

export function shuffleArray(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
