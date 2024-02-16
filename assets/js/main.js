const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} bkgimg" id="open-modal" onclick="abrirModal(${pokemon.hp},${pokemon.attack}, '${pokemon.type}', '${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail " >
                <ol class="types" >
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>                

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}" >
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

function abrirModal(pokeHP, pokeAttack, pokeType, pokeName){

    const newHtml = `<div id="vis-modal" class="modal">
    <div class="conteudo-modal">
        <div class="cabecalho-modal">
            <h1>${pokeName}</h1>
            <span class="cabecalho-modal-fechar" onclick="fecharModal()">X</span>
        </div>
        <div class="corpo-modal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
    </div>
</div>
    `

    bodyContent.innerHTML+= newHtml

    console.log(pokeHP)
    console.log(pokeAttack)
    console.log(pokeType)
    console.log(pokeName)
    // console.log("HP = " + pokemon.hp)
    // console.log("Attack = " + pokemon.attack)
    

}

function fecharModal(){
    var modal = document.getElementById("vis-modal")
    if (modal) {
        modal.remove();
    }
    
}