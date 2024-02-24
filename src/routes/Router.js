//El componente Router es el que asocia las rutas url con los respectivos componentes.
//Aqui se crean las rutas y se las enlaza a los componentes de la app.

import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';


import Principal from '../pages/Principal';
import RealizarPedido from '../pages/RealizarPedido'
import VerStockInsumos from '../pages/VerStockInsumos'
import VerPedidos from '../pages/VerPedidos'
import EditarProductos from '../pages/EditarProductos'

function Router() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Principal}/> {/* importante no olvidar de colocar la propiedad 'exact' !! */}
      <Route path='/realizarPedido' component={RealizarPedido}/>
      <Route path='/verStockInsumos' component={VerStockInsumos}/>
      <Route path='/verPedidos' component={VerPedidos}/>
      <Route path='/editarProductos' component={EditarProductos}/>
    </Switch>
    </BrowserRouter>
  );
}

export default Router;