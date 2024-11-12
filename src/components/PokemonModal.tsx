import { PokemonData } from '@/hooks/usePokemons'
import React from 'react'

const typeColors: Record<string, string> = {
  fire: 'bg-orange-100 text-orange-700',
  water: 'bg-blue-100 text-blue-700',
  ground: 'bg-yellow-800 text-yellow-100',
  rock: 'bg-stone-100 text-stone-700',
}

export function PokemonModal({
  id,
  name,
  height,
  weight,
  types,
  abilities,
  stats,
  image,
  category,
}: PokemonData) {
  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1)

  const renderStatBar = (value: number) => {
    const percentage = (value / 255) * 100 // 255 is max stat value
    return (
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-red-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 shadow-xl">
        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Left column with image */}
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-orange-200">
                {image && (
                  <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain p-4"
                  />
                )}
              </div>
            </div>

            {/* Right column with details */}
            <div className="w-full space-y-4 md:w-1/2">
              {/* Header */}
              <div>
                <div className="text-sm text-gray-500">#{id}</div>
                <h2 className="mb-2 text-2xl font-bold capitalize">{name}</h2>
                <div className="flex gap-2">
                  {types.map((type) => (
                    <span
                      key={type}
                      className={`rounded-full px-3 py-1 text-sm font-medium ${typeColors[type] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {capitalizeFirst(type)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4 py-4">
                <div>
                  <div className="text-sm text-gray-500">Height</div>
                  <div className="font-medium">{height}m</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Weight</div>
                  <div className="font-medium">{weight}kg</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{category}</div>
                </div>
              </div>

              {/* Abilities */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Abilities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {abilities.map((ability) => (
                    <span
                      key={ability}
                      className="rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {capitalizeFirst(ability)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Stats
                </h3>
                <div className="space-y-2">
                  {stats.map((stat) => (
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

              {/* Weaknesses */}
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">
                  Weaknesses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Water', 'Ground', 'Rock'].map((weakness) => (
                    <span
                      key={weakness}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
