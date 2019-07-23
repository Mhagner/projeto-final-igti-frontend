import React from 'react';
import { Row, Col } from 'antd';

import Card from './componentes/card'
import Tamplate from './layout/tamplate'
import Datapiker from './componentes/datapiker'

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
