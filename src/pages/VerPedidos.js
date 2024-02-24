import React, { useState }  from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'

import Pedido from '../components/Pedido'



const useStyles = makeStyles({

    root: {
        flexGrow : 1 ,
        backgroundColor : 'gray',
        height: '95vh',  //que ocupe casi todo el alto de la pantalla
        
        
    },
    containerSuperior : {

        
        height : '70%' ,   
        justifyContent : 'center',  
        overflowY : 'scroll'  //si el contenido sobrepasa (overflow) el limite inferior de su contenedor, se crea una scroll bar.

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

var fechaAnterior = 0

function guardarFecha(fecha){

    fechaAnterior = fecha ;



}

function mostrarFechaAnterior(){
    return (fechaAnterior)
}





function VerPedidos() {


    const estilos = useStyles()






    const arrayDatos = [{
        fecha : '20/07/92',
        cantidad : 27,
        producto : 'propoleoum'

    },
    {
        fecha : '21/05/88',
        cantidad : 3,
        producto : 'acidos'

    },
    {
        fecha : '09/07/2002',
        cantidad : 88,
        producto : 'propoleoum con miel'

    },
    {
        fecha : '09/07/2002',
        cantidad : 65,
        producto : 'propoleoum con popó '

    },
    {
        fecha : '09/07/2002',
        cantidad : 88,
        producto : 'propoleoum con miel'

    },
    {
        fecha : '09/07/2002',
        cantidad : 65,
        producto : 'propoleoum con popó '

    },    
    {
        fecha : '09/07/2002',
        cantidad : 88,
        producto : 'propoleoum con miel'

    },
    {
        fecha : '09/07/2002',
        cantidad : 65,
        producto : 'propoleoum con popó '

    },
]


    return (

        <Grid container className = {estilos.root}>

            <Grid container className = {estilos.containerSuperior}>


                <Grid item  xs={false} sm={3} md={3} lg={3} xl={3} >


                </Grid>

                <Grid item  xs={12} sm={8} md={8} lg={8} xl={8} >
                    
                    {/* recorro el array 'arrayDatos' y por cada elemento de ese array, renderizo un componente 'Pedido'.
                    En cada componente pedido ingresaré datos por medio de su propiedades 'datosDelPedido, guardarFecha...' */}

                    {arrayDatos.map(datos => (<Pedido key={arrayDatos.indexOf(datos)} datosDelPedido = {datos} 
                    guardarFecha= {guardarFecha} mostrarFechaAnterior = {mostrarFechaAnterior} />))   }
                                
                    {/* 'indexOf' devuelve el indice correspondiente al elemento del array ingresado como parametro.
                    React exige ingresar un valor de 'key' diferente por cada componente renderizado.
                    'guardarFecha' y 'mostrarFechaAnterior' son funciones ingresadas en las propiedades del mismo nombre, que me 
                    permiten acceder a la variable 'global' de este componente (VerPedidos) llamada 'fechaAnterior'. */}




                </Grid>    

                <Grid item  xs={false} sm={1} md={1} lg={1} xl={1} >


                </Grid>




            </Grid>


            

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >
                    <Link  style={{ textDecoration: 'none'}} to="/">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Cancelar Pedido
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Eliminar de la Lista
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Imprimir
                        </Button>   
                    </Link> 

                    <Link  style={{ textDecoration: 'none' }} to="/">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Volver
                        </Button>   
                    </Link> 

                            


                </Grid>
                
            </Grid>


        </Grid>

    );
}

export default VerPedidos;
