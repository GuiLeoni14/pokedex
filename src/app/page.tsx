'use client'

import { PokemonCard } from '@/components/PokemonCard'
import usePokemons, { Pokemon, PokemonType } from '@/hooks/usePokemons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const { filterPokemonsByType, getAllPokemons, getAllPokemonsTypes } =
    usePokemons()

  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([])
  const [limit, setLimit] = useState<number>(20)

  async function handleFilterPokemonsByType(typeIndex: string) {
    const pokemons = await filterPokemonsByType(typeIndex)
    setPokemons(pokemons)
  }

  async function handleLoadMorePokemons() {
    setLimit((state) => state + 20)
  }

  useEffect(() => {
    getAllPokemons(limit).then((pokemons) => setPokemons(pokemons))
  }, [limit])

  useEffect(() => {
    getAllPokemonsTypes().then((types) => setPokemonTypes(types))
  }, [])

  return (
    <main>
      <section
        className="center center relative h-[706px] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/img/bg-home.svg')`,
        }}
      >
        <div className="container mx-auto flex flex-col items-center justify-center pt-10">
          <img src={`/img/pokemon.svg`} alt="pokemon" />
          <Link
            href="/"
            className="mx-auto mt-5 inline-flex gap-2 rounded-full bg-white p-2 font-bold text-red-600"
          >
            🎒 pokedex
          </Link>
          <h1 className="mt-2 text-center text-6xl font-bold text-white">
            Quem é esse pokemon?
          </h1>
          <p className="mt-5 text-center text-2xl text-white">
            Guia perfeito para quem quer caçar Pokémons ao redor do mundo
          </p>
          <img
            className="absolute -bottom-[350px] left-1/2 -translate-x-1/2"
            src={`/img/pokebola.png`}
            alt="pokemon"
          />
        </div>
      </section>
      <section className="bg-slate-100 pt-[240px]">
        <div className="container mx-auto grid h-full grid-cols-[250px_1fr] gap-5 bg-white">
          <aside className="sticky flex h-full flex-col gap-4 overflow-auto overflow-y-auto p-4">
            <span className="flex items-center gap-2 p-2 text-gray-500">
              <img src={`/img/pokebola-icon.png`} alt="" />
              {pokemons.length} pokemons
            </span>
            {pokemonTypes.map((type) => {
              return (
                <button
                  className="flex gap-2 rounded-md bg-transparent p-2 transition-all hover:bg-slate-200"
                  onClick={() => handleFilterPokemonsByType(type.id)}
                  key={type.name}
                >
                  <img src={`/img/types/${type.name}.svg`} alt={type.name} />
                  <span>{type.name}</span>
                </button>
              )
            })}
          </aside>
          <div>
            <div className="mt-5 grid grid-cols-4 gap-5 p-5">
              {pokemons.map((pokemon) => {
                return (
                  <Link href={`/${pokemon.id}`} key={pokemon.id}>
                    <PokemonCard
                      id={pokemon.id}
                      image={pokemon.image}
                      name={pokemon.name}
                      types={pokemon.types}
                    />
                  </Link>
                )
              })}
            </div>
            <button
              className="mx-auto mt-5 block rounded-md bg-blue-200 px-4 py-2 text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
              onClick={handleLoadMorePokemons}
            >
              Carregar mais
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
