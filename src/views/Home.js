import React, { useState, useEffect } from "react";
import { Row, Col, Pagination, Layout } from 'antd';
import Pokedex from "./Pokedex";
import SearchBar from "../components/SearchBar";
const { Header, Footer, Content } = Layout;

const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    const [options, setOptions] = useState([]);
    const [searchedPokemon, setSearchedPokemon] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageValues, setPageValues] = useState({ minValue: 0, maxValue: 12 });




    const handleSearchPokemon = (value) => {

        console.log(value);
        let res = [];
        pokemons.forEach(pok => {
            pok.name.includes(value)
            res.push({
                value: pok.name,
            })

        });



        setSearchedPokemon(value);
        setOptions(res);
    };


    const handleChange = (value) => {
        let newPageValues = {
            minValue: (value - 1) * 12,
            maxValue: value * 12,
        }
        setPageValues(newPageValues)
    };


    function getPokemons() {

        fetch('https://beta.pokeapi.co/graphql/v1beta',
            {
                method: 'POST',
                headers: { "content-Type": "applicaton/json" },
                body: JSON.stringify({
                    query: ` 
              query samplePokeAPIquery {
                first_gen: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-i"}}}, order_by: {id: asc}) {
                  name
                  id
                  
                }
               
              }
              
      `
                })

            }
        ).then(res =>
            res.json()

        ).then(data => {
            let temp = [];
            console.log(data.data.first_gen)
            for (var i in data.data.first_gen) {
                temp.push({
                    id: data.data.first_gen[i].id,
                    name: data.data.first_gen[i].name,
                    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + data.data.first_gen[i].id + '.png'
                })


            }

            setPokemons(temp)
            return data;
        })
    }


    useEffect(() => {
        getPokemons();

    }, []);


    return (
        <div className="Home">

            <Row align={'center'}>

                <SearchBar pokemons={options} searchedPokemon={searchedPokemon} handleSearchPokemon={handleSearchPokemon} />
            </Row>



            <Pokedex pageValues={pageValues} searchedPokemon={searchedPokemon} style={{ padding: '20vh' }} pokemons={pokemons} />




                <Row gutter={[24, 24]} align={'center'} width={500}>

                    <Pagination
                        pageSize={12}
                        pageSizeOptions={[12, 24]}
                        defaultCurrent={1} total={151}
                        onChange={handleChange}
                        showSizeChanger={false}
                    />
                </Row>


   
        </div>
    )
}



export default Home;