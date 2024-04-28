import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import {Grid, Button, Typography, TextField} from '@material-ui/core' //Grid : para organizar los elementos en la pantalla
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api

import { useHistory } from "react-router-dom" // otra manera de redirigir a una pagina

import Cargada from '../components/Cargada'




// creo los estilos

const useStyles = makeStyles({


    root : {
        flexGrow : 1,
        backgroundColor : 'gray',
        height: '95vh',  //que ocupe casi todo el alto de la pantalla
    },
    containerSuperior : {
        height : '70%' ,   
        justifyContent : 'center',  
        
    },
        containerFecha : {
            alignItems : 'center'

        },
            fecha1 : {
                justifyContent : 'flex-end',
                

            },
            fecha2 : {
                paddingLeft : '20px'

            },
        containerTitulos : {
            
        },
            titulo1 : {
                justifyContent : 'center'
            },
            titulo2 : {
                justifyContent : 'center'
            },

        cargadas : {
           // display : 'flex',
           // flexDirection : 'column-reverse',
            height : '55%' ,  
            overflowY : 'scroll',  //si el contenido sobrepasa (overflow) el limite inferior de su contenedor, se crea una scroll bar.
            
        },
        botonAgregarCargada : {
            justifyContent : 'center'
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



        
    }





})


//-----------------------------------------------------------------------------------------------------------------------
const RealizarPedido = () => {


    //PRIMERO VA LA LOGICA DEL COMPONENTE

    

    const estilos = useStyles() // aplicar los estilos

    let history = useHistory() // otra forma de redirigir a una pagina 


// referencias ----------------------------------------------------------------------------------------------------
    // declaro referencias a nodos del DOM (del DOM virtual de React)

    let containerDeCargadas = useRef(null);  // referencia al grid contenedor de los componentes 'Cargada'

    let calendario = useRef(null);   // referencia al 'datepicker' (calendario)



      
//manejo del numero de cargadas -----------------------------------------------------------------------------------------------


    //hook de estado: utilizo este hook , ya que al cambiarlo, se renderiza en pantalla los cambios.
    //cada vez que actualicemos el estado de nuestro componente, este se volverá a renderizar .
    const [cantidadDeCargadas, setCantidadDeCargadas] = useState([ 1 ]);  //almaceno en el hook de estado, 
    //un array con tantos elementos como cargadas tiene el pedido.
    

    function agregarCargada(){  //agregar cargadas al pedido

        let cantidadActualizada = cantidadDeCargadas + 1  //incremento el numero de cargadas

        setCantidadDeCargadas([ ...cantidadDeCargadas,  cantidadActualizada ]) //actualizo el array almacenado en el hook. Utilizo operador spread(...).
        // '...cantidadDeCargadas' representa todos los elementos que contiene el array, y 'cantidadActualizada' es el nuevo elemento
        // que voy a agregar.

    }

//guardo pedido en BBDD -----------------------------------------------------------------------------------------------------


    const guardarPedido = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       
    //e.preventDefault();  /* para que la pagina no recargue, ya que estamos creando una aplicacion spa */
    
    if ((calendario.current.children[0].childNodes[0].value).length != 0) { // si se ingreso una fecha en el calendario (date picker)
 

        for (let x = 0; x < containerDeCargadas.current.children.length; x++) {
            
            const nuevoPedido = {  
                // tomo la fecha ingresada y la invierto ( de 'yyyy-mm-dd' a 'dd-mm-yyyy')
                dia: (calendario.current.children[0].childNodes[0].value).split("-").reverse().join("-"), 
                cantidad: containerDeCargadas.current.children[x].firstChild.children[0].innerText,
                producto: containerDeCargadas.current.children[x].firstChild.children[1].innerText
            }
            
            /* 
            realizo la peticion asincrona al servidor donde se encuentra alojada la api (el backend), y almaceno en la coleccion 
            'pedidos' de la base de datos, la informacion contenida en 'nuevoPedido' */
            await axios.post('http://localhost:4000/api/pedidos', nuevoPedido)

            


        }
       
        history.push("/")  //redirijo a la pagina principal de esta manera, porque con el componente 'Link', se redirige
        // pero no completa el bucle 'for' , y no termina de guardar los pedidos, ademas que genera un error.
        // De esta forma me aseguro de que se complete el bucle for antes de redirigirme a la pagina principal.
    }else{ 


        window.alert("INGRESE UNA FECHA POR FAVOR !");
    }

    }



     // recorro todos los valores de todos los selects

