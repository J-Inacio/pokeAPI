import { getPokeColor } from "./poke-colors.js";
import { getAbilities, getTypes } from "./utils.js";

const pokemonsDiv = document.getElementById("pokemons");

async function RenderPokemonCard(pokemon) {
	const card = document.createElement("div");
	card.className = "card";
	card.id = pokemon.id;

	const name = document.createElement("h2");
	name.textContent = pokemon.name;

	const img = document.createElement("img");
	img.src = pokemon.sprites.front_default;

	const types = document.createElement("p");
	types.className = "types";
	types.innerHTML = getTypes(pokemon);

	const detailBtn = document.createElement("button");
	detailBtn.className = "btn";
	detailBtn.type = "button";
	detailBtn.innerText = "Show details";

	detailBtn.addEventListener("click", () => {
		const existingCard = document.getElementById(`detail-${pokemon.id}`);
		if (existingCard) {
			return;
		}
		const details = showDetails(pokemon);
		pokemonsDiv.appendChild(details);

		setTimeout(() => {
			document.addEventListener("click", function handleClickFora(e) {
				if (!details.contains(e.target) && e.target !== detailBtn) {
					details.style.animation = "displayOffDetails 0.3s ease-in forwards";
					setTimeout(() => {
						details.remove();
					}, 300);

					document.removeEventListener("click", handleClickFora);
				}
			});
		}, 0);
	});

	card.append(name, img, types, detailBtn);
	pokemonsDiv.appendChild(card);
}

const showDetails = (pokemon) => {
	const detailsCard = document.createElement("div");
	detailsCard.className = "detailsCard";
	detailsCard.id = `detail-${pokemon.id}`;
	detailsCard.style.backgroundColor = getPokeColor(pokemon.types[0].type.name);
	const pokemonTitle = document.createElement("h2");
	pokemonTitle.innerText = pokemon.name;

	const detailTypes = document.createElement("p");
	detailTypes.innerHTML = getTypes(pokemon);
	detailTypes.className = "types";

	const pokeID = document.createElement("p");
	pokeID.innerText = "#" + pokemon.id;

	const pokeImg = document.createElement("img");
	pokeImg.src = pokemon.sprites.front_default;

	const borderDetails = document.createElement("div");
	borderDetails.className = "borderDetails";

	const detailSection = document.createElement("section");
	detailSection.className = "detailSection";

	const pokeUl = document.createElement("ul");

	const pokemonSpecies = document.createElement("li");
	pokemonSpecies.className = "pokemonAtribute";
	pokemonSpecies.innerText = "Species";

	const pokemonSpeciesValue = document.createElement("li");
	pokemonSpeciesValue.innerText = pokemon.species.name;

	const pokeHeight = document.createElement("li");
	pokeHeight.className = "pokemonAtribute";
	pokeHeight.innerText = "Height";

	const pokeHeightValue = document.createElement("li");
	pokeHeightValue.innerText = pokemon.height / 10 + " m";
	pokeHeightValue.className = "atributeValue";

	const pokeWeight = document.createElement("li");
	pokeWeight.className = "pokemonAtribute";
	pokeWeight.innerText = "Weight";

	const pokeWeightValue = document.createElement("li");
	pokeWeightValue.innerText = pokemon.weight / 10 + " kg";
	pokeWeightValue.className = "atributeValue";

	const pokeAbilities = document.createElement("li");
	pokeAbilities.className = "pokemonAtribute";
	pokeAbilities.innerText = "Abilities";

	const pokeAbilitiesValue = document.createElement("li");
	pokeAbilitiesValue.innerText = getAbilities(pokemon);

	const baseStatsTitle = document.createElement("p");
	baseStatsTitle.innerText = "Base stats";

	const statusContainer = document.createElement("div");
	statusContainer.className = "statusContainer";

	const totalStats = pokemon.stats.reduce((previousValue, currentValue) => {
		return previousValue + currentValue.base_stat;
	}, 0);

	const totalHtmlLi = document.createElement("li");
	totalHtmlLi.className = "statusItem";

	const labelTotalStats = document.createElement("span");
	labelTotalStats.innerText = "Total";
	labelTotalStats.className = "pokemonAtribute";

	const totalStatNum = document.createElement("span");
	totalStatNum.innerText = totalStats;
	totalStatNum.className = "statNumber";

	const totalBarContainer = document.createElement("div");
	totalBarContainer.className = "statBar";

	const TotalinternBar = document.createElement("div");
	TotalinternBar.className = "internStatBar";
	TotalinternBar.style.width = `${totalStats / 6}%`;
	if (totalStats / 6 <= 33) {
		TotalinternBar.style.backgroundColor = "#F95587";
	} else if (totalStats / 6 <= 66) {
		TotalinternBar.style.backgroundColor = "#F7D02C";
	}
	totalBarContainer.appendChild(TotalinternBar);
	totalHtmlLi.append(labelTotalStats, totalStatNum, totalBarContainer);

	pokemon.stats.forEach((stat) => {
		const li = document.createElement("li");
		li.className = "statusItem";

		const label = document.createElement("span");
		label.innerText = stat.stat.name;
		label.className = "pokemonAtribute";

		const statNum = document.createElement("span");
		statNum.innerText = stat.base_stat;
		statNum.className = "statNumber";

		const barContainer = document.createElement("div");
		barContainer.className = "statBar";

		const internBar = document.createElement("div");
		internBar.className = "internStatBar";
		internBar.style.width = `${stat.base_stat}%`;
		if (stat.base_stat <= 33) {
			internBar.style.backgroundColor = "#F95587";
		} else if (stat.base_stat <= 66) {
			internBar.style.backgroundColor = "#F7D02C";
		}

		barContainer.appendChild(internBar);
		li.append(label, statNum, barContainer);
		statusContainer.appendChild(li);
	});

	statusContainer.appendChild(totalHtmlLi);

	pokeUl.append(
		pokemonSpecies,
		pokemonSpeciesValue,
		pokeHeight,
		pokeHeightValue,
		pokeWeight,
		pokeWeightValue,
		pokeAbilities,
		pokeAbilitiesValue,
		baseStatsTitle,
		statusContainer
	);

	detailSection.appendChild(pokeUl);

	borderDetails.appendChild(detailSection);

	detailsCard.append(pokemonTitle, detailTypes, pokeID, pokeImg, borderDetails);

	return detailsCard;
};

const createComponent = ({tagName, id = null, type = "button",  className = "btn", text = "Button"}) => {
    const component = document.createElement(tagName)
    component.type = type
    component.className = className
    component.id = id
    component.innerText = text

    return component
}

export {RenderPokemonCard, showDetails, createComponent}