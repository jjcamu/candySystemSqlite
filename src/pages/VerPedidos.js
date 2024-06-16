import React, { useEffect, useState, useRef }  from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import axios from 'axios'  //modulo que me permite acceder a la api
import Cookies from 'universal-cookie' //para verificar si se ingreso correctamente la contraseña  

//importo estos modulos para poder renderizar nuevamente el dom (si no renderizo fallan los checkbox despues de imprimir)
import ReactDOM from 'react-dom';
import Router from '../routes/Router';

import './estiloPaginaImpresion.css'; 
//estilos que configuran la pagina de impresion.
//Los componentes Grid de material ui se imprimian incorrectamente, cambiando la disposicion
// de la pagina de impresion con estos estilos, se imprimen bien.


import Pedido from '../components/Pedido'


var useStyles

if (window.innerWidth > 700){  //si la pantalla del dispositivo es mayor a 700 (por ej: una PC)

    useStyles = makeStyles({
    root: {

        backgroundColor : 'gray',
        height: '95vh',  //que ocupe casi todo el alto de la pantalla

        display: 'flex',
        flexDirection: 'column',
        alignItems : 'center'
        
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

        width : '200px', // establezco el mismo ancho para todos los botones (colocar la abreviacion 'px' !!
        
    },
    contenidoAImprimir:{  //estilo del div contenedor de la hoja a imprimir, para que no sea visible en el navegador.

       display: 'none',  //invisible
      


    },

    contenidoAImprimir2:{  // estilos de la hoja a imprimir -------------------------------------------------------------
 
        display: 'flex',
        flexDirection: 'column', //un container encima del otro


   },
   tituloAImprimir:{

        textAlign: 'center',  //titulo centrado


   },
   tituloAImprimir2:{

       display: 'flex',   //reseteo flex para sobreescribir el flexDirection column
       justifyContent: 'space-around',  //distribuyo horizontalmente los subtitulos


  },
   listaAImprimir :{
       textAlign: 'center'  // centrar la lista
        
   },

})
}
else{

    useStyles = makeStyles({
        root: {
    
            backgroundColor : 'gray',
            height: '95vh',  //que ocupe casi todo el alto de la pantalla
    
            display: 'flex',
            flexDirection: 'column',
            alignItems : 'center'
            
        },
        containerSuperior : {
    
            
            height : '60%' ,   
            justifyContent : 'center',  
            overflowY : 'scroll'  //si el contenido sobrepasa (overflow) el limite inferior de su contenedor, se crea una scroll bar.
    
        },
        containerInferior : {  //grid container que contiene a su vez el grid container de los botones.
        
            height : '40%',
            alignItems : 'center',
    
    
        },
        containerBotones: { // grid container que contiene a los botones.
    
            display : 'flex',
            flexDirection : 'column',
            alignItems: 'center', 
            justifyContent : 'space-around'

            
        },
        boton: {  // cada boton individual
            height : '100%',  //todos los botones tendran el alto del container padre, (del container botones)
            width : '200px', // establezco el mismo ancho para todos los botones (colocar la abreviacion 'px' !!)
            margin: '10px',

            
    
        },
        contenidoAImprimir:{  //estilo del div contenedor de la hoja a imprimir, para que no sea visible en el navegador.
    
           display: 'none',  //invisible
          
    
    
        },
    
        contenidoAImprimir2:{  // estilos de la hoja a imprimir -------------------------------------------------------------
     
            display: 'flex',
            flexDirection: 'column', //un container encima del otro
    
    
       },
       tituloAImprimir:{
    
            textAlign: 'center',  //titulo centrado
    
    
       },
       tituloAImprimir2:{
    
           display: 'flex',   //reseteo flex para sobreescribir el flexDirection column
           justifyContent: 'space-around',  //distribuyo horizontalmente los subtitulos
    
    
      },
       listaAImprimir :{
           textAlign: 'center'  // centrar la lista
            
       },
    
    })




}








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

    const cookies = new Cookies(); 

    let containerDePedidos = useRef(null);
    let refContenidoAImprimir = useRef(null)


    const [arrayPedidos, setArrayPedidos] = useState([]) 
    const [permitirPeticion, setPermitirPeticion] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.


    /// mostrar pedidos------------------------------------------------------------------------

    useEffect(() => {
        if (permitirPeticion) { //para que no se hagan peticiones get indefinidamente
            
            axios.get(cookies.get('urlApi') + '/api/pedidos').then(res => {
                
                setArrayPedidos(res.data)
                setPermitirPeticion(false)

            }); 
            

        }

         if (!cookies.get('id')){  //si no fue ingresada correctamente la contraseña, osea no se almacenó nada en la cookie 'id'...
            window.location.href = "/" //se redirigirá automaticamente al 'login'
        } 
         
    }, [arrayPedidos, permitirPeticion]) //cada vez que cambie el estado de la bandera, se llamará a 'useEffect'



    

    /// Eliminar pedidos ----------------------------------------------------------------------------------------------

    const eliminarPedido = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       

    
         for (let x = 0; x < containerDePedidos.current.children.length; x++) { //recorro todas las filas del listado
            


    
            if (containerDePedidos.current.children[x].children[0].children[0].children[0].tagName == "DIV"){ 
            //si la fila del listado posee un checkbox 
            //(indagando en la estructura del dom, pude ver que el checkbox se encuentra en 
            //'containerDePedidos.current.children[x].children[0].children[0].children[0]' , que es un contenedor 'div')

                  if (containerDePedidos.current.children[x].children[0].children[0].children[0].children[0].children[0].children[0].checked == true){
                    //si ese checkbox esta seleccionado..


                     let fechaDelPedidoAEliminar = arrayPedidos[x].dia
                    // guardo la fecha del pedido cuyo checkbox esta seleccionado (la fila 'x' de la lista se corresponde con el
                    // elemento del arrayPedidos, asi que de este ultimo obtengo el dia)


                    axios.delete(cookies.get('urlApi') + '/api/pedidos/' + fechaDelPedidoAEliminar).then(setPermitirPeticion(true))
                    // elimino los registros con esa fecha. La fecha es enviada a la api concatenadola a la url, osea como un parametro.
                    //mostrarPedidos()  
                    
                 } 
            }        

        } 

    }


        /// Cancelar pedidos ----------------------------------------------------------------------------------------------
        // Se elimina el pedido de la tabla 'pedidos', y se restituye el stock anterior de los insumos gastados.


        const cancelarPedido = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       
        for (let x = 0; x < containerDePedidos.current.children.length; x++) { //recorro todas las filas del listado
           

           if (containerDePedidos.current.children[x].children[0].children[0].children[0].tagName == "DIV"){ 
           //si la fila del listado posee un checkbox 
           //(indagando en la estructura del dom, pude ver que el checkbox se encuentra en 
           //'containerDePedidos.current.children[x].children[0].children[0].children[0]' , que es un contenedor 'div')

                 if (containerDePedidos.current.children[x].children[0].children[0].children[0].children[0].children[0].children[0].checked == true){
                   //si ese checkbox esta seleccionado..


                    let fechaDelPedidoACancelar = arrayPedidos[x].dia
                   // guardo la fecha del pedido cuyo checkbox esta seleccionado (la fila 'x' de la lista se corresponde con el
                   // elemento del arrayPedidos, asi que de este ultimo obtengo el dia)


                   axios.delete(cookies.get('urlApi') + '/api/pedidos/cancelar/' + fechaDelPedidoACancelar).then(setPermitirPeticion(true))
                   // cancelo los registros con esa fecha. La fecha es enviada a la api concatenadola a la url, osea como un parametro.
                   // Ademas, se devuelven al stock , los insumos gastados por el pedido realizado.
                  
                   
                } 
           }        

       } 



   }


    function imprimirPedidos(){


        //guardo el contenido html del div que quiero imprimir
        let contenidoAImprimir = refContenidoAImprimir.current.innerHTML 

        //guardo el contenido html original de este documento
        let contenidoOriginal = document.body.innerHTML; 
       
        //guardo el contenido html a imprimir en el body de este documento
        document.body.innerHTML = contenidoAImprimir
 
        window.print(); //imprimo el contenido de la ventana, osea el documento

        document.body.innerHTML = contenidoOriginal //devuelvo el contenido original a este documento

        //renderizo nuevamente el documento, para que me funcione correctamente todos sus componentes
        //(si omito este paso, dejan de funcionar los checkbox y el boton de imprimir)
        ReactDOM.render( <Router />, document.querySelector('#root')); 


    }

 


    return (

    <div>

        <Grid container className = {estilos.root}>

            

            <Grid container className = {estilos.containerSuperior}>




                <Grid item ref={containerDePedidos}  >
                    

                    {limpiarVariableFechaAnterior()}
                   {/*  Cuando se lista un solo pedido, la fecha del pedido anterior coincide con la del pedido actual (ver logica 
                    del componente Pedido.js) y eso no permite que se muestre la fecha del pedido listado.
                    Para que eso no ocurra, la funcion 'limpiarVariableFechaAnterior' pone en cero la fecha del pedido anterior. */}

                    {/* recorro el array 'arrayDatos' y por cada elemento de ese array, renderizo un componente 'Pedido'.
                    En cada componente pedido ingresaré datos por medio de su propiedades 'datosDelPedido, guardarFecha...' */}
                    
                    {
                    arrayPedidos.map(datos => (<Pedido key={arrayPedidos.indexOf(datos)} datosDelPedido = {datos} 
                    guardarFecha= {guardarFecha} mostrarFechaAnterior = {mostrarFechaAnterior} nroPedido ={arrayPedidos.indexOf(datos)}
                    pedidosTotales = {arrayPedidos.length} />  ))
                    }

                                
                    {/* 'indexOf' devuelve el indice correspondiente al elemento del array ingresado como parametro.
                    React exige ingresar un valor de 'key' diferente por cada componente renderizado.
                    'guardarFecha' y 'mostrarFechaAnterior' son funciones ingresadas en las propiedades del mismo nombre, que me 
                    permiten acceder a la variable 'global' de este componente (VerPedidos) llamada 'fechaAnterior'. */}




                </Grid>    






            </Grid>


            

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >

                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={cancelarPedido}>
                            Cancelar Pedido
                        </Button>   



                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={eliminarPedido}>
                            Eliminar de la Lista
                        </Button>   


   
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={imprimirPedidos}>
                            Imprimir 
                        </Button>   
    

                    <Link  style={{ textDecoration: 'none' }} to="/principal">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick = {limpiarVariableFechaAnterior}>
                            Volver
                        </Button>   
                    </Link> 

                            


                </Grid>
                
            </Grid>


        </Grid>


        


        {/* CONTENIDO QUE SERA IMPRESO -----------------------------------------------------------------------------------  */}



        <div ref={refContenidoAImprimir} className = {estilos.contenidoAImprimir}>


  
            <div className = {estilos.contenidoAImprimir2}>

                <div className = {estilos.tituloAImprimir}>

                    <h2>PEDIDOS ORDENADOS POR FECHA:</h2>

                </div> 




                <div className = {estilos.listaAImprimir}>
                    


                    {
                    arrayPedidos.map(datos => (<Pedido key={arrayPedidos.indexOf(datos)} datosDelPedido = {datos} 
                    guardarFecha= {guardarFecha} mostrarFechaAnterior = {mostrarFechaAnterior} eliminarCheck = {true}  />  ))
                    }
                    {/* ingreso la propiedad 'eliminarCheck' en true, para que no se muestre el checkbox del componente 'Pedido', ya que
                    no tiene sentido el checkbox en una hoja impresa. */}

                    

                </div>

            </div>

        </div>






    </div>


    );
}

export default VerPedidos;
