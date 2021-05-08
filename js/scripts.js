'use strict'

window.addEventListener('load',()=>{

    const typeSelect = document.querySelector('#types');
    const pokeImg = document.querySelector('.pokemon__card');
    const divPoke = document.querySelector('#pokemon');
    const typesSelect = document.querySelector('#types');
    const search = document.querySelector('#search');

    typesSelect.addEventListener('click',()=>{
        var valor =typeSelect.value;
        console.log(valor);
    });
    search.addEventListener('keyup',()=>{
        var val = search.value;
        console.log(val);
        getPokemon(val);
    });

    getPokemonType()
        .then(results => results.json())
        .then(types =>{
            pokeType(types.results);
        });

    function getPokemonType(type){
        return fetch(`https://pokeapi.co/api/v2/type`);
    }


    function getPokemon(name){
        const res = fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response=>response.json())
            .then(data=>{
                console.log(data);
                const poke = {
                    id: data.id,
                    img: data.sprites.other.dream_world.front_default,
                    name: data.name,
                    type: [],
                    stats: []

                }
                for (let i = 0; i < data.types.length; i++) {
                    poke.type.push(data.types[i].type.name);
                }
                for(let j = 0; j < data.stats.length; j++){
                        poke.stats.push(data.stats[j]);
                    
                }
                
                console.log(poke);

                divPoke.innerHTML =
                        `
                    <div class="pokemon__card" >
                        <div class="pokemon__img">
                            <img src='${poke.img}' alt=""></div>
                            <div class="pokemon__info">
                                <p>#${poke.id} </p>
                                <h1>${poke.name}</h1>
                                <p>Type: <span>${poke.type}</span></p>
                            </div>
                    </div>
                
                
                `;
            });
        
    }



    function pokeType(types){
        types.map(type =>{
            var opt = document.createElement('option');
            opt.innerHTML = type.name;
            typeSelect.appendChild(opt);

        })
    }
    
   

});
