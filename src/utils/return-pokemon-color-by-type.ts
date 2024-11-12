export const returnPokemonTypeByColor = {
  grass: '#48d0b0',
  fire: '#fb6c6c',
  water: '#76befe',
  bug: '#a8b820',
  normal: '#a8a878',
  poison: '#a040a0',
  electric: '#f8d030',
  ground: '#e0c068',
  fairy: '#f8b8e0',
  fighting: '#c03028',
  psychic: '#f85888',
  rock: '#b8a038',
  ghost: '#705898',
  ice: '#98d8d8',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  flying: '#a890f0',
}

export type PokemonType = keyof typeof returnPokemonTypeByColor
