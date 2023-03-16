import React, { useState, useEffect } from "react";
import { Row, Segmented, Col, Collapse, Pagination, Card, Skeleton } from 'antd';
import { AppstoreFilled, AppstoreOutlined, AppstoreTwoTone,LoadingOutlined } from "@ant-design/icons";
const { Meta } = Card;




const cardStyle = {


    background: 'white',
    textAlgn: 'center',


}

const Pokedex = ({ pokemons, searchedPokemon, pageValues }) => {






    return (
        // <div className="Pokedex">
        <Row gutter={[24, 24]} style={{ paddingLeft: '15%', paddingRight: '15%', paddingBottom: '10%' }} justify="center">

            <Col className="leftText" xs={24}>
                <div style={{ fontSize: "25px", float: 'left' }}>
                    <p>  <AppstoreFilled width={200} /> Přehled Pokemonu</p>
                </div>

            </Col>


            {
                !pokemons.length &&

                

                    <LoadingOutlined
                    style={{
                      fontSize: 50,
                    }}
                    spin
                  />
                



            }
            {pokemons.slice(pageValues.minValue, pageValues.maxValue).map(pokemon => (
                pokemon.name.includes(searchedPokemon) &&
                <Col lg={6}  >
                    <Card style={cardStyle}
                        onClick={() => { location.href = '/pokemon/:' + pokemon.id }}
                        cover={
                            <img
                                alt="example"
                                src={pokemon.sprite}
                            />
                        }
                    >
                        <Meta
                            title={pokemon.name}
                            style={{ width: '100%', height: '100%', color: 'white' }}
                        />



                    </Card>

                </Col>
            ))}


        </Row>



        // </div>
    )
}



export default Pokedex;