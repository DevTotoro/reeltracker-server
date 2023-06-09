const fetch = require('node-fetch');

export const search_get = async (req, res) => {
  const page = req.query.page || 1;
  const query = req.query.query;

  if (!query) {
    return res.status(400).send({ error: 'Missing query parameter' });
  }

  const urlMovies = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=${page}`;
  const urlTv = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const responseMovies = await fetch(urlMovies, options);
  const responseTv = await fetch(urlTv, options);

  if (responseMovies.status == 200 && responseTv.status == 200) {
    const dataMovies = await responseMovies.json();
    const dataTv = await responseTv.json();
    const data = {
      movies: dataMovies,
      series: dataTv
    };

    return res.status(200).json(data);
  } else if (responseMovies.status == 401 || responseTv.status == 401) {
    return res.status(401).send({ error: 'TMDB Authorization Error' });
  } else {
    return res.status(500).send({ error: 'Internal server error' });
  }
};
