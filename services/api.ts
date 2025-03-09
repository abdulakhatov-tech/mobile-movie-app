export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string }) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const repsonse = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,

    })

    if (!repsonse.ok) {
        // @ts-ignore
        throw new Error('Failed to fetch movies', Response.statusText);
    }

    const data = await repsonse.json();

    return data.results;
}



export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    try {
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_keys=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if (!response.ok) {
            // @ts-ignore
            throw new Error('Failed to fetch movie details', response.statusText);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}