/*         for (let x = 0; x < containerDeCargadas.current.children.length; x++) {

            for (let y = 0; y < containerDeCargadas.current.children[x].firstChild.children.length; y++) {
            
                console.log (containerDeCargadas.current.children[x].firstChild.children[y].innerText)
            
            }
        } */



    //scrollbar del grid ----------------------------------------------------------------------------------------------


    // useEffect : es un hook que ejecuta código cada vez que cambie un estado de nuestro componente, y por lo tanto se renderizará.
    // Tambien se ejecutará cuando sea la primera vez que se renderice el componente.
    useEffect(() => {   //cuando se altere el hook de estado 'cantidadDeCargadas', se ejecutara el siguiente codigo y se renderizará.
        containerDeCargadas.current.scrollTo({ top: containerDeCargadas.current.scrollHeight, behavior: "smooth" })
        //desplazar el scroll bar del elemento 'containerDeCargadas' hacia la altura maxima del scroll.
        //con la propiedad 'behavior', le doy un efecto de desplazamiento suave
      }, [cantidadDeCargadas])



//-------------------------------------------------------------------------------------------------------------------


 

  return (
    <Grid container className={estilos.root}>

        <Grid container className ={estilos.containerSuperior}>

            <Grid container className ={estilos.containerFecha}>
                <Grid container item ={true} xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha1} >

                    <Typography > Pedidos de la fecha :  </Typography>  

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha2} >

                    <TextField type="date" InputLabelProps={{shrink: true,}} ref={calendario}/>

                </Grid>
            </Grid>

                {/* hago un Grid container, para poder aplicar propiedades flexbox sobre el componente 'Typhography', que se comportará como un Grid item */} 
                {/* 'item = {true} ' sirve para eliminar el warning de la consola, que advierte que no se puede aplicar las
                propiedades 'xs, sm, md.. ' a un Grid container    */} 

            <Grid container className ={estilos.containerTitulos} >
                <Grid container item ={true} xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.titulo1} >

                    <Typography >CANTIDAD :</Typography>

                </Grid>
                <Grid container item ={true} xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.titulo2} >

                    <Typography >PRODUCTO :</Typography>

                </Grid>

            </Grid>

            <Grid item  ref={containerDeCargadas} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.cargadas}>



                {/* Recorro el array de las cargadas , y por cada cargada, renderizaré un componente '<Cargada/>'.
                React te sugiere asignar a la propiedad 'key', un valor único para cada componente renderizado, y como
                el valor de cada elemento del array es unico, utilizo el valor de cada elemento para asignar a cada propiedad 'key' */}

                {cantidadDeCargadas.map(item => (<Cargada  key={item}   />))   }


                    

            </Grid>

            

            <Grid container  item={true} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.botonAgregarCargada}   >

                <Button variant = { 'contained'} color = {"primary"} onClick={() => agregarCargada()}>

                    <Typography >Agregar mas cargadas</Typography>

                </Button>

            </Grid>


        
        </Grid>



        <Grid container className = {estilos.containerInferior} >




            <Grid container className = {estilos.containerBotones} >
                {/* <Link  style={{ textDecoration: 'none'}} to="/">   */}
                    <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={guardarPedido}>
                        Cargar pedido y volver
                    </Button>   
               {/*  </Link>  */}

                <Link style={{ textDecoration: 'none'}} to="/">  
                    <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                        Imprimir
                    </Button>   
                </Link> 

                <Link style={{ textDecoration: 'none'}} to="/">  
                    <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                        Volver sin Cargar Pedido
                    </Button>   
                </Link> 


                        


            </Grid>

        </Grid>        




      
    </Grid>
  );
  

}



export default RealizarPedido;

