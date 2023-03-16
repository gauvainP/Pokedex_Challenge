import React, { useState, useEffect } from "react";
import { Row, Col } from 'antd';
import { AutoComplete } from 'antd';


const SearchBar = ({ pokemons, searchedPokemon, handleSearchPokemon }) => {





    return (
        <div className="SearchBar">
            <Row justify={'center'} align={'center'} >

                <AutoComplete
                    style={{
                        width: 400,

                    }}
                    size="large"

                    onChange={handleSearchPokemon}
                    placeholder="Charmander"
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    options={pokemons}
                    allowClear
                    value={searchedPokemon}
                />


            </Row>



        </div>
    )
}



export default SearchBar;