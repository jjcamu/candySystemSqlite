//// Pagina principal.
// Sistema para el Control de Stock de Insumos Candy System - creado por Juan Jose Camussi 2024



/// Primero : Importamos todos los elementos que vamos a utilizar

import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import {Grid, Button} from '@material-ui/core' //Grid : para organizar los elementos en la pantalla
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import Cookies from 'universal-cookie' //para verificar si se ingreso correctamente la contraseña  

/// Segundo : Definimos los estilos

const useStyles = makeStyles({
    root : {
        flexGrow : 1  // flex-grow en 1, el espacio del contenedor se distribuirá de manera uniforme entre todos los items.
        // Si uno de los ítems tiene el valor 2, ocupará el doble de espacio que los demás items.
      ,
        backgroundColor: 'gray',
        height: '95vh'  //que ocupe casi todo el alto de la pantalla (100vh sería todo el alto)
        
    },
    contenedorSuperior :{  //aca defino los estilos para el grid container (contenedor padre, el que contiene a los items)
        display : 'flex', //aplico flexbox
        justifyContent : 'center', // para que esta propiedad de flexbox tenga efecto, debe definirse en el contenedor padre
        height: '70%',  // que ocupe el x % de la altura del elemento padre (que en este caso es un elemento div)

    },
    containerInferior : {  //grid container que contiene a su vez el grid container de los botones.
    
        height : '30%',
        alignItems : 'center',


    },
    containerBotones: { // grid container que contiene a los botones.

        height : '60%',
        justifyContent : 'space-around',  // distribuyo a los botones en el eje horizontal de la pantalla
        
    },
    boton: {  // cada boton individual
        height : '100%',  //todos los botones tendran el alto del container padre, (del container botones)

        width : '200px', // establezco el mismo ancho para todos los botones (colocar la abreviacion 'px' !!)



        
    },
    contenedorImagen:{
        //width : '60%',
        height : '80vh',
        //backgroundColor: 'green'
    },
    imagen:{
        width : '100%',
        //height : '100%'
    }




})




function Principal() {  //Definimos el componente funcional 'Principal'


/// Tercero : Llamamos a los estilos

    const estilos = useStyles()

    const cookies = new Cookies(); // creo un objeto Cookies


    useEffect(() => { // este metodo se ejecuta en el primer renderizado del componente

        if (!cookies.get('id')){  //si no fue ingresada correctamente la contraseña, osea no se almacenó nada en la cookie 'id'...
            window.location.href = "/" //se redirigirá automaticamente al 'login'
        }

      }, []);



    function eliminarCookiesYSalir(){  //cerrar sesion

        cookies.remove('id' , {path : '/'}) //borro las cookies (variables de sesion), para no permitir el ingreso al sistema
        // sin la contraseña correcta.

        window.location.href = '/' //redirecciono a la pagina del login


    }
    


    return (
        <div className={estilos.root}>  {/* aplico el estilo en este elemento html */}
            <Grid container className={estilos.contenedorSuperior}>   {/* creamos un grid contenedor */}

                <Grid item xs={false} sm={2} md={2} lg={2} xl={2}>
                </Grid>

                <Grid item className={estilos.contenedorImagen} xs={12} sm={8} md={8} lg={8} xl={8} >

 
                     <img src={require('../assets/img/candysystem_logo3.png')} className={estilos.imagen}    alt={''} />  

                  
                </Grid>

                
                <Grid item xs={false} sm={2} md={2} lg={2} xl={2}>
                </Grid>

            </Grid>

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >
                    <Link  style={{ textDecoration: 'none'}} to="/realizarPedido">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Realizar Pedido
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/verPedidos">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Ver Pedidos
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/verStockInsumos">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Ver Stock Insumos
                        </Button>   
                    </Link> 

                    <Link  style={{ textDecoration: 'none' }} to="/editarProductos">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Editar Productos y Consumos
                        </Button>   
                    </Link> 

                    <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={eliminarCookiesYSalir}>
                        Salir
                    </Button>  

                            


                </Grid>
                
            </Grid>

            





        </div>
    )
}

export default Principal;
