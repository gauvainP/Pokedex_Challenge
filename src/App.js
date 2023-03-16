import logo from './logo.svg';
import React from 'react';

import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, Pagination, Row } from 'antd';
import PokemonDetails from './views/PokemonDetails';
import HeaderNav from './components/HeaderNav';
import Home from './views/Home';
const { Header, Footer, Content } = Layout;


function App() {



  return (
    <div className="App">
      <Router>

        <Layout>
          <HeaderNav />
          <Content className='content'>
            <Routes>

              <Route exact path="/" element={<Home />} />
              <Route path="/pokemon/:id" element={<PokemonDetails />} />


              <Route path="*" element={<Home />} />

            </Routes>

           

          </Content>
        </Layout>
        <Footer className='footer'>
          </Footer>

      </Router>
    </div>
  );
}

export default App;
