const fetchPokemons = async (offset = 1, limit = 10) => {
    const detailsPromises = [];
	for (let i = offset; i < offset + limit; i++) {
		detailsPromises.push(
			fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
		);
	}

    const pokemonsArr = await Promise.all(detailsPromises);
    return pokemonsArr
}


export {fetchPokemons}