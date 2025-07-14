const pokemonsDiv = document.getElementById("pokemons");
import { getPokeColor, colors } from "./poke-colors.js";
console.log(getPokeColor('fire'))
const getPokemons = async () => {
	const detailsPromises = [];
	for (let i = 1; i < 101; i++) {
		detailsPromises.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
		);
	}
	
    const pokemonsDetails = await Promise.all(detailsPromises)
    console.log(pokemonsDetails);
    pokemonsDetails.forEach(RenderPokemon)
};

const getTypes = (pokemon) => {
    const type1 = pokemon.types[0].type.name
    const type2 = pokemon.types[1]?.type.name ?? "sem tipo"

    if(pokemon.types.length > 1) {
       return  `<span style="background-color: ${getPokeColor(type1)};" > ${type1} </span>  <span style="background-color: ${getPokeColor(type2)};"> ${type2} </span>`
    } 

    return `<span style="background-color: ${getPokeColor(type1)};">${type1}</span>`
}

async function RenderPokemon(pokemon) {
    const card = document.createElement('div')
    card.className = "card"

    const name = document.createElement('h2')
    name.textContent = pokemon.name

    const img = document.createElement('img')
    img.src = pokemon.sprites.front_default

    const types = document.createElement('p')
    types.innerHTML = getTypes(pokemon)
    card.append(name, img, types)
    pokemonsDiv.appendChild(card)
}

getPokemons();
