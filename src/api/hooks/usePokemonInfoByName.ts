import { useCallback } from "react";

import { useRequest } from "./utils/useRequest";
import { FetchHelper } from "../helpers/FetchHelper";

export function usePokemonInfoByName(pokemonName: string) {
  const request = useCallback(async () => {
    if (!pokemonName) {
      throw new Error("No pokemon name provided");
    }

    const response = await FetchHelper.get<{
      sprites: { front_default: string },
    }>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    return response.data;
  }, [pokemonName]);

  return useRequest(request);
}
