// Aquí estamos declarando una variable llamada "pokemons" que será una lista donde guardaremos información de los pokémon
let pokemons= [];
// La siguiente línea de código está buscando en el HTML un elemento que tiene el id "poke_container" y lo guarda en una variable llamada "poke_container".
const poke_container = document.getElementById("poke_container");
// Esta es una dirección (URL) a una página web donde podemos obtener información sobre los pokémon. Se guarda en una variable llamada "url".
const url = "https://pokeapi.co/api/v2/pokemon";
// Aquí estamos declarando otra variable llamada "pokemons_number" y le damos el valor de 200. Esto significa que queremos obtener información sobre los primeros 200 pokémon.
const pokemons_number = 200;
// Luego, estamos buscando en el HTML un elemento que tiene el id "search" y lo guardamos en una variable llamada "search".
const search = document.getElementById("search");
// También buscamos otro elemento en el HTML con el id "form" y lo guardamos en una variable llamada "form".
const form = document.getElementById("form");

// Ahora viene una función llamada "fetchPokemons". Una función es como un conjunto de instrucciones que podemos reutilizar más tarde. Esta función nos ayudará a obtener información sobre los pokémon y mostrarla en la página web.
const fetchPokemons = async ()=>{
     // Aquí estamos usando un "for loop" para repetir ciertas instrucciones varias veces. La "i" representa un número, y comenzamos en 1. Seguiremos repitiendo las instrucciones hasta llegar al número 200.
    for (let i = 1; i <=pokemons_number; i++){
        // En cada vuelta del "for loop", llamamos a otra función llamada "getAllPokemon" y le pasamos el número actual en "i". Esta función nos ayudará a obtener información sobre un pokémon específico.
        await getAllPokemon(i);
    }
    // Una vez que hemos obtenido información sobre todos los 200 pokémon, llamamos a otra función llamada "createPokemonCard" para mostrar los pokémon en la página web.
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));      
    

};
// La siguiente función se llama "removePokemon". Esta función nos ayudará a eliminar información de los pokémon que ya están mostrados en la página web.
const removePokemon = async (id) =>{
    // Aquí estamos buscando todos los elementos en la página web que tienen una clase llamada "pokemon" y los guardamos en una lista llamada "pokemonEls".
    const pokemonEls = document.getElementsByClassName("pokemon");
     // Creamos una lista vacía llamada "removablePokemons" donde guardaremos los pokémon que queremos eliminar.
    let removablePokemons=[];
    // Ahora usamos un "for loop" para recorrer todos los elementos en la lista "pokemonEls".
    for (let i =0; i<pokemonEls.length; i++){
        // En cada vuelta del "for loop", obtenemos el elemento actual en la lista "pokemonEls" y lo guardamos en una variable llamada "pokemonEl".
        const pokemonEl = pokemonEls[i];
         // Luego, añadimos el elemento a la lista "removablePokemons" para que podamos eliminarlo más tarde.
        removablePokemons =[...removablePokemons,pokemonEl];
    }
     // Finalmente, usamos otro "for loop" para recorrer la lista "removablePokemons" y eliminar los pokémon de la página web uno por uno.
    removablePokemons.forEach((remPoke)=>remPoke.remove());
};
// La siguiente función se llama "getPokemon" y nos ayudará a filtrar y mostrar información sobre un pokémon específico cuando el usuario lo busca.

const getPokemon = async(id)=>{
    // Usamos una lista llamada "searchPokemons" para guardar los pokémon que coinciden con el nombre que el usuario busca.
    const searchPokemons=pokemons.filter((poke)=>poke.name === id);
     // Luego, llamamos a la función "removePokemon" para eliminar los pokémon que ya están mostrados en la página web.
    removePokemon();
    // Finalmente, usamos otro "for loop" para recorrer la lista "searchPokemons" y llamamos a la función "createPokemonCard" para mostrar los pokémon que coinciden con el nombre buscado.
    searchPokemons.forEach((pokemon)=>createPokemonCard(pokemon));

};
// La siguiente función se llama "getAllPokemon" y nos ayudará a obtener información sobre un pokémon específico según su número.
const getAllPokemon=async(id)=>{
    // Usamos la función "fetch" para obtener información desde la dirección URL almacenada en la variable "url" junto con el número del pokémon que queremos obtener.
    const res = await fetch(`${url}/${id}`);
    // Luego, convertimos la información obtenida a un formato que podamos leer más fácilmente y lo guardamos en una variable llamada "pokemon".
    const pokemon = await res.json();
      // Finalmente, añadimos el pokémon a la lista "pokemons" para que podamos mostrarlo más tarde en la página web.
    pokemons = [...pokemons, pokemon];
};
// Llamamos a la función "fetchPokemons" para comenzar a mostrar información sobre los pokémon en la página web.
fetchPokemons();

// La siguiente función se llama "createPokemonCard" y nos ayudará a mostrar un pokémon en el formato de una tarjeta en la página web.
function createPokemonCard(pokemon){
     // ... Código para crear la tarjeta de un pokémon ...
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");
    const poke_types=pokemon.types.map((el) => el.type.name).slice(0,1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_stat= pokemon.stats.map((el)=> el.stat.name);
    const stats = poke_stat.slice(0, 3);
    const base_value = pokemon.stats.map((el)=> el.base_stat);
    const base_stat=base_value.slice(0,3);
    const stat = stats.map((stat)=>{
        return `<li class="names">${stat}</li>`;
    }).join("");
    const base = base_stat.map((base)=>{
        return `<li class="base">${base}</li>`
    }).join("");
    const pokeInnerHTML =`<div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}"/>
    </div>
    <div class="info">
    <span class="number">#${pokemon.id.toString().padStart(3,"0")}</span>
    <h3 class="name">${name}</h3>
    <small class="type"><span>${poke_types}</span></small>
    </div>
    <div class="stats">
    <h2>Stats</h2>
    <div class="flex">
    <ul>${stat}</ul>
    <ul>${base}</ul>
    </div>
    </div>`;
    pokemonEl.innerHTML=pokeInnerHTML;
    poke_container.appendChild(pokemonEl);


}
// La siguiente parte del código agrega un evento al formulario en la página web. Un formulario es como un cuadro donde puedes escribir algo y enviarlo. Cuando enviamos el formulario, ocurre el evento "submit".
form.addEventListener("submit",(e)=>{
     // La siguiente línea evita que la página se recargue cuando enviamos el formulario.
    e.preventDefault();
    // Aquí estamos obteniendo el texto que el usuario ha escrito en el formulario y lo guardamos en una variable llamada "searchTerm".
    //const searchItem=search.nodeValue;
    const searchTerm = search.value;

    // Luego, comprobamos si "searchTerm" no está vacío. Si el usuario ha escrito algo en el formulario, llamamos a la función "getPokemon" y le pasamos el texto que el usuario escribió. Luego, limpiamos el formulario para que esté listo para otra búsqueda.
    if(searchTerm){
        getPokemon(searchTerm);
        search.value="";

    }else if(searchTerm ===""){
         // Si "searchTerm" está vacío, eso significa que el usuario no ha escrito nada en el formulario. En este caso, limpiamos la lista de pokémon y mostramos todos los pokémon nuevo
        pokemons=[];
        removePokemon();
        fetchPokemons();
    }
});
