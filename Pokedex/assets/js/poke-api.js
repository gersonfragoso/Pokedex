const pokeApi = {}
function convertApiPokemonModel(pokemonModelDetail){
    const pokemon = new Pokemon();
    pokemon.name = pokemonModelDetail.name;
    pokemon.number = pokemonModelDetail.id;
    const types = pokemonModelDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
   
    pokemon.img = pokemonModelDetail.sprites.other.dream_world.front_default;
    return pokemon;
}




pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertApiPokemonModel)

}



pokeApi.getPokemons = (offset = 0, limit = 5)=>{
    
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        // Nesse primeiro response vem apenas o nome e uma url para mais informações do pokemon
        .then((responseAPI)=> responseAPI.json())
        // Convertendo o json retornado para poder trabalhar com os valores
        .then((jsonBody)=> jsonBody.results)
        //Chamar o metodo criado acima que faz a requisição na url da primeira chamada
        // assim obtemos todas as infomações do pokemon
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
        //Promise para poder esperar que todas as requisições de cada pokemon sejam feitas.
        .then((detailRequest)=> Promise.all(detailRequest))
        .then((pokemonDetail) => pokemonDetail)  
}