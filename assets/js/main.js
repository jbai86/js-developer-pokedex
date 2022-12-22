const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
            <!-- Modal -->
            <div class="modal" id="exampleModal${pokemon.number}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content pokemon ${pokemon.type}">
                        <span class="name">${pokemon.name}</span>
                            <div class="detail">
                                <ol class="types">
                                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                                </ol>
                                <span class="number">#${pokemon.number}</span>
                            </div>
                                <ol class="types">
                                    <li class="pokemon ${pokemon.type}">
                                        <img class="text-center" src="${pokemon.photo}"
                                                    alt="${pokemon.name}">
                                    </li>
                                </ol>
                                <div class="w-100 rounded basestat">
                                   <div class="col-5 stats">
                                        <ul>
                                            ${pokemon.stats.map((stat) => `<li class="type">${stat}</li>`).join('')}
                                        </ul>  
                                   </div>
                                   <div class="col-2 statsnum">
                                        <ul>
                                        ${pokemon.baseStats.map((baseStat) => `<li class="type">${baseStat}</li>`).join('')}
                                        </ul>  
                                   </div>
                                   <div class="col-5">
                                        <ul>
                                        ${pokemon.baseStats.map((baseStat) => `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: ${baseStat}%" aria-valuenow="${baseStat}" aria-valuemin="0" aria-valuemax="160"></div>
</div>`).join('')}
                                        </ul>  
                                   </div>
                                </div>
                         </div> 
                </div>
            </div>
            <div class="d-grid gap-2 d-md-block">
                <button type="button" class="btn btn-outline-dark btn-sm rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal${pokemon.number}">
                stats
                </button>
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})