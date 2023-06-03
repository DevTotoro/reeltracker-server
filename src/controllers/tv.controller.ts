const fetch = require('node-fetch');

export const popular_get = async (req, res) => {
  const page = req.query.page || 1;

  const url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;
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

  const url = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
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
