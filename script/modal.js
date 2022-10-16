// ## Pokecard
const pokecard = document.getElementById('pokecard');
// ## Boton close pokecard
const closeModal = document.getElementById('closePokecard');


// ## Cerrar modal pokecard
closeModal.addEventListener('click', () => {
    pokecard.classList.remove('show_pokecard');
});

