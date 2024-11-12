'use client'
import usePokemons, { PokemonData } from '@/hooks/usePokemons'
import Link from 'next/link'
import { use, useEffect, useState } from 'react'

const typeColors: Record<string, string> = {
  fire: 'bg-orange-100 text-orange-700',
  water: 'bg-blue-100 text-blue-700',
  ground: 'bg-yellow-800 text-yellow-100',
  rock: 'bg-stone-100 text-stone-700',
}

export default function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [pokemon, setPokemon] = useState<PokemonData | null>(null)
  const [loading, setLoading] = useState(true)
  const { getPokemonById } = usePokemons()
  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  useEffect(() => {
    setLoading(true)
    getPokemonById(id)
      .then((data) => setPokemon(data))
      .finally(() => setLoading(false))
  }, [])

  const renderStatBar = (value: number) => {
    const percentage = (value / 255) * 100
    return (
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-red-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  if (loading) {
    return (
      <section className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-2xl font-bold text-gray-500">Carregado...</p>
      </section>
    )
  }

  if (!pokemon) {
    return <p>Nenhum Pokémon encontrado</p>
  }

  return (
    <section
      className="center relative h-[706px] bg-cover bg-no-repeat"
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
        <div className={`mt-5`}>
          <div
            className={`w-full max-w-3xl overflow-hidden rounded-lg bg-white bg-gradient-to-br shadow-xl`}
          >
            <div className="p-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full md:w-1/2">
                  <div
                    className={`relative aspect-square overflow-hidden rounded-lg ${pokemon.types[0]}`}
                  >
                    {pokemon.image && (
                      <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="h-full w-full object-contain p-4"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full space-y-4 md:w-1/2">
                  <div>
                    <div className="text-sm text-gray-500">#{pokemon.id}</div>
                    <h2 className="mb-2 text-2xl font-bold capitalize">
                      {pokemon.name}
                    </h2>
                    <div className="flex gap-2">
                      {pokemon.types.map((type) => (
                        <span
                          key={type}
                          className={`rounded-full px-3 py-1 text-sm font-medium ${typeColors[type] || 'bg-gray-100 text-gray-700'}`}
                        >
                          {capitalizeFirst(type)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4">
                    <div>
                      <div className="text-sm text-gray-500">Height</div>
                      <div className="font-medium">{pokemon.height}m</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Weight</div>
                      <div className="font-medium">{pokemon.weight}kg</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium">{pokemon.category}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">
                      Abilities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {pokemon.abilities.map((ability) => (
                        <span
                          key={ability}
                          className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700"
                        >
                          {capitalizeFirst(ability)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-gray-500">
                      Stats
                    </h3>
                    <div className="space-y-2">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.name} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize">
                              {stat.name.replace('-', ' ')}
                            </span>
                            <span className="font-medium">{stat.value}</span>
                          </div>
                          {renderStatBar(stat.value)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
