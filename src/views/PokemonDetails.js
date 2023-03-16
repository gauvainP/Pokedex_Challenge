import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tag, TabPane } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { useParams } from "react-router-dom";
import { SmileOutlined, ExpandAltOutlined } from "@ant-design/icons";
const reusableRowStyle = {

    width: '100%',

    height: '32px',

}



const PokemonDetails = () => {

    const [pokemon, setPokemon] = useState({ sprite: '', abilities: [], stats: [] })
    const [keyTab, setKeyTab] = useState(1)

    const params = useParams();
    const pokemon_id = params.id.split(':')[1];

    function getPokemonData() {

        fetch('https://beta.pokeapi.co/graphql/v1beta',
            {
                method: 'POST',
                headers: { "content-Type": "applicaton/json" },
                body: JSON.stringify({
                    query: ` 
                    query MyQuery($id: Int = ${pokemon_id}) {
                        pokemon_v2_pokemon_aggregate(where: {id: {_eq: ${pokemon_id}}, pokemon_v2_pokemonabilities: {pokemon_id: {_eq: ${pokemon_id}}}}) {
                            nodes {
                              height
                              name
                              weight
                              pokemon_v2_pokemontypes {
                                pokemon_v2_type {
                                  name
                                }
                              }
                              pokemon_v2_pokemonabilities {
                                pokemon_v2_ability {
                                  name
                                }
                              }
                              pokemon_v2_pokemonstats_aggregate {
                                nodes {
                                  base_stat
                                }
                              }
                            }
                          }
                        }
                        
              
      `
                })

            }
        ).then(res =>
            res.json()

        ).then(data => {
            console.log(data.data)
            let temp = {
                weight: data.data.pokemon_v2_pokemon_aggregate.nodes[0].weight,
                height: data.data.pokemon_v2_pokemon_aggregate.nodes[0].height,
                name: data.data.pokemon_v2_pokemon_aggregate.nodes[0].name,
                type: data.data.pokemon_v2_pokemon_aggregate.nodes[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name,
                sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon_id,
                abilities: data.data.pokemon_v2_pokemon_aggregate.nodes[0].pokemon_v2_pokemonabilities,
                stats: data.data.pokemon_v2_pokemon_aggregate.nodes[0].pokemon_v2_pokemonstats_aggregate.nodes,
            };

            console.log(temp)

            setPokemon(temp)

        })
    }



    useEffect(() => {

        getPokemonData();

    }, []);



    const onChange = (key) => {

        setKeyTab(key)
    };

    const StatisticsPage = (props) => {





        return (



            <Row className="ProfileBox" align={'left'}>

                <Col xs={24} sm={12} md={12} lg={8} style={{ padding: '3%' }}>
                    <div style={{ height: '100%', border: '#cecece 1px solid', borderRadius: '10px' }}>
                        <h2  >{pokemon.name}</h2>
                        <img style={{ maxWidth: '100%', maxHeight: '100%', width: '100%' }} alt='pokemon_sprite' src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon_id + '.png'} />

                    </div>

                </Col>

                <Col xs={24} sm={12} md={12} lg={8}>
                    <div className="centeredDiv" >
                        <Row al ign={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3> HP </h3> </Col>
                            <Col xs={12}><progress value={pokemon.stats[0].base_stat}
                                data-label={pokemon.stats[0].base_stat} max="100"></progress>
                            </Col>
                        </Row>

                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3>Attack</h3> </Col>
                            <Col xs={12}><progress value={pokemon.stats[1].base_stat}
                                data-label={pokemon.stats[1].base_stat} max="100"></progress>
                            </Col>
                        </Row>

                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3>Defense</h3> </Col>
                            <Col xs={12}><progress value={pokemon.stats[2].base_stat}
                                data-label={pokemon.stats[2].base_stat} max="100"></progress> </Col>

                        </Row>

                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3>Speed</h3></Col>
                            <Col xs={12}><progress value={pokemon.stats[3].base_stat}
                                data-label={pokemon.stats[3].base_stat} max="100"></progress>  </Col>

                        </Row>

                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3>Sp Att</h3></Col>
                            <Col xs={12}> <progress value={pokemon.stats[4].base_stat}
                                data-label={pokemon.stats[4].base_stat} max="100"></progress> </Col>

                        </Row>

                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><h3>Sp Def</h3></Col>
                            <Col xs={12} > <progress value={pokemon.stats[5].base_stat}
                                data-label={pokemon.stats[5].base_stat} max="100"></progress> </Col>




                        </Row>
                    </div>


                </Col>
            </Row>



        )
    }

    const ProfilePage = (props) => {


        return (



            <Row className="ProfileBox" align={'left'}>

                <Col xs={24} sm={12} md={12} lg={8} style={{ padding: '3%' }}>
                    <div style={{ height: '100%', border: '#cecece 1px solid', borderRadius: '10px' }}>
                        <h2  >{pokemon.name}</h2>
                        <img style={{ maxWidth: '100%', maxHeight: '100%', width: '100%' }} alt='pokemon_sprite' src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon_id + '.png'} />

                    </div>

                </Col>

                <Col xs={24} sm={12} md={12} lg={8}>
                    <div className="centeredDiv" >
                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><Tag color="#f50">Typ</Tag> </Col>
                            <Col className="leftText" xs={12}>  {pokemon.type}</Col>
                        </Row>
                        <br />
                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><Tag color="#f50">Výška</Tag> </Col>
                            <Col xs={12} className="leftText" >{pokemon.height / 10} Kg</Col>
                        </Row>
                        <br />
                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><Tag color="#f50">Váha</Tag> </Col>
                            <Col xs={12} className="leftText" >{pokemon.weight / 10} M </Col>
                            <br />
                        </Row>
                        <br />
                        <Row align={'left'} style={reusableRowStyle}>
                            <Col xs={12}><Tag color="#f50">Dovednosti</Tag> </Col>
                            <Col xs={12} className="leftText" >
                                <div>
                                

                                        {pokemon.abilities.map(ability =>
                                            <li >
                                                {ability.pokemon_v2_ability.name}
                                            </li>
                                        )}

                                   
                                </div>
                            </Col>
                            <br />
                        </Row>
                    </div>
                </Col>
            </Row>



        )
    }

    const items = [
        {
            key: '1',
            label: <div className="tab_antd"><SmileOutlined /> Profil </div>,

        },
        {
            key: '2',
            label: <div className="tab_antd"><ExpandAltOutlined /> Statistiky </div>,


        },

    ];

    return (
        <div className="PokemonDetails">
            <Row align={'left'} >
                <PageHeader
                    className="site-page-header"
                    onBack={() => history.back()}
                    title="Zpět na přehled"

                />
            </Row>
            <Row align={'center'} >
                <Tabs
                    onChange={onChange}
                    items={items}
                    style={{ marginBottom: '-15px' }}
                    type="card"
                    size={'large'}
                >

                </Tabs>

                {keyTab == 1 ?

                    <ProfilePage />
                    :
                    <StatisticsPage />

                }



            </Row>



        </div>
    )
}



export default PokemonDetails;