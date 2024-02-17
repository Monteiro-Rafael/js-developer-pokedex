const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} bkgimg" id="open-modal" onclick="abrirModal('${pokemon.hp}'
                                                                                     , ${pokemon.attack}
                                                                                     , ${pokemon.defense}
                                                                                     , ${pokemon.spAtk}
                                                                                     , ${pokemon.spDef}
                                                                                     , ${pokemon.speed}
                                                                                     , '${pokemon.type}'
                                                                                     , '${pokemon.name}'
                                                                                     , ${pokemon.height}
                                                                                     , ${pokemon.weight}
                                                                                     , '${pokemon.photo}')">
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

function abrirModal(pokehp
                  , pokeattack
                  , pokedefense
                  , pokeSpAtk
                  , pokeSpDef
                  , pokespeed
                  , pokeType
                  , pokeName
                  , pokeHeight
                  , pokeWeight
                  , pokePhoto){

    const adjustedHeight = (pokeHeight / 10).toFixed(2);
    const adjustedWeight = (pokeWeight / 10).toFixed(2);

    const total = (parseInt(pokehp) + parseInt(pokeattack) + parseInt(pokedefense) + parseInt(pokeSpAtk) + parseInt(pokeSpDef) + parseInt(pokespeed))

    const newHtml = `<div id="vis-modal" class="modal" >
    <div class="conteudo-modal ${pokeType}" style="background-image: url('${pokePhoto}'); background-repeat: no-repeat; margin: 3em; background-size: 12em; background-position: calc(100% - 15px) center;">
        <div class="cabecalho-modal">
            <h1>Specie ${pokeName}</h1>
            <span class="cabecalho-modal-fechar" onclick="fecharModal()">X</span>
        </div><div class="corpo-modal">
                    <h3>Base Stats</h3>
                    <ul>
                        <li>Hp = ${pokehp}</li>
                        <li>Attack = ${pokeattack}</li>
                        <li>Defense = ${pokedefense}</li>
                        <li>Sp. Attack = ${pokeSpAtk}</li>
                        <li>Sp. Defense = ${pokeSpDef}</li>
                        <li>Speed = ${pokespeed}</li>
                        <li>Total = ${total}</li>
                        <li>Height = ${adjustedHeight}m </li>
                        <li>Weight = ${adjustedWeight}kg</li>
                    </ul>
        </div>        
    </div>
</div>
    `

    bodyContent.innerHTML+= newHtml

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