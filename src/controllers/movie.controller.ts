const fetch = require('node-fetch');

export const popular_get = async (req, res) => {
  const page = req.query.page || 1;

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const response = await fetch(url, options);

  switch (response.status) {
    case 200:
      const data = await response.json();
      return res.status(200).json(data);
    case 401:
      return res.status(401).send({ error: 'TMDB Authorization Error' });
    default:
      return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const top_rated_get = async (req, res) => {
  const page = req.query.page || 1;

  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const response = await fetch(url, options);

  switch (response.status) {
    case 200:
      const data = await response.json();
      return res.status(200).json(data);
    case 401:
      return res.status(401).send({ error: 'TMDB Authorization Error' });
    default:
      return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const upcoming_get = async (req, res) => {
  const page = req.query.page || 1;

  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const response = await fetch(url, options);

  switch (response.status) {
    case 200:
      const data = await response.json();
      return res.status(200).json(data);
    case 401:
      return res.status(401).send({ error: 'TMDB Authorization Error' });
    default:
      return res.status(500).send({ error: 'Internal Server Error' });
  }
};

export const genre_get = async (req, res) => {
  const page = req.query.page || 1;
  const genreId = req.query.genreId;

  if (!genreId) {
    return res.status(400).send({ error: 'Genre ID not provided' });
  }

  const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };

  const response = await fetch(url, options);

  switch (response.status) {
    case 200:
      const data = await response.json();

      const filtered = data.results.filter((movie) =>
        movie.genre_ids.includes(Number(genreId))
      );

      return res.status(200).json({ results: filtered });

    case 401:
      return res.status(401).send({ error: 'TMDB Authorization Error' });
    default:
      return res.status(500).send({ error: 'Internal Server Error' });
  }
};
