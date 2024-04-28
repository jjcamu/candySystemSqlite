import React, { useEffect, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import axios from 'axios'  //modulo que me permite acceder a la api



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

function limpiarVariableFechaAnterior(){
    fechaAnterior = 0 ;
}









function VerPedidos() {


    const estilos = useStyles()

    let containerDePedidos = useRef(null);


    const [arrayPedidos, setArrayPedidos] = useState([]) 
    const [permitirPeticion, setPermitirPeticion] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.


    /// mostrar pedidos------------------------------------------------------------------------

    useEffect(() => {
        if (permitirPeticion) { //para que no se llame indefinidamente a la funcion 'mostrarPedidos'

                mostrarPedidos()
                setPermitirPeticion(false)

        }
         
    }, [permitirPeticion]) //cada vez que cambie el estado de la bandera, se llamará a 'useEffect'


    function mostrarPedidos() { 


        axios.get('http://localhost:4000/api/pedidos').then(res => {
               
            setArrayPedidos(res.data)

        });

    

    }
    

    /// Eliminar pedidos ----------------------------------------------------------------------------------------------

    const eliminarPedido = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       
         for (let x = 0; x < containerDePedidos.current.children.length; x++) { //recorro todas las filas del listado
            
           
            if (containerDePedidos.current.children[x].children[0].children[0].children[0] != undefined){ 
                //si la fila del listado posee un checkbox
                
                 if (containerDePedidos.current.children[x].children[0].children[0].children[0].children[0].children[0].checked == true){
                    //si ese checkbox esta seleccionado..


                    let fechaDelPedidoAEliminar = containerDePedidos.current.children[x].children[0].children[1].children[0].childNodes[1].data
                    // guardo la fecha del pedido cuyo checkbox esta seleccionado


                    axios.delete('http://localhost:4000/api/pedidos/' + fechaDelPedidoAEliminar).then(setPermitirPeticion(true))
                    // elimino los registros con esa fecha. La fecha es enviada a la api concatenadola a la url, osea como un parametro.
                    //mostrarPedidos()
                    
                 }
            }            

        }



    }

   




    return (

        

        <Grid container className = {estilos.root}>

            

            <Grid container className = {estilos.containerSuperior}>


                <Grid item  xs={false} sm={3} md={3} lg={3} xl={3} >


                </Grid>

                <Grid item ref={containerDePedidos}  xs={12} sm={8} md={8} lg={8} xl={8} >
                    
                    {/* recorro el array 'arrayDatos' y por cada elemento de ese array, renderizo un componente 'Pedido'.
                    En cada componente pedido ingresaré datos por medio de su propiedades 'datosDelPedido, guardarFecha...' */}
                    
                    {
                    arrayPedidos.map(datos => (<Pedido key={arrayPedidos.indexOf(datos)} datosDelPedido = {datos} 
                    guardarFecha= {guardarFecha} mostrarFechaAnterior = {mostrarFechaAnterior}  />  ))
                    }

                    {limpiarVariableFechaAnterior()} {/* esta funcion sirve para que la primera fecha a comparar sea 0, 
                    osea diferente a la fecha del primer pedido que se muestra. 
                    Si queda almacenada una fecha de una lista anterior de pedidos, y esta
                    coincide con la fecha del primer pedido de la lista, no se mostrará la fecha del primer pedido(para comprender
                    mejor esto, revisar la logica del componente 'Pedido.js') */}
                    

                                
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


                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={eliminarPedido}>
                            Eliminar de la Lista
                        </Button>   


                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Imprimir
                        </Button>   
                    </Link> 

                    <Link  style={{ textDecoration: 'none' }} to="/">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick = {limpiarVariableFechaAnterior}>
                            Volver
                        </Button>   
                    </Link> 

                            


                </Grid>
                
            </Grid>


        </Grid>

    );
}

export default VerPedidos;
