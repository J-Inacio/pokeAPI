import { getPokeColor } from "./poke-colors.js";

const getTypes = (pokemon) => {
    const type1 = pokemon.types[0].type.name;
    const type2 = pokemon.types[1]?.type.name ?? "sem tipo";

    if (pokemon.types.length > 1) {
        return `<span style="background-color: ${getPokeColor(
            type1
        )};" > ${type1} </span>  <span style="background-color: ${getPokeColor(
            type2
        )};"> ${type2} </span>`;
    }

    return `<span style="background-color: ${getPokeColor(
        type1
    )};">${type1}</span>`;
};

const getAbilities = (pokemon) => {
	const abilities = pokemon.abilities
		.map((ability) => ability.ability.name)
		.join(", ");
	return abilities;
};

export {getTypes, getAbilities}