import {fetchPokemons } from "./api.js";
import { createComponent, RenderPokemonCard } from "./components.js";

const getPokemons = async () => {
	const pokemonsList = await fetchPokemons()
	pokemonsList.forEach(RenderPokemonCard);

	const showMoreBtn = createComponent({tagName: "Button", id:"showMoreBtn", text: "Show More", className: "btn", type: "button"})

	showMoreBtn.addEventListener("click", async () => {
		const newPokemons = await fetchPokemons((pokemonsList.length + 1), 10)
		newPokemons.forEach(RenderPokemonCard);
	});

	document.body.appendChild(showMoreBtn);
};

getPokemons();
