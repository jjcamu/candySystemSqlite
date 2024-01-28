//El componente Router es el que asocia las rutas url con los respectivos componentes.
//Aqui se crean las rutas y se las enlaza a los demas componentes de la app.

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Principal from '../pages/Principal';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Principal}/>
    </Switch>
    </BrowserRouter>
  );
}

export default App;