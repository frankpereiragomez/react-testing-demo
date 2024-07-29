const apiUrl = import.meta.env.VITE_API_URL;

const getPokemons = async () => {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await response.json();

  const { results } = data;

  const promisesResult = results.map((pokemon) => {
    return fetch(pokemon.url).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    });
  });

  const pokemonsData = await Promise.all(promisesResult);

  return pokemonsData;
};

export default getPokemons;
