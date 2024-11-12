import { useMemo } from 'react'

export interface Pokemon {
  id: string
  name: string
  image: string
  types: string[]
}

export interface PokemonType {
  id: string
  name: string
}

export interface PokemonData {
  id: string // "005"
  name: string // "charmeleon"
  height: number // 1.1
  weight: number // 19.0
  types: string[] // ["fire"]
  abilities: string[] // ["blaze"]
  stats: {
    name: string // "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed"
    value: number // 58 (valor base do status)
  }[]
  image: string // URL da imagem oficial
  category: string // "Flame"
}

const usePokemons = () => {
  async function filterPokemonsByType(typeIndex: string): Promise<Pokemon[]> {
    return await fetch(`https://pokeapi.co/api/v2/type/${typeIndex}?limit=20`)
      .then((response) => response.json())
      .then(async ({ pokemon }) => {
        const pokemons: Pokemon[] = await Promise.all(
          pokemon.map(async (result: any) => {
            const res = await fetch(result.pokemon.url)
            const pokemon = await res.json()
            return {
              id: pokemon.id,
              name: pokemon.name,
              image:
                pokemon.sprites.other.dream_world.front_default ??
                pokemon.sprites.front_default,
              types: pokemon.types.map((typeInfo: any) => typeInfo.type.name),
            }
          }),
        )

        return pokemons
      })
  }

  async function getAllPokemons(limit?: number): Promise<Pokemon[]> {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit ?? 20}`)
      .then((response) => response.json())
      .then(async ({ results }) => {
        const pokemons = await Promise.all(
          results.map(async (result: any) => {
            const res = await fetch(result.url)
            const pokemon = await res.json()
            return {
              id: pokemon.id,
              name: pokemon.name,
              image:
                pokemon.sprites.other.dream_world.front_default ??
                pokemon.sprites.front_default,
              types: pokemon.types.map((typeInfo: any) => typeInfo.type.name),
            }
          }),
        )

        return pokemons
      })
  }

  async function getAllPokemonsTypes(): Promise<PokemonType[]> {
    return fetch('https://pokeapi.co/api/v2/type')
      .then((response) => response.json())
      .then((data) => {
        const types = data.results.map((type: any, index: number) => ({
          id: String(index + 1),
          name: type.name,
        }))
        return types
      })
  }

  async function getPokemonById(id: string | number): Promise<PokemonData> {
    // Dados principais do Pokémon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = await response.json()

    // Para informações adicionais como categoria
    const speciesResponse = await fetch(pokemon.species.url)
    const species = await speciesResponse.json()

    return {
      id: pokemon.id.toString().padStart(3, '0'),
      name: pokemon.name,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      types: pokemon.types.map((type: any) => type.type.name),
      abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
      stats: pokemon.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      image: pokemon.sprites.other['official-artwork'].front_default,
      category:
        species.genera.find((genus: any) => genus.language.name === 'en')
          ?.genus || 'Flame',
    }
  }

  return useMemo(() => {
    return {
      filterPokemonsByType,
      getAllPokemons,
      getAllPokemonsTypes,
      getPokemonById,
    }
  }, [])
}

export default usePokemons
