//// Pagina principal.




/// Primero : Importamos todos los elementos que vamos a utilizar

import React from 'react';
import {Grid} from '@material-ui/core' //para organizar los elementos en la pantalla
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento


/// Segundo : Definimos los estilos

const useStyles = makeStyles({
    root : {
        flexGrow : 1  // flex-grow en 1, el espacio del contenedor se distribuirá de manera uniforme entre todos los items.
        // Si uno de los ítems tiene el valor 2, ocupará el doble de espacio que los demás items.
    }
})


function Principal() {
  return (
    <div>
      Hola Mundo !!
    </div>
  );
}

export default Principal;
