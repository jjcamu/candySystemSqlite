import React, {  useEffect, useRef, useState }  from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button, TextField, Modal , Typography } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import { DataGridPro, useGridApiRef } from '@mui/x-data-grid-pro';  // para crear la tabla

import axios from 'axios'  //modulo que me permite acceder a la api
import Cookies from 'universal-cookie' //para verificar si se ingreso correctamente la contraseña  

import ReactDOM from 'react-dom';
import Router from '../routes/Router';


var useStyles

if (window.innerWidth > 700){  //si la pantalla del dispositivo es mayor a 700 (por ej: una PC)

    useStyles = makeStyles({

    root: {
        flexGrow : 1 ,
        backgroundColor : 'gray',
        height: '95vh',  //que ocupe casi todo el alto de la pantalla
        
        
    },
    containerSuperior : {

   
        height : '70%',   
        display : 'flex',
        justifyContent: 'center',        
        width : '100%'

    },
    dataGrid:{

        minWidth: '60%'
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

        width : '150px', // establezco el mismo ancho para todos los botones (colocar la abreviacion 'px' !!)

        
    },
    containerModal : { // estos estilos se aplican al componente 'Modal' , que en realidad es el contenedor de la ventana.


        display : 'flex', //aplico flexbox
        width : '100%',  //el contenedor de la ventana ocupará todo el ancho y el alto de la pantalla
        height : '100%',
        justifyContent: 'center',  // la ventana quedará centrada vertical y horizontalmente dentro de su contenedor
        alignItems : 'center'

    },
    modalNuevaFila : {

        flexGrow : 1 ,
        justifyContent: 'center',  // centrar los elementos que estan dentro de la ventana
        width : 1000 ,  //ancho de la ventana
        backgroundColor : 'white', //color de fondo
        border : '2px solid #000',  //borde
        boxShadow : '10px 5px 5px black',  //sombreado
        padding : '16px 32px 24px 32px',  //margen interior

    },
    modalItems : {
        
        paddingBottom : 20,
        textAlign : 'center',
        //minWidth : '100%'

    

    },
    modalBotones : {
        display : 'flex',  //para que haga efecto el 'justify-content'
        justifyContent : 'space-evenly',
        //backgroundColor : 'green',

    },
    contenidoAImprimir:{  //estilo del div contenedor de la hoja a imprimir, para que no sea visible en el navegador.

        display: 'none',  //invisible
       
 
 
    },
    contenidoAImprimir2: {  // estilos de la hoja a imprimir -------------------------------------------------------------

        display: 'flex',
        flexDirection: 'column', 
        //transform: 'rotate(270deg)',  //rotar el 'div', para no tener que rotar la hoja a imprimir
        //padding : '100px'

    },
    tituloAImprimir: {

        textAlign: 'center',  //titulo centrado


    },

})
}else{

    useStyles = makeStyles({

        root: {

            backgroundColor : 'gray',
            height: '95vh',  //que ocupe casi todo el alto de la pantalla
            
            
        },
        containerSuperior : {

   
            height : '60%',   
            display : 'flex',
            justifyContent: 'center',        
            width : '100%',
            
        },
        dataGrid:{
            //scale: '0.5',
            //minWidth: '1400px',
            minWidth: '100%',

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
            height : '80%',  //todos los botones tendran el alto del container padre, (del container botones)
            width : '200px', // establezco el mismo ancho para todos los botones (colocar la abreviacion 'px' !!)
            margin: '5px',

            
        },
        containerModal : { // estos estilos se aplican al componente 'Modal' , que en realidad es el contenedor de la ventana.
    
    
            display : 'flex', //aplico flexbox
            width : '100%',  //el contenedor de la ventana ocupará todo el ancho y el alto de la pantalla
            height : '100%',
            justifyContent: 'center',  // la ventana quedará centrada vertical y horizontalmente dentro de su contenedor
            alignItems : 'center'
    
        },
        modalNuevaFila : {
    
            flexGrow : 1 ,
            justifyContent: 'center',  // centrar los elementos que estan dentro de la ventana
            width : 1000 ,  //ancho de la ventana
            backgroundColor : 'white', //color de fondo
            border : '2px solid #000',  //borde
            boxShadow : '10px 5px 5px black',  //sombreado
            padding : '16px 32px 24px 32px',  //margen interior
    
        },
        modalItems : {
            
            paddingBottom : 20,
            textAlign : 'center',
            //minWidth : '100%'
    
        
    
        },
        modalBotones : {
            display : 'flex',  //para que haga efecto el 'justify-content'
            justifyContent : 'space-evenly',
            //backgroundColor : 'green',
    
        },
        contenidoAImprimir:{  //estilo del div contenedor de la hoja a imprimir, para que no sea visible en el navegador.
    
            display: 'none',  //invisible
           
     
     
        },
        contenidoAImprimir2: {  // estilos de la hoja a imprimir -------------------------------------------------------------
    
            display: 'flex',
            flexDirection: 'column', 
            //transform: 'rotate(270deg)',  //rotar el 'div', para no tener que rotar la hoja a imprimir
            //padding : '100px'
    
        },
        tituloAImprimir: {
    
            textAlign: 'center',  //titulo centrado
    
    
        },
    
    })



}


