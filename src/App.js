import React from 'react';

import Card from './componentes/card'
import { Row } from 'antd'
import Tamplate from './layout/tamplate'

//css do antd
import 'antd/dist/antd.css'
import './assets/css/custom.css'


function App(props) {
  return (
    <div className="App">
      <Tamplate>
        <h2>Dashboard</h2>
      </Tamplate>
    </div>
  );
}

export default App;
