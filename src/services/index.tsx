import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest',
});
