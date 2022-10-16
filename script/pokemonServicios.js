class pokemonServicios {
    // ## Etiqueta que contiene pokemon items
    pokemon_list = '';
    // ## Etiqueta para pokemon card
    pokemon_card = '';

    constructor(pContenedor, pPokemonCard) {
        this.pokemon_list = pContenedor;
        this.pokemon_card = pPokemonCard;
    }

    /**
     * Establece contenido para pokemon card
     * @param {json} pPokemon Objeto json con pokemon data
     */
    setPokemonCard(pPokemon) {
        this.setCardImage(pPokemon.sprites.front_default);
        document.getElementById('pokecard_nombre').innerHTML = `#${pPokemon.id} ${pPokemon.name}`;
        // ## Crear propiedad peso
        this.createPokemonProperties('Peso', pPokemon.weight);
        this.setPokemonSprites(pPokemon.sprites);
        // ## Set propiedad tipos
        this.setPokemonTypes(pPokemon.types);
        // ## Set propiedad movimientos
        this.setPokemonMoves(pPokemon.moves);
    }

    /**
     * Agrega al dom data acerca de pokemons
     * @param {Array[json]} pPokemonList Arreglo de objetos
     */
    addPokemonList(pPokemonList) {
        let innerPokemon = '';

        // ## Preparar html items
        pPokemonList.map((item, index) => {
            innerPokemon += `
                <button class="pokeitem" attr-index="${index}">
                    <div class="pokeitem_back"></div>
                    <div class="pokeitem_content">
                        <div class="pokeitem_imagen">
                            <img src="${item.sprites.front_default}" alt="${item.name}">
                        </div>
                        <div class="pokeitem_id"># ${item.id}</div>
                        <div class="pokeitem_nombre">${item.name}</div>
                        <span class="button_icon-sm material-symbols-outlined">search</span>
                    </div>
                </button>
            `;
        });
        
        // ## Desplegar sobre documento
        this.pokemon_list.innerHTML = innerPokemon;

        // ## Establecer eventos click
        let pokemonItems = document.getElementsByClassName('pokeitem');
        Array.from(pokemonItems).map((e) => {

            // ## Definir CLICK
            e.addEventListener('click', () => {
                // ## pokecard definido modal.js
                this.pokemon_card.classList.add('show_pokecard');

                // ## Desplegar data en pokecard
                let i = e.getAttribute('attr-index');
                this.setPokemonCard(pPokemonList[i]);
            });
        });
    }

    /**
     * Establece la imagen principal para pokemon card
     * @param {string} pSprite Url de imagen
     */
    setCardImage(pSprite) {
        document.getElementById('pokecard_imagen').setAttribute('src', pSprite);;
    }

    /**
     * Crea html sprites para pokemon card
     * @param {Array[json]} pSprites Arreglo de objetos json
     */
    setPokemonSprites(pSprites) {
        let sprites = '';

        // ## Definir innerHtml text
        for (let key in pSprites) {
            if ((pSprites[key] !== null) && (typeof pSprites[key] !== 'object')) {
                sprites += `
                    <button class="button button-blank pokecard_sprite">
                        <img class="sprite" src="${pSprites[key]}" alt="">
                    </button>
                `;
            }
        }

        // ## Agregar a dom
        document.getElementById('pokecard_sprites').innerHTML = sprites;
        
        // ## Establecer eventos click
        let pokemonSprites = document.getElementsByClassName('sprite');
        Array.from(pokemonSprites).map((e) => {
            // ## Definir CLICK
            e.addEventListener('click', () => {
                // ## Desplegar imagen en pokecard_imagen
                let src = e.getAttribute('src');
                this.setCardImage(src);
            });
        });

    }

    /**
     * Crea bloque html pokecard_atributos para pokecard
     * @param {string} pName Nombre de propiedad
     * @param {string} pValue Valor de propiedad
     * Si en caso existe div.att-prop="pName" => solo reemplaza valor de propiedad SINO crea
     */
    createPokemonProperties(pName, pValue) {
        // ## Verificar existencia
        let prop = document.querySelector(`div[att-propertie='${pName}']`);
        if (prop !== null) {
            prop.getElementsByClassName('pokecard_atributos_descripcion')[0].innerHTML = pValue;
        } else {
            prop = `
                <div class="pokecard_atributos" att-propertie="${pName}">
                    <div class="pokecard_atributos_content">
                        <span class="pokecard_atributos_nombre">${pName}</span>
                        <span class="pokecard_atributos_descripcion">${pValue}</span>
                    </div>
                </div>`;
            document.getElementById('pokecard').insertAdjacentHTML('beforeend', prop);
        }
    }

    /**
     * Agrega "pokemon types" en pokecard
     * @param {[JSON]} pTypes Arreglo de objetos json
     */
    setPokemonTypes(pTypes) {
        let innTypes = '';
        pTypes.map((e) => {
            innTypes += `
                <p class="pokecard_lista_item">${e.type.name}</p>
            `;
        });

        document.getElementById('pokecard_types').innerHTML = innTypes;
    }

    /**
     * Agrega "pokemon moves" en pokecard
     * @param {[JSON]} pMoves Arreglo de objetos json
     */
    setPokemonMoves(pMoves) {
        let innMoves = '';
        let limit = 5;

        // ## Verificando el limite
        if (pMoves.length < 5) {
            limit = pMoves.length;
        }
        // ## Creando html
        for(let _i = 0; _i <= limit; _i++) {
            innMoves += `
                <p class="pokecard_lista_item">${pMoves[_i].move.name}</p>
            `;
        }
        // ## Inner html
        document.getElementById('pokecard_moves').innerHTML = innMoves;
    }
}