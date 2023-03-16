import { Row, Col, Button, Space, Breadcrumb } from "antd";
import React, { useState, useEffect } from "react";

import logo from '../images/logo.png';



const headerNav = () => {

    return (

        <Row justify='Left' align={'left'} className="header" xs={24}>
            <Col align='left' xs={16}>
                {/* <h1 style={{color: 'white', fontSize: '160%'}} >POKEDEX</h1> */}
                <img width={120} className={'logo_pokemon'} alt='logo_pokemon' src={logo} />
            </Col>
            <Col xs={8}>
                <Space  style={{padding: '2vh 0'}}>
                <a style={{color: 'white', }} ></a>
                <a style={{color: 'white', }} ></a>
                <Breadcrumb
    items={[
     
      {
        title: <a style={{ color: 'white'}} >O nás</a>,
      },
      {
        title:<a href='/' style={{fontWeight: 'bold', color: 'white'}} >Pokemoní</a>,
      },
   
    ]}
  />
                </Space>
            </Col>


        </Row>


    )
}



export default headerNav;