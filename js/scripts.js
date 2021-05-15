'use strict'

window.addEventListener('load',()=>{
    const typeSelect = document.querySelector('#types');
    const pokeContainer = document.querySelector('#pokemon');
    const search = document.querySelector('#search');
    const pk = document.querySelector('#pokemon__card');
    const load = document.querySelector('.load');

    // for(let i =0; i <=10;i++){
    //     var cl = pk.cloneNode(true);
    //     pokeContainer.appendChild(cl);

    // }

    search.addEventListener('keyup',()=>{
        load.style.display = 'block';

        var pokeSearch = search.value;
        console.log(pokeSearch);
        
        getPokemons(pokeSearch)
        .then(response => response.json())
        .then(data =>{
            console.log(`Nombre del pokemon: ${data.name}`);
            renderPokemon(data);
        })

    });



        
    function getPokemons(name = 1){    
        return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    }
    
    function renderPokemon(data){
        const stats = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.dream_world.front_default,
            type:[]
        }
        for(let i=0; i < data.types.length; i++){
            stats.type.push(data.types[i].type.name);
            
        }
        console.log(stats.type);
        if(stats.type[0] == "electric"){
            console.log(pk);
        }
        

        
        pokeContainer.innerHTML=
            `
            <div class="pokemon__card" id="pokemon__card">
                <div class="pokemon__number">
                    <span># ${stats.id}</span>
                </div>
                <div class="pokemon__img">
                    <img src="${stats.img}" alt="">
                </div>
                <div class="pokemon__info">
                    <h1>${stats.name}</h1>
                    <p>Type: <span>${stats.type}</span></p>
                    <div class="poke__stats">
                        <div class="stats">

                        </div>
                        <div class="stats">

                        </div>
                        <div class="stats">

                        </div>
                    </div>
                </div>

            </div>

            
            `
        
    }


});
