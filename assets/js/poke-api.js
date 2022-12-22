
const pokeApi = {}
const urlPokemon = "https://pokeapi.co/api/v2/pokemon/1/"


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const baseStats = pokeDetail.stats.map((statSlot) => statSlot.base_stat)
    const stats = pokeDetail.stats.map((statSlot) => statSlot.stat.name)
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const [stat] = stats
    const baseStat = baseStats

    pokemon.types = types
    pokemon.type = type
    pokemon.stats = stats
    pokemon.stat = stat
    pokemon.baseStats = baseStats

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
