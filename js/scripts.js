'use strict'

window.addEventListener('load',()=>{

    const siguiente = document.getElementById('siguiente');
    const buscar = document.getElementById('buscar');
    const pokeContainer = document.getElementById('pokemon');
    buscar.addEventListener('keyup',()=>{
        let busqueda = buscar.value;
        cargarPokemones(busqueda)
    });
    siguiente.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');
        console.log(offset);

        offset += 10;
        console.log(offset);
        cargarPokemones();

    });

    let offset = 10;
    const cargarPokemones = async (busqueda='') =>{
        try{
            
            if(busqueda == ''){
                for (let pokemon = offset-10; pokemon < offset; pokemon++) {
                    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/?offset=${offset}`);
                    switch (respuesta.status) {
                        case 200:
                            const datos = await respuesta.json();
                            let types = [];
                            types.push(datos.types);
                            console.log(types);
                            let typesMap = types.map(element => element[0]);
                            console.log(typesMap);
                            let pokemonCard = document.createElement('div');
                            pokemonCard.classList = 'pokemon__card';
                            pokemonCard.innerHTML = `
                                    <div class="pokemon__info">
                                        <div class="pokemon__name">
                                            <h3>${datos.name}</h3>
                                        </div>
                                        <div class="pokemon__id"><span>#${datos.id}</span></div>
                                        <div class="pokemon__type">
                                            <ul>
                                                <li>Grass</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="pokemon__img"><img src="${datos.sprites.other.home.front_default}"> </div>

                            `

                            pokeContainer.appendChild(pokemonCard);
                            console.log(datos.sprites.other.home.front_default);

                            console.log(datos);
                            break;
                        case 404:
                            console.log("Error en la petición");
                            break;
                    }
                    console.log(respuesta);
                }
            }else{
                const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}/`);
                switch (respuesta.status) {
                    case 200:
                        const datos = await respuesta.json();
                        let pokemonCard = document.createElement('div');

                        pokemonCard.classList = 'pokemon__card';
                        pokemonCard.innerHTML = `
                            <div class="pokemon__id"><span>#${datos.id}</span></div>
                                    <div class="pokemon__img"><img src="${datos.sprites.other.dream_world.front_default}" alt=""></div>
                                    <div class="pokemon__info">
                                        <div class="pokemon__name">
                                            <h3>${datos.name}</h3>
                                        </div>
                                        <div class="pokemon__type">
                                            <ul>
                                                <li>Grass</li>
                                            </ul>
                                        </div>
                                    </div>

                            `

                        pokeContainer.appendChild(pokemonCard);



                        console.log(datos);
                        break;
                    case 404:
                        console.log("Error en la petición");
                        break;
                }
                console.log(respuesta);
                
            }
            
            
             

            

        }catch(error){
            console.log(error);
        }
    }

    

    cargarPokemones();

    // const typeSelect = document.querySelector('#types');
    // const pokeContainer = document.querySelector('#pokemon');
    // const search = document.querySelector('#search');
    // const pk = document.querySelector('#pokemon__card');
    // const load = document.querySelector('.load');

    // // for(let i =0; i <=10;i++){
    // //     var cl = pk.cloneNode(true);
    // //     pokeContainer.appendChild(cl);

    // // }

    // search.addEventListener('keyup',()=>{
    //     load.style.display = 'block';

    //     var pokeSearch = search.value;
    //     console.log(pokeSearch);
        
    //     getPokemons(pokeSearch)
    //     .then(response => response.json())
    //     .then(data =>{
    //         console.log(`Nombre del pokemon: ${data.name}`);
    //         renderPokemon(data);
    //     })

    // });



        
    // function getPokemons(name = 1){    
    //     return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    // }
    
    // function renderPokemon(data){
    //     const stats = {
    //         id: data.id,
    //         name: data.name,
    //         img: data.sprites.other.dream_world.front_default,
    //         type:[]
    //     }
    //     for(let i=0; i < data.types.length; i++){
    //         stats.type.push(data.types[i].type.name);
            
    //     }
    //     console.log(stats.type);
    //     if(stats.type[0] == "electric"){
    //         console.log(pk);
    //     }
        

        
    //     pokeContainer.innerHTML=
    //         `
    //         <div class="pokemon__card" id="pokemon__card">
    //             <div class="pokemon__number">
    //                 <span># ${stats.id}</span>
    //             </div>
    //             <div class="pokemon__img">
    //                 <img src="${stats.img}" alt="">
    //             </div>
    //             <div class="pokemon__info">
    //                 <h1>${stats.name}</h1>
    //                 <p>Type: <span>${stats.type}</span></p>
    //                 <div class="poke__stats">
    //                     <div class="stats">

    //                     </div>
    //                     <div class="stats">

    //                     </div>
    //                     <div class="stats">

    //                     </div>
    //                 </div>
    //             </div>

    //         </div>

            
    //         `
        
    // }




});
