import { PokemonGrid, PokemonsResponse, SimplePokemon } from '../../../pokemons/index';


export const metadata = {
 title: '151 pokemons',
 description: '151 pokemons',
};

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const response: PokemonsResponse = await data.json();

  const pokemons = response.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  // throw new Error('Hubo un error inesperado');
  return pokemons;
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150);
  return (
    <div className="flex flex-col">
    <span className="text-5xl my-2">Listado de Pokemons <small>Estático</small></span>
    <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
