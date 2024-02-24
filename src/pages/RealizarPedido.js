import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import {Grid, Button, Typography, TextField} from '@material-ui/core' //Grid : para organizar los elementos en la pantalla
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento

import Cargada from '../components/Cargada'






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



const RealizarPedido = () => {


    const estilos = useStyles()


    let referencia = useRef(null);  // declaro una referencia a un nodo del DOM (del DOM virtual de React)


    //esto no funcionó, tuve que utilizar el hook useEffect
 /*     const desplazarHaciaAbajo = () => {
        referencia.current.scrollTop = referencia.current.scrollHeight ;    
      } */

 
      



    //hook de estado: utilizo este hook , ya que al cambiarlo, se renderiza en pantalla los cambios.
    const [cargadas, setCargadas] = useState([ 1 ]);  //almaceno en el hook de estado, un array con tantos elementos como cargadas
    //tiene el pedido.


    function agregarCargada(){  //agregar cargadas al pedido

        let cantidadActualizada = cargadas + 1  //incremento el numero de cargadas

        setCargadas([ ...cargadas,  cantidadActualizada ]) //actualizo el array almacenado en el hook. Utilizo operador spread(...).
        // '...cargadas' representa todos los elementos que contiene el array, y 'cantidadActualizada' es el nuevo elemento
        // que voy a agregar.

    }


    useEffect(() => {   //este hook renderizara en pantalla los cambios, cuando se altere el hook de estado 'cargadas'
        referencia.current.scrollTo({ top: referencia.current.scrollHeight, behavior: "smooth" })
        //desplazar el scroll bar del elemento 'referencia' hacia la altura maxima del scroll.
        //con la propiedad 'behavior', le doy un efecto de desplazamiento suave
      }, [cargadas])



  return (
    <Grid container className={estilos.root}>

        <Grid container className ={estilos.containerSuperior}>

            <Grid container className ={estilos.containerFecha}>
                <Grid container item ={true} xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha1} >

                    <Typography > Pedidos de la fecha :  </Typography>  

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha2} >

                    <TextField type="date"  InputLabelProps={{shrink: true,}}/>

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

            <Grid item  ref={referencia} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.cargadas}>



                {/* Recorro el array de las cargadas , y por cada cargada, renderizaré un componente '<Cargada/>'.
                React te sugiere asignar a la propiedad 'key', un valor único para cada componente renderizado, y como
                el valor de cada elemento del array es unico, utilizo el valor de cada elemento para asignar a cada propiedad 'key' */}

                {cargadas.map(cargada => (<Cargada key={cargada} />))   }


                    

            </Grid>

            

            <Grid container item={true} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.botonAgregarCargada}   >

                <Button variant = { 'contained'} color = {"primary"} onClick={() => agregarCargada()}>

                    <Typography>Agregar mas cargadas</Typography>

                </Button>

            </Grid>


        
        </Grid>



        <Grid container className = {estilos.containerInferior} >




            <Grid container className = {estilos.containerBotones} >
                <Link  style={{ textDecoration: 'none'}} to="/">  
                    <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                        Cargar pedido y volver
                    </Button>   
                </Link> 

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

