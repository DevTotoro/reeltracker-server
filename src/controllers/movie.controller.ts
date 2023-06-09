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

  const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}`;
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

export const details_get = async (req, res) => {
  const id = req.params.id;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
  };
  const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const detailsResponse = await fetch(detailsUrl, options);

  if (detailsResponse.status === 401) {
    return res.status(401).send({ error: 'TMDB Authorization Error' });
  } else if (detailsResponse.status !== 200) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }

  const detailsData = await detailsResponse.json();

  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  const creditsResponse = await fetch(creditsUrl, options);

  if (creditsResponse.status === 401) {
    return res.status(401).send({ error: 'TMDB Authorization Error' });
  } else if (creditsResponse.status !== 200) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }

  const creditsData = await creditsResponse.json();

  const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;

  const reviewsResponse = await fetch(reviewsUrl, options);

  if (reviewsResponse.status === 401) {
    return res.status(401).send({ error: 'TMDB Authorization Error' });
  } else if (reviewsResponse.status !== 200) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }

  const reviewsData = await reviewsResponse.json();

  const data = {
    ...detailsData,
    credits: creditsData,
    reviews: reviewsData
  };

  return res.status(200).json(data);
};
