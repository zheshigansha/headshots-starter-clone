import axios from 'axios';

export const astria = axios.create({
  baseURL: 'https://api.astria.ai',
  headers: {
    Authorization: `Bearer ${process.env.ASTRIA_API_KEY}`,
    'Content-Type': 'application/json',
  },
}); 