function VerStockInsumos() {


    const estilos = useStyles()

    const cookies = new Cookies(); 

    const apiRef = useGridApiRef();  // interfaz para interactuar con el dataGrid

    let refModalAgregarFila = useRef(null); //referencia a la ventana modal (cuadro de dialogo) de 'agregar nuevo insumo'

    let refContenidoAImprimir = useRef(null)


    // Hook de estado
    // aca controlo el estado de la ventana modal (emergente) para agregar una nueva fila
    // a la tabla (un nuevo insumo)
    // false : ventana cerrada , true : abierta
    const [ventanaNuevaFila, setVentanaNuevaFila] = useState(false)


//columnas de la tabla -------------------------------------------------------------------------------------

    const columnas = [   
        
        {
          field: 'nombre',
          headerName: 'Insumo',
          width: 150,
          editable: true,

        },
        {
          field: 'cantidad',
          headerName: 'Cantidad',        
          width: 150,
          editable: true,
          type: 'number',
        },
        {
          field: 'unidad',
          headerName: 'Unidad',
          width: 150,
          editable: true,
        },
        {
            field: 'limite', // cantidad limite de insumo (una cantidad menor mostrará un cartel de advertencia)
            headerName: 'Limite',
            width: 150,
            editable: true,
            type: 'number',
        },

        
      ];



    //traer datos de la tabla de insumos --------------------------------------------------------------------------------------

    const [arrayInsumos, setArrayInsumos] = useState([])
    const [permitirPeticion, setPermitirPeticion] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.
    
    const [hojaAImprimir, setHojaAImprimir] = useState()



        useEffect(() => {
            if (permitirPeticion) { //para que no se hagan peticiones get indefinidamente
    
                axios.get(cookies.get('urlApi') + '/api/insumos').then(res => {

                    res.data.map((row, index) => row["id"] = index) //guardo en el campo 'id' de todas las filas, el indice .
                    //Esto lo hago para que las filas queden enumeradas, y pueda utilizarse en el dataGrid.
        
                    setArrayInsumos(res.data)

                    calcularHojasYColumnas(res.data)  //diseño la hoja de impresion segun los datos traidos de la BBDD

                    

                    setPermitirPeticion(false)  // seteo la bandera desde aca, porque
                    // al trabajar con peticiones y datagrids se producen 'delays' y no llega a cargarse el datagrid con los datos.
        
                });
                  
    
            }

            if (!cookies.get('id')){  //si no fue ingresada correctamente la contraseña, osea no se almacenó nada en la cookie 'id'...
                window.location.href = "/" //se redirigirá automaticamente al 'login'
            }
             
        }, [arrayInsumos, permitirPeticion, hojaAImprimir]) //cada vez que cambie el estado de la bandera, se llamará a 'useEffect'
    
    
        
          

    //guardar en BBDD los cambios realizados en el Data Grid -------------------------------------------------------------------

    const guardarCambios = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       

        // guardo el numero total de filas del dataGrid
        let cantidadFilasDataGrid = apiRef.current.getRowsCount() 


        for (let x = 0; x < cantidadFilasDataGrid; x++) { // itero todas las filas del dataGrid


            const nuevosDatos = {  //creo un objeto por cada fila
                //guardo el contenido de cada celda en la propiedad correspondiente

                _id: arrayInsumos[x]._id,  //recupero el _id asignado por mongoDB, y que luego guardé en 'arrayInsumos'.
                //Esto lo hago para que la fila modificada coincida con la fila original de la BBDD.
                // No confundir este campo '_id' con el campo 'id', que fue creado para poder utilizar el dataGrid.

               
                nombre: await apiRef.current.getRow(x).nombre, //tomo el valor guardado en la fila 'x' columna 'nombre', y lo guardo en la propiedad 'nombre'
                cantidad: await apiRef.current.getRow(x).cantidad,
                unidad: await apiRef.current.getRow(x).unidad,
                limite: await apiRef.current.getRow(x).limite,
                
            }

            await axios.put(cookies.get('urlApi') + '/api/insumos', nuevosDatos)

  


        }
       

    }

    //agregar fila a la tabla ---------------------------------------------------------------------------------------------

    const agregarInsumo = async (e) => {    
        
        if ((refModalAgregarFila.current.children[0].children[1].children[0].children[0].value).length != 0){

        
            const nuevoInsumo = {  
                nombre : refModalAgregarFila.current.children[0].children[1].children[0].children[0].value,    
                cantidad : refModalAgregarFila.current.children[1].children[1].children[0].children[0].value,  
                unidad : refModalAgregarFila.current.children[2].children[1].children[0].children[0].value,
                limite : refModalAgregarFila.current.children[3].children[1].children[0].children[0].value,
            }
            
            await axios.post(cookies.get('urlApi') + '/api/insumos', nuevoInsumo)

            setVentanaNuevaFila(!ventanaNuevaFila) // cierro la ventana modal seteando el estado 'ventanaNuevaFila'

            setPermitirPeticion(true)  // actualizo el contenido del dataGrid  

        }else{

            
            window.alert("INGRESE UN NOMBRE DE INSUMO POR FAVOR !");
        }

    }


    const nuevaFila = () => {   //desde esta funcion, manejo el estado de la ventana modal 

    setVentanaNuevaFila(!ventanaNuevaFila) 

    }


    /// Eliminar insumo ----------------------------------------------------------------------------------------------

    const eliminarInsumo = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */

        // guardo en un mapa, todas las filas seleccionadas en el dataGrid
        let filasSeleccionadas = apiRef.current.getSelectedRows()

        for (var [key, value] of filasSeleccionadas) { //recorro las filas seleccionadas
        //'key' corresponde al numero de fila del dataGrid que fue seleccionada, 
        //y 'value' es el contenido de la fila en forma de objeto (ej: 'value.nombre' es el dato ingresado en el campo 'nombre')

            //console.log(key + " = " + value.nombre); 

            let _idDelInsumoAEliminar = arrayInsumos[key]._id
            //Almaceno el campo '_id' de la fila seleccionada. (tener en cuenta que los indices de los elementos de 'arrayInsumos' 
            //coinciden con el numero de fila del dataGrid)
            //(tambien, tener en cuenta que el dataGrid esta mostrando el contenido de 'arrayInsumos', 
            //el cual a su vez tiene almacenado el campo _id de cada fila).
            //Decidí eliminar el insumo segun su _id, ya que en la tabla insumos pueden repetirse los nombres de los insumos
            //en mas de una fila, pero nunca se repite el valor del campo _id.

            axios.delete(cookies.get('urlApi') + '/api/insumos/' + _idDelInsumoAEliminar).then(setPermitirPeticion(true))
            // elimino el registro con ese _id. (solo puede haber uno)
            // luego de cumplirse la peticion, actualizo el contenido del dataGrid, invocando a 'setPermitirPeticion()'
        }


    }


    // calculo de hojas y columnas a imprimir --------------------------------------------------------------------------



    function calcularHojasYColumnas(array){

        if (refContenidoAImprimir.current.children[1] != undefined){

            //elimino el contenido a imprimir de lista anterior, para que pueda ser sustituido por la nueva lista
            refContenidoAImprimir.current.children[1].innerHTML = ""

        }

        var contenidoAImprimir = refContenidoAImprimir.current

        //calculo la cantidad de hojas a imprimir, segun la cantidad de registros en 'array', y teniendo en cuenta que
        //se mostrarán hasta 100 registros por hoja
        var cantidadHojas =  Math.ceil(array.length / 100) // 100 registros por hoja
        //Math.ceil() redondea el resultado hacia arriba, osea si es 1.2 , devuelve 2.

        var cantidadColumnasPorHoja = 2  //habran 2 columnas por hoja

        var pepe = 0

        var registro,  divRegistro


        if (array != undefined){

            for (let z = 0; z < cantidadHojas; z++){

                    var divHoja = document.createElement("div") //creo un elemento div de forma dinamica (en tiempo de ejecucion)
                    divHoja.style.display = 'flex' //defino sus estilos
                    divHoja.style.flexDirection = 'row'
                    divHoja.style.justifyContent = 'space-around'
                    divHoja.style.marginBottom = '100px'

        

                    for (let y = 0; y < cantidadColumnasPorHoja; y++){

                        var divColumna = document.createElement("div")
                        divColumna.style.display = 'flex'
                        divColumna.style.flexDirection = 'column'
                        //divColumna.style.backgroundColor = 'green'



                        for (let x = pepe; x < pepe + 50 ; x++){

                            if (array[x] != undefined){  // si no hay mas registros, no entre al bloque

                                divRegistro = document.createElement("div")

                                divRegistro.style.fontFamily = 'courier'
                                divRegistro.style.fontSize = '10px'

                                registro = <h5 >{array[x].nombre + '.'.repeat(65 - ((array[x].nombre).length + ((array[x].cantidad).toString()).length + (array[x].unidad).length )) + array[x].cantidad + ' ' + array[x].unidad} </h5>

                                divRegistro.innerHTML = registro.props.children
                                //guardo el contenido html de 'registro' en el 'divRegistro'

                            

                                divColumna.appendChild(divRegistro) //meto el divRegistro en el divColumna
                            }

                        }

                        pepe = pepe + 50 //para ir corriendo el 'for' 50 lugares, osea mostrar los siguientes 50 registros


                        divHoja.appendChild(divColumna)
                
                    }

                    contenidoAImprimir.appendChild(divHoja)



            }

        }


    }




   //funcion de imprimir --------------------------------------------------------------------------------------

   function imprimirInsumos(){



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
  
    //--------------------------------------------------------------------------------------------------------------------




    return (


        <div>


        <Grid container className = {estilos.root}>

            <Grid container className = {estilos.containerSuperior}>



                <Grid item className = {estilos.dataGrid}  >

                            
                        <DataGridPro    /* tabla editable */
                            
                            rows={arrayInsumos}
                            columns={columnas}

                            apiRef={apiRef}  // para interactuar con el dataGrid desde javascript

                            
                            checkboxSelection
                            disableSelectionOnClick

                
                        />
        
                
                </Grid>
 

            </Grid>


            

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >

                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick = {guardarCambios}>
                            Guardar Cambios
                        </Button>   



                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={nuevaFila}>
                            Agregar Nuevo Insumo
                        </Button>   



                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={eliminarInsumo}>
                            Eliminar Insumo<br /> Seleccionado
                        </Button>   


  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick={imprimirInsumos}>
                            Imprimir
                        </Button>   


                    <Link style={{ textDecoration: 'none'}} to="/principal">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} >
                            Volver
                        </Button>   
                    </Link>                                 


                </Grid>
                
            </Grid>
           

        </Grid>



        {/* Ventana Modal para agregar nuevo insumo */}

        <Modal className={estilos.containerModal}
        open={ventanaNuevaFila}  /* aca ingreso el estado del cual depende la apertura o cierre de la ventana  */
        onClose={nuevaFila}    /* funcion a la que debera llamarse para el cierre de la ventana */
        
        >

        <Grid container ref = {refModalAgregarFila} className={estilos.modalNuevaFila}>


            <Grid item   className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                <Typography>Insumo:</Typography>

                <TextField> </TextField>

            </Grid>

            <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                <Typography>Cantidad:</Typography>
                <TextField type="number" InputLabelProps={{ shrink: true, }} defaultValue={0} />

            </Grid>

            <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                <Typography>Unidad:</Typography>
                <TextField> </TextField>

            </Grid>

            <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                <Typography>Cantidad Limite del Insumo:</Typography>
                <TextField type="number" InputLabelProps={{ shrink: true, }} defaultValue={0} />

            </Grid>

            <Grid item className={estilos.modalBotones} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button color='primary' onClick= {agregarInsumo}>Agregar Insumo</Button>
                <Button onClick= {nuevaFila} >Cancelar</Button>
            </Grid>

        </Grid>

        </Modal>




        {/* CONTENIDO QUE SERA IMPRESO -----------------------------------------------------------------------------------  */}



       <div  ref={refContenidoAImprimir} className = {estilos.contenidoAImprimir} >
           {/* los estilos de este div no se veran en la impresion, este div solo sirve para ocultar el contenido a imprimir
           en el explorador, porque solo debe verse en la impresion de la hoja */}


  
            <div className = {estilos.contenidoAImprimir2}>

                <div className = {estilos.tituloAImprimir}>
                    
                    <h2>INSUMOS ORDENADOS ALFABETICAMENTE : </h2>
                    
                </div> 






            </div>

        </div>




    </div>

    );


}

export default VerStockInsumos;
