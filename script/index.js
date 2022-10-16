// ## Numero de paginacion actual
let current_page = 0;

// ## Elementos de busqueda y depliegue
const pokemon_list = document.getElementById('pokemon_content');
const pokemon_card = document.getElementById('pokecard');
const pokemon_search_box = document.getElementById('input_search');
const pokemon_search_button = document.getElementById('button_search');

// ## Definir clases
const conServicios = new conexionServicios(12);
const pokServicios = new pokemonServicios(pokemon_list, pokemon_card);



/**
 * Obtiene lista de pokemon con full data por pagina entregada
 * @param {number} pPage pagina a consultar en api
 */
const conseguirPokemonPorPagina = async(pPage) => {

    // ## Conseguir lista de pagina
    let arrList = await conServicios.getPokemonByPage(pPage);
    
    // ## Conseguir full data para lista
    let arrDataList = await arrList.map((e) => {
        e = conServicios.getPokemonByUrl(e.url);
        return e;
    });
    
    // ## Resolver
    let pokemon = await Promise.all(arrDataList);

    // Desplegar
    pokServicios.addPokemonList(pokemon);
}
/**
 * Obtiene json con data de nombre de pokemon
 */
const conseguirPokemonPorNombre = async() => {
    try {
        let pokemon = await conServicios.getPokemonByName(pokemon_search_box.value.toLowerCase());
        // Desplegar
        pokServicios.addPokemonList([pokemon]);
        // Limpiar
        pokemon_search_box.value = '';
    } catch (error) {
        alert('No existe :(');
    }
    
}

// ESTABLECER FUNCIONALIDADES DE BUSQUEDA Y RESCATE
/*
    document.getElementById('button_previous_page').addEventListener('click', () => {
        // ## Determinar Siguiente pagina
        current_page--;
        if (current_page > -1) {
            // ## Conseguir y desplegar siguiente pagina
            conseguirPokemonPorPagina(current_page);
        } else {
            current_page = 0;
        }
    });
    document.getElementById('button_next_page').addEventListener('click', () => {
        // ## Determinar Siguiente pagina
        current_page++;
        // ## Conseguir y desplegar siguiente pagina
        conseguirPokemonPorPagina(current_page);
    });
*/

// ESTABLECER FUNCIONALIDADES DE BUSQUEDA Y RESCATE
// ## Botones anterior y siguiente
let btnprevious = document.getElementsByClassName('button_previous_page');
Array.from(btnprevious).forEach(element => {
    element.addEventListener('click', () => {
        current_page--;
        if (current_page > -1) {
            // ## Conseguir y desplegar siguiente pagina
            conseguirPokemonPorPagina(current_page);
        } else {
            current_page = 0;
        }
    });
});
let btnnext = document.getElementsByClassName('button_next_page');
Array.from(btnnext).forEach(element => {
    element.addEventListener('click', () => {
        // ## Determinar Siguiente pagina
        current_page++;
        // ## Conseguir y desplegar siguiente pagina
        conseguirPokemonPorPagina(current_page);
    });
});
// ## Input / boton search
pokemon_search_box.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        conseguirPokemonPorNombre();
    }
})
pokemon_search_button.addEventListener('click', conseguirPokemonPorNombre);



// ## Conseguir lista de pokemon al iniciar aplicacion
conseguirPokemonPorPagina(current_page);

