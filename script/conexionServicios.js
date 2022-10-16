class conexionServicios {
    // ## Establece el limite de items por pagina
    limit_page = 0;
    
    constructor(pLimitByPage) {
        this.limit_page = pLimitByPage;
    }

    /**
     * Consigue data en pokeapi utilizando paginacion
     * @param {number} pPageNumber Indica número de item donde inicia la paginacion
     * @returns arreglo JSON
     */
    async getPokemonByPage(pPageNumber) {
        try {
            // ## Determinar item inicial para pagina
            let npage = this.limit_page * pPageNumber;
            // ## Generar url
            let url = `https://pokeapi.co/api/v2/pokemon/?limit=${this.limit_page}&offset=${npage}`;
            // ## Realizar consulta
            let pokemon_data = await axios.get(url);
    
            // ## Retornar arreglo de resultados
            return pokemon_data.data.results;
        } catch(error) {
            console.log(error);
        }
    }
    /**
     * Consigue data en URL entregada
     * @param {string} xUrl ruta a relizar peticion get
     * @returns arreglo JSON
     */
    async getPokemonByUrl(pUrl) {
        try {
            let pokemon_data = await axios.get(pUrl);
            return pokemon_data.data;
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * Consigue data acerca de pokemon
     * @param {string} pName 
     * @returns json data
     */
    async getPokemonByName(pName) {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pName}`;
            let pokemon_data = await axios.get(url);
            // ## Retornar json de datos
            return pokemon_data.data;
        } catch(error) {
            console.log(error);
        }
    }
};