import { usePokemonInfoByName } from '../../../api/hooks/usePokemonInfoByName';

const pokemonName = 'pikachu';

export function Start() {
  const { data, isLoading } = usePokemonInfoByName(pokemonName);

  return (
    <div>
      {!isLoading ? <img alt={pokemonName} src={data?.sprites.front_default} /> : 'Loading'}
    </div>
  );
}
