import axios from 'axios'

const base = 'https://pokeapi.co/api/v2'
export const api = axios.create({
  baseURL: base,
})
