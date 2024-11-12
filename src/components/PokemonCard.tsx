interface PokemonCardProps {
  id: string
  name: string
  image: string
  types: string[]
}

export function PokemonCard({ id, name, image, types }: PokemonCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl p-5 ${types[0]} cursor-pointer pt-32 transition-all hover:z-20 hover:scale-105`}
    >
      <div className="absolute -top-20 flex h-[200px] items-center justify-center">
        <img className="h-[200px] w-auto" src={image} alt={name} />
      </div>
      <div className="flex flex-col">
        <span className="text-base text-gray-400">
          {'#'}
          {id}
        </span>
        <div className="flex items-center justify-between">
          <strong className="text-xl text-white">{name}</strong>
          <div className="flex items-center">
            {types.map((type) => (
              <img src={`/img/types/${type}.svg`} alt={type} key={type} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
