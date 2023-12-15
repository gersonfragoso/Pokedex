
const pokemonListAll = document.getElementById("listarPokemonsGeral")
const buttonLoadMore = document.getElementById("loadMore")
const limitPokemons = 151;
const limit = 5;
let offset = 0;

function convertpokemon(pokemon){
   return `
    <li class="pokemon ${pokemon.type}">
                <span class="number">#00${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="type">
                        ${pokemon.types.map((type) => `<li class="element ${type}">${type}</li>`).join("")}
                    </ol>
                    <img src="${pokemon.img}" 
                    alt="${pokemon.name}">
                </div>

            </li>
        ` 

}

function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset,limit).then((pokemons = [])=>{

    pokemonListAll.innerHTML += pokemons.map(convertpokemon).join("");



    })

}
loadPokemons()

buttonLoadMore.addEventListener("click",()=>{
    offset +=limit
    const quantRecordNextPage = offset+limit

    if(quantRecordNextPage >= limitPokemons){
        const newLimit = limitPokemons - offset;
        loadPokemons(offset,newLimit)
        buttonLoadMore.parentElement.removeChild(buttonLoadMore)
    }else{
        loadPokemons(offset,limit)
    }
})