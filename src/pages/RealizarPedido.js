import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import {Grid, Button, Typography, TextField} from '@material-ui/core' //Grid : para organizar los elementos en la pantalla
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api

import Cookies from 'universal-cookie' //para verificar si se ingreso correctamente la contraseña  



import { useHistory } from "react-router-dom" // otra manera de redirigir a una pagina

import Cargada from '../components/Cargada'



import './estiloPaginaImpresion.css'; 

//estilos que configuran la pagina de impresion.
//Los componentes Grid de material ui se imprimian incorrectamente, cambiando la disposicion
// de la pagina de impresion con estos estilos, se imprimen bien.




// creo los estilos
var useStyles

if (window.innerWidth > 700){  //si la pantalla del dispositivo es mayor a 700 (por ej: una PC)

    useStyles = makeStyles({


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


}else{ //si la pantalla del dispositivo es menor a 500 (por ej: un celular)

    useStyles = makeStyles({


        root : {

            backgroundColor : 'gray',
            height: '95vh',  //que ocupe casi todo el alto de la pantalla
        },
        containerSuperior : {
            height : '70%' ,   
            justifyContent : 'center',  
            
        },
            containerFecha : {
                
    
            },
                fecha1 : {
                    justifyContent : 'center',            
    
                },
                fecha2 : {
                    display:'flex',
                    justifyContent : 'center',
                  
                },
            containerTitulos : {
                justifyContent : 'center'
            },
                titulo1 : {
                    justifyContent : 'center'
                },
                titulo2 : {
                    justifyContent : 'center'
                },
    
            cargadas : {

                height : '40%' ,  
                overflowY : 'scroll',  //si el contenido sobrepasa (overflow) el limite inferior de su contenedor, se crea una scroll bar.
                
            },
            botonAgregarCargada : {
                justifyContent : 'center',
                padding: '20px'
            },
    
    
        containerInferior : {  //grid container que contiene a su vez el grid container de los botones.
        
            height : '30%',
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
            margin: '7px',

            
    
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



//-----------------------------------------------------------------------------------------------------------------------
const RealizarPedido = () => {


    //PRIMERO VA LA LOGICA DEL COMPONENTE

    

    const estilos = useStyles() // aplicar los estilos

    let history = useHistory() // otra forma de redirigir a una pagina 

    const cookies = new Cookies(); // creo un objeto Cookies


// referencias ----------------------------------------------------------------------------------------------------
    // declaro referencias a nodos del DOM (del DOM virtual de React)

    let containerDeCargadas = useRef([]);  // referencia al grid contenedor de los componentes 'Cargada'

    let calendario = useRef(null);   // referencia al 'datepicker' (calendario)

    let refContenidoAImprimir = useRef(null)



      
//manejo del numero de cargadas -----------------------------------------------------------------------------------------------


    //hook de estado: utilizo este hook , ya que al cambiarlo, se renderiza en pantalla los cambios.
    //cada vez que actualicemos el estado de nuestro componente, este se volverá a renderizar .
    const [cantidadDeCargadas, setCantidadDeCargadas] = useState([ 1 ]);  //almaceno en el hook de estado, 
    //un array con tantos elementos como cargadas tiene el pedido.

    const [fechaAImprimir, setFechaAImprimir] = useState('') 


  
    



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
 

        //for (let x = containerDeCargadas.current.children.length - 1; x >= 0; x--) {
        for (let x = 0 ; x < containerDeCargadas.current.children.length ; x++) {


             const nuevoPedido = {  


                dia:  calendario.current.children[0].childNodes[0].value,
                cantidad: containerDeCargadas.current.children[x].firstChild.children[0].innerText,
                producto: containerDeCargadas.current.children[x].firstChild.children[1].innerText
            }
            
             
            //realizo la peticion asincrona al servidor donde se encuentra alojada la api (el backend), y almaceno en la coleccion 
            // 'pedidos' de la base de datos, la informacion contenida en 'nuevoPedido' 
            await axios.post(cookies.get('urlApi') + '/api/pedidos', nuevoPedido) 
                .then(res => res.data.message.length > 0 && window.alert((res.data.message).map((item) => item + '\n'))) 
                //muestro la informacion proveniente de la api en un cuadro de dialogo
                // '&&' indica que la expresion que lo precede (res.data.message.length > 0) es un condicional. 
                //Si existe alguna informacion proveniente de la api, el array 'res.data.message' tendra mas de 0 elementos, 
                // y se abrirá el cuadro de dialogo. En caso contrario, no pasará nada.
                // '/n' provoca un salto de linea

            //Por medio de la funcion 'actualizarInsumoPorPedido' que se encuentra alojada en la api, se actualiza el stock de insumos.


            
            //await axios.put('http://localhost:4000/api/insumos/' + nuevoPedido.producto + '/' + nuevoPedido.cantidad) 



        }
       
        history.push("/principal")  //redirijo a la pagina principal de esta manera, porque con el componente 'Link', se redirige
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

        if (!cookies.get('id')){  //si no fue ingresada correctamente la contraseña, osea no se almacenó nada en la cookie 'id'...
            window.location.href = "/" //se redirigirá automaticamente al 'login'
        }

      }, [cantidadDeCargadas])






    // preparo para Imprimir -------------------------------------------------------------------------------------------------

    function cambiarFechaAImprimir(){

        //guardo la fecha ingresada en el 'date picker' y actualizo la fecha a mostrar en la impresion.
        setFechaAImprimir((calendario.current.children[0].childNodes[0].value).split("-").reverse().join("-"))
        //el metodo 'split("-").reverse().join("-")' toma la fecha, que es un string, y la invierte de 'yyyy-mm-dd' a 'dd-mm-yyyy'

    }



    const [cargadasAImprimir, setCargadasAImprimir] = useState([]) //almaceno las cargadas ingresadas en los select, para imprimirlas


    const [permitirLlamada, setPermitirLlamada] = useState(false) 
    // bandera que utilizo para bloquear las llamadas constantes a la funcion de imprimir


    useEffect(() => { //cuando se altere el hook de estado 'permitirLlamada', se ejecutara el siguiente codigo y se renderizará.
        if (permitirLlamada) { //para que no se llame indefinidamente a la funcion 'imprimirPedidoDelDia'

                imprimirPedidoDelDia ()

                setPermitirLlamada(false)

        }
         
    }, [permitirLlamada]) //cada vez que cambie el estado de la bandera, se llamará a 'useEffect'





    function actualizarDatosParaImprimir (){
   // obtengo los datos ingresados en los selects y los guardo en el estado 'cargadasAImprimir'

        if ((calendario.current.children[0].childNodes[0].value).length != 0) { // si se ingreso una fecha en el calendario (date picker)   


            let cargadas = []

            for (let x =  0; x < containerDeCargadas.current.children.length; x++) {


                let pedidoAImprimir = {  


                cantidad: (containerDeCargadas.current.children[x].firstChild.children[0].innerText).toString(),
                producto: (containerDeCargadas.current.children[x].firstChild.children[1].innerText).toString()
            
                }
            
                cargadas.push( pedidoAImprimir)

            }

            setCargadasAImprimir(cargadas)

            setPermitirLlamada(true) //llamo a useEffect, para que se rendericen los cambios 

        }else{ 


            window.alert("INGRESE UNA FECHA POR FAVOR !");
        }



    }
    
    // funcion para pasar los estilos de este componente a la ventana a imprimir
    function copyStyles(src, dest) {
        Array.from(src.styleSheets).forEach(styleSheet => {
            dest.head.appendChild(styleSheet.ownerNode.cloneNode(true))
        })
        Array.from(src.fonts).forEach(font => dest.fonts.add(font))
    }




    //imprimir pedido del dia --------------------------------------------------------------------------------------------
    function imprimirPedidoDelDia () {  //esta funcion es llamada una vez que se renderizaron los cambios en la 'hoja' a imprimir



        //guardo el contenido html del div que quiero imprimir
        let contenidoAImprimir = refContenidoAImprimir.current.innerHTML

        //abro una nueva ventana
        const ventanaAImprimir = window.open('', '_blank', ''); 
        
        //creo un 'head' en su documento para poder pasarle los estilos
        ventanaAImprimir.document.open();
        ventanaAImprimir.document.write(`
       <html>
            <head>

            
            </head>

       </html>
       `);

        
        //copio los estilos definidos en este documento al documento de la ventana 
        copyStyles(document, ventanaAImprimir.document);

        //guardo el contenido html a imprimir en el body de la ventana
        ventanaAImprimir.document.body.innerHTML = contenidoAImprimir


        ventanaAImprimir.print(); //imprimo el contenido de la ventana

        ventanaAImprimir.close() //cierro la ventana despues de la impresion





    }
//-------------------------------------------------------------------------------------------------------------------


 

  return (

    <div>

    <Grid container className={estilos.root}>

        <Grid container className ={estilos.containerSuperior}>

            <Grid container className ={estilos.containerFecha}>
                <Grid container item ={true} xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha1} >

                    <Typography > Pedidos de la fecha :  </Typography>  

                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={6} className ={estilos.fecha2} >

                    <TextField type="date" InputLabelProps={{shrink: true,}} ref={calendario} onChange={cambiarFechaAImprimir}/>

                </Grid>
            </Grid>

                {/* hago un Grid container, para poder aplicar propiedades flexbox sobre el componente 'Typhography', que se comportará como un Grid item */} 
                {/* 'item = {true} ' sirve para eliminar el warning de la consola, que advierte que no se puede aplicar las
                propiedades 'xs, sm, md.. ' a un Grid container    */} 

            <Grid container className ={estilos.containerTitulos} >
                <Grid container item ={true} xs={6} sm={6} md={6} lg={6} xl={6} className ={estilos.titulo1} >

                    <Typography >CANTIDAD :</Typography>

                </Grid>
                <Grid container item ={true} xs={6} sm={6} md={6} lg={6} xl={6} className ={estilos.titulo2} >

                    <Typography >PRODUCTO :</Typography>

                </Grid>

            </Grid>

            <Grid item  ref={containerDeCargadas} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.cargadas}>



                {/* Recorro el array de las cargadas , y por cada cargada, renderizaré un componente '<Cargada/>'.
                React te sugiere asignar a la propiedad 'key', un valor único para cada componente renderizado, y como
                el valor de cada elemento del array es unico, utilizo el valor de cada elemento para asignar a cada propiedad 'key' */}

                {cantidadDeCargadas.map(item => (<Cargada  key={item}  />))   }


                    

            </Grid>

            

            <Grid container  item={true} xs={12} sm={12} md={12} lg={12} xl={12} className = {estilos.botonAgregarCargada}   >

                <Button variant = { 'contained'} color = {"primary"} onClick={() => agregarCargada()}>

                    <Typography >Agregar mas cargadas</Typography>

                </Button>

            </Grid>


        
        </Grid>



        <Grid container className = {estilos.containerInferior} >




            <Grid container className = {estilos.containerBotones} >

                    <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={guardarPedido}>
                        Cargar pedido y volver
                    </Button>   



                    <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={actualizarDatosParaImprimir}>
                        Imprimir
                    </Button>   


                <Link style={{ textDecoration: 'none'}} to="/principal">  
                    <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                        Volver sin Cargar Pedido
                    </Button>   
                </Link> 


                        


            </Grid>

        </Grid>        




      
    </Grid>




       {/* CONTENIDO QUE SERA IMPRESO -----------------------------------------------------------------------------------  */}



       <div  ref={refContenidoAImprimir} className = {estilos.contenidoAImprimir}>
           {/* los estilos de este div no se veran en la impresion, este div solo sirve para ocultar el contenido a imprimir
           en el explorador, porque solo debe verse en la impresion de la hoja */}


  
            <div className = {estilos.contenidoAImprimir2}>

                <div className = {estilos.tituloAImprimir}>
                
                    <h2>PEDIDO DEL DIA : {fechaAImprimir}</h2>

                </div> 


                <div className = {estilos.tituloAImprimir2}>
            
                    <div>
                        <h2>CANTIDAD :</h2>
                    </div>

                    <div>
                        <h2>PRODUCTO :</h2>
                    </div>
                    
  
                </div> 






                <div className = {estilos.listaAImprimir}>
                    
                

                    {



                    cargadasAImprimir.map(item => (

                        <div key={cargadasAImprimir.indexOf(item)}> 
                        {/* cada elemento a iterar e imprimir en pantalla, debe tener una propiedad 'key' unica */}


                            <h5 style={{fontFamily : 'courier', fontSize: 20}}>{item.cantidad + '.'.repeat(60 - ((item.producto).length + (item.cantidad).length ) ) + item.producto}</h5> 
                              {/* 'string.repeat()' repite una cadena tantas veces como se le indique en su argumento  */}

                        </div>

                        
        
                    ))

                    }


                </div>

            </div>

        </div>










    </div>





  );
  

}



export default RealizarPedido;

