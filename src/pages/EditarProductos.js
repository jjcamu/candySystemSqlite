import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button , Select,  MenuItem, TextField, Modal , Typography} from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import { DataGrid  } from '@material-ui/data-grid';  // para crear la tabla
import axios from 'axios'  //modulo que me permite acceder a la api





const useStyles = makeStyles({

    root: {
        flexGrow : 1 ,
        backgroundColor : 'gray',
        height: '95vh',  //que ocupe casi todo el alto de la pantalla
        

    },
    containerSuperior : {//grid container que contiene 3 grid items, de los cuales 2 sirven para centrar el grid item de la tabla.

   
        height : '70%'             

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

    modal : {  // estilos de la ventana emergente


        justifyContent: 'center',  // centrar los elementos que estan dentro de la ventana
        width : 400 ,  //ancho de la ventana
        backgroundColor : 'white', //color de fondo
        border : '2px solid #000',  //borde
        boxShadow : '10px 5px 5px black',  //sombreado
        padding : '16px 32px 24px 32px',  //margen interior

    },
    modalTextfield : {
        width : '100%',
        paddingBottom : 10


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
    modalInputsNuevaFila : {
        
        width : '90%'


    },
    modalBotones : {
        display : 'flex',  //para que haga efecto el 'justify-content'
        justifyContent : 'space-evenly',
        

    },


})


function EditarProductos() {


     
    const estilos = useStyles()

    let refDataGrid = useRef(null);  // referencia al dataGrid

    let refModalAgregarFila = useRef(null);  //referencia a la ventana modal (cuadro de dialogo) de 'agregar nueva fila'

    let refModalAgregarProducto = useRef(null); //ref a la ventana modal de agregar nuevo producto

    let refModalEliminarProducto = useRef(null); //ref a la ventana modal para eliminar un producto


    //traer datos de la tabla de consumos --------------------------------------------------------------------------------------

        const [arrayConsumos, setArrayConsumos] = useState([])
        const [permitirPeticion, setPermitirPeticion] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.
    
        useEffect(() => {
            if (permitirPeticion) { // para que la peticion no se ejecute indefinidamente.
    
                axios.get('http://localhost:4000/api/consumos').then(res => {

                    res.data.map((row, index) => row["id"] = index) //guardo en el campo 'id' de todas las filas, el indice .
                    //Esto lo hago para que las filas queden enumeradas, y pueda utilizarse en el dataGrid.
                    setArrayConsumos(res.data)
                    setPermitirPeticion(false)//bloquear la peticion a la api una vez que obtengo los datos.
                });
    
            }
        }, [arrayConsumos, permitirPeticion])
    //agrego como dependencia a 'permitirPeticion' , para que al setear dicho estado, se active el 'useEffect' y recargue el
    //contenido del dataGrid.
    
    //traer datos de la tabla de productos --------------------------------------------------------------------------------------

    const [arrayProductos, setArrayProductos] = useState([])
    const [permitirPeticion2, setPermitirPeticion2] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.

    useEffect(() => {
        if (permitirPeticion2) { // para que la peticion no se ejecute indefinidamente.

            axios.get('http://localhost:4000/api/productos').then(res => {
                setArrayProductos(res.data)
                setPermitirPeticion2(false)//bloquear la peticion a la api una vez que obtengo los datos.
            });

        }
    }, [arrayProductos, permitirPeticion2])

        //traer datos de la tabla de insumos --------------------------------------------------------------------------------------

        const [arrayInsumos, setArrayInsumos] = useState([])
        const [permitirPeticion3, setPermitirPeticion3] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.
    
        useEffect(() => {
            if (permitirPeticion3) { // para que la peticion no se ejecute indefinidamente.
    
                axios.get('http://localhost:4000/api/insumos').then(res => {
                    
                    setArrayInsumos(res.data)
                    setPermitirPeticion3(false)//bloquear la peticion a la api una vez que obtengo los datos.
                });
    
            }
        }, [arrayInsumos])



    //guardar en BBDD los cambios realizados en el Data Grid -------------------------------------------------------------------

    const guardarCambios = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       
        let arrayFilasDataGrid = refDataGrid.current.firstElementChild.firstChild.offsetParent.childNodes[1].children[1].children[0].children[0].children[0].children[0].children[0].children


        for (let x = 0; x < arrayFilasDataGrid.length; x++) { // itero todas las filas del dataGrid

            const nuevosDatos = {  //creo un objeto por cada fila
                //guardo el contenido de cada celda en la propiedad correspondiente
                _id: arrayConsumos[x]._id,  //recupero el _id asignado por mongoDB, y que luego guardé en 'arrayConsumos'
                //esto lo hago para que la fila modificada coincida con la fila original de la BBDD.
                // No confundir este campo '_id' con el campo 'id', que fue creado para poder utilizar el dataGrid.
                producto: arrayFilasDataGrid[x].children[1].innerText,
                insumo: arrayFilasDataGrid[x].children[2].innerText,
                consumoPorTachada: (arrayFilasDataGrid[x].children[3].innerText).replace(/,(?=\d{3})/g, ''), //con el metodo 'replace()'
                //quito la coma separadora de miles para no tener conflictos con mongoDB, y ademas convierto el string en numero.
                unidadInsumo: arrayFilasDataGrid[x].children[4].innerText
            }
            console.log(nuevosDatos.consumoPorTachada)
            
            await axios.put('http://localhost:4000/api/consumos', nuevosDatos)

  


        }
       

    }

    //agregar fila a la tabla ---------------------------------------------------------------------------------------------

    const agregarFila = async (e) => {    


        if ( (refModalAgregarFila.current.children[0].children[1].children[1].value).length != 0 && 
        (refModalAgregarFila.current.children[1].children[1].children[1].value).length != 0  ){  
        // si se selecciono un producto y un insumo, se procede con el ingreso de una nueva fila..


            const nuevaFila = {  
                producto : refModalAgregarFila.current.children[0].children[1].children[0].innerText,    
                insumo : refModalAgregarFila.current.children[1].children[1].children[0].innerText,    
                consumoPorTachada : refModalAgregarFila.current.children[2].children[1].children[0].children[0].value,
                unidadInsumo : refModalAgregarFila.current.children[3].children[1].innerText
            }
            

            await axios.post('http://localhost:4000/api/consumos', nuevaFila)

            setVentanaNuevaFila(!ventanaNuevaFila) // cierro la ventana modal seteando el estado 'ventanaNuevaFila'

            setPermitirPeticion(true)  // actualizo el contenido del dataGrid

         }else{

            window.alert("ELIJA UN PRODUCTO Y UN INSUMO POR FAVOR !");
        } 

    }

        
    //agregar nuevo producto a la tabla productos -------------------------------------------------------------------------------

        const agregarProducto = async (e) => {    
        
            if ((refModalAgregarProducto.current.children[1].children[0].children[1].children[0].value).length != 0){

                const nuevoProducto = {  
                    nombre : refModalAgregarProducto.current.children[1].children[0].children[1].children[0].value,    

                }
                
                await axios.post('http://localhost:4000/api/productos', nuevoProducto)

                setVentanaNuevoProducto(!ventanaNuevoProducto) // cierro la ventana modal seteando el estado 'ventanaNuevoProducto'

                setPermitirPeticion2(true) //actualizo los productos en los select, porque vuelvo a consultar la BBDD

            }else{
                
                window.alert("ESCRIBA EL NOMBRE DEL PRODUCTO POR FAVOR !");
            }
    }

    //eliminar producto de la tabla productos -------------------------------------------------------------------------------

    const eliminarProducto = async (e) => {    



        if ((refModalEliminarProducto.current.children[1].children[0].children[1].value).length != 0){
    
            let nombreDelProductoAEliminar = refModalEliminarProducto.current.children[1].children[0].children[0].innerText

            axios.delete('http://localhost:4000/api/productos/' + nombreDelProductoAEliminar)
            .then(setPermitirPeticion2(true))
            .then(setVentanaEliminarProducto(!ventanaEliminarProducto))
            // elimino el producto con el nombre indicado.
            // luego de cumplirse la peticion, actualizo el contenido del 'setArrayProductos' invocando a 'setPermitirPeticion2(true)'.
            // Cierro la ventana modal seteando el estado 'ventanaEliminarProducto'

        }else{
                    
            window.alert("ELIJA UN PRODUCTO POR FAVOR !");
        } 


    }



    //columnas de la tabla -------------------------------------------------------------------------------------

    var columnas = [   
        
        {
          field: 'producto',
          headerName: 'Producto',
          width: 250,
          renderCell: (indice) => (
            <Select key={arrayProductos.indexOf(arrayProductos.find((element) => element.nombre == arrayConsumos[indice.id].producto))}
            defaultValue={arrayProductos.indexOf(arrayProductos.find((element) => element.nombre == arrayConsumos[indice.id].producto))}>
{/*     'arrayProductos.find((element) => element.nombre == arrayConsumos[indice.id].producto' busca un elemento en el 'arrayProductos'
    cuyo nombre coincida con el nombre del producto del 'arrayConsumos' , y lo devuelve como resultado.
    Luego 'arrayProductos.indexOf()' muestra el indice correspondiente al elemento devuelto.
    'defaultValue' es un valor numerico que indica que item del combobox debe mostrarse por defecto.
    'indice.id' devuelve el numero de fila que esta iterando.
    La prop 'key' recibe el mismo valor que la prop 'defaultValue', por alguna razon, esto fuerza el desmontaje del componente, y 
    vuelve a montarlo con un nuevo 'defaultValue' (el que yo le estoy ingresando) */}
                {
                arrayProductos.map(datos => ( <MenuItem key={arrayProductos.indexOf(datos)} 
                    value={arrayProductos.indexOf(datos)} >{datos.nombre}</MenuItem> ))
                }
            </Select>
            
            )

        },
        {
          field: 'insumo',
          headerName: 'Insumo',        
          width: 200,
          renderCell: (indice) => (
            <Select key={arrayInsumos.indexOf(arrayInsumos.find((element) => element.nombre == arrayConsumos[indice.id].insumo))}
            defaultValue={arrayInsumos.indexOf(arrayInsumos.find((element) => element.nombre == arrayConsumos[indice.id].insumo))}
            name = {(indice.id).toString()} onChange ={mostrarUnidad}>
            {/* cada vez que elijo una opcion diferente del select, llamo a la funcion 'mostrarUnidad'.
            Guardo en la prop 'name' el numero de fila, para identificar de que fila es el select que emite el evento 'onChange' */}
                {
                arrayInsumos.map(datos => ( <MenuItem key={arrayInsumos.indexOf(datos)} 
                    value={arrayInsumos.indexOf(datos)} >{datos.nombre}</MenuItem> ))
                }
            </Select> )
        },
        {
          field: 'consumoPorTachada',
          headerName: 'Consumo por tachada',
          width: 150,
          editable: true,
          type: 'number',
          valueFormatter: (value) => {
            if (value == null) {
              return '';
            }
            return value.row.consumoPorTachada.toLocaleString('en-US'); // convierto el punto separador de miles (.)
            // en la coma utilizada en Estados Unidos como separador de miles, para luego (en el metodo 'guardarCambios')
            // quitar esa coma, ya que desconozco como sacar el punto separador.
            //Todo esto lo hago para no tener conflictos con mongoDB a la hora de trabajar con numeros.
          }


        },
        {
          field: 'unidadInsumo',//los nombres de los 'fields' DEBEN coincidir con los nombres de los campos del Schema del modelo.
          headerName: 'Unidad',        
          width: 150,
          editable: false,


           
        }

        
      ];
    

    // Hook de estado
    // aca controlo el estado de la ventana emergente (modal)
    // false : ventana cerrada , true : abierta

    const [ventanaNuevoProducto, setVentanaNuevoProducto] = useState(false)

    const [ventanaEliminarProducto, setVentanaEliminarProducto] = useState(false)

    const [ventanaNuevaFila, setVentanaNuevaFila] = useState(false)


    // aca almaceno el tipo de unidad segun el insumo seleccionado en la ventana modal 'Agregar Nueva Fila'

    const [ estadoUnidadVentanaModal, setEstadoUnidadVentanaModal ] = useState('');

  



    const nuevoProducto = () => {  //desde esta funcion, manejo el estado de la ventana modal

        setVentanaNuevoProducto(!ventanaNuevoProducto) //invierto el valor del estado, osea, si es false lo convierto a true,
        // y viceversa. Esto me sirve para abrir o cerrar la ventana.

    }

    const eliminacionProducto = () => {  //desde esta funcion, manejo el estado de la ventana modal

        setVentanaEliminarProducto(!ventanaEliminarProducto) 

    }


    const nuevaFila = () => {   //desde esta funcion, manejo el estado de la ventana modal (ventana 'Agregar Nueva Fila')

        setVentanaNuevaFila(!ventanaNuevaFila) 

    }

    const mostrarUnidadVentanaModal = (e) => {

        setEstadoUnidadVentanaModal(e.target.value)  //guardo en el estado 'estadoUnidadVentanaModal' la unidad correspondiente
        //al insumo seleccionado en la ventana modal.
    }




    function mostrarUnidad(e){
        try {  //con try-catch puedo prevenir errores por alguna variable 'undefined'
            
            
            let unidad = arrayInsumos[e.target.value].unidad  //tomo la unidad correspondiente al insumo elegido en el select
            refDataGrid.current.firstElementChild.firstChild.offsetParent.childNodes[1].children[1].children[0].children[0].children[0].children[0].children[0].children[parseInt(e.target.name)].children[4].innerText = unidad
            //almaceno en la celda del DataGrid ,cuya fila corresponde a la del select que emitió el evento, 
            //la unidad correspondiente al insumo elegido en el select

          } catch { //si existe alguna variable indefinida (ej : debido a la demora de la resolucion de una promesa),
            //el programa no se detiene por el error, sino que envio un mensaje por consola.
            console.log("variable no definidas");
          }

    }





    return (


        <div>


            <Grid container className={estilos.root}>




                <Grid container className={estilos.containerSuperior}>


                    <Grid item xs={false} sm={1} md={1} lg={1} xl={1}>

                    </Grid>
                    <Grid item xs={12} sm={10} md={10} lg={10} xl={10} >



                        <DataGrid    /* tabla editable */
                            rows={arrayConsumos}
                            columns={columnas}
                            ref={refDataGrid} 

                            checkboxSelection
                            disableSelectionOnClick

                        />

                    </Grid>
                    <Grid item xs={false} sm={1} md={1} lg={1} xl={1}>

                    </Grid>

                </Grid>




                <Grid container className={estilos.containerInferior} >

                    <Grid container className={estilos.containerBotones} >
                        
                            <Button className={estilos.boton} variant={'contained'} color={"primary"} onClick = {guardarCambios}>
                                Guardar Cambios
                                </Button>
                        


                        <Button className={estilos.boton} variant={'contained'} color={"primary"} onClick={nuevaFila}>
                            Agregar Nueva Fila
                                </Button>


                        <Link style={{ textDecoration: 'none' }} to="/">
                            <Button className={estilos.boton} variant={'contained'} color={"primary"}>
                                Eliminar Fila Seleccionada
                                </Button>
                        </Link>

                        <Button className={estilos.boton} variant={'contained'} color={"primary"} onClick={nuevoProducto}>
                            Agregar Nuevo Producto
                                </Button>

                        <Button className={estilos.boton} variant={'contained'} color={"primary"} onClick={eliminacionProducto}>
                            Eliminar Producto
                        </Button>


                        <Link style={{ textDecoration: 'none' }} to="/">
                            <Button className={estilos.boton} variant={'contained'} color={"primary"}>
                                Imprimir
                                </Button>
                        </Link>

                        <Link style={{ textDecoration: 'none' }} to="/">
                            <Button className={estilos.boton} variant={'contained'} color={"primary"}>
                                Volver
                                </Button>
                        </Link>


                    </Grid>

                </Grid>


                {/* Estructura de la Ventana emergente (modal). 
                        En esta ventana se ingresaran los datos para crear un nuevo producto a la Tabla de Productos */}

                <Modal className={estilos.containerModal}
                    open={ventanaNuevoProducto}  /* aca ingreso el estado del cual depende la apertura o cierre de la ventana  */
                    onClose={nuevoProducto}    /* funcion a la que debera llamarse para el cierre de la ventana */
                >

                    <Grid container  ref = {refModalAgregarProducto} className={estilos.modal}>
                        <Grid item >
                            <h2>Nuevo Producto:</h2>
                        </Grid>

                        <Grid item className={estilos.modalTextfield} >
                            <TextField className={estilos.modalTextfield} label='ingrese nombre del producto'></TextField>
                        </Grid>

                        <Grid item>
                            <Button onClick = {agregarProducto} color='primary' >Aceptar</Button>
                            <Button onClick={nuevoProducto}>Cancelar</Button>
                        </Grid>

                    </Grid>

                </Modal>





                {/* Estructura de la Ventana emergente (modal) para eliminar un producto */}

                <Modal className={estilos.containerModal}
                    open={ventanaEliminarProducto}  /* aca ingreso el estado del cual depende la apertura o cierre de la ventana  */
                    onClose={eliminacionProducto}    /* funcion a la que debera llamarse para el cierre de la ventana */
                >

                    <Grid container  ref = {refModalEliminarProducto} className={estilos.modal}>
                        <Grid item >
                            <h2>Elija el Producto a Eliminar:</h2>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >

                            <Select defaultValue=""  className={estilos.modalTextfield} >

                                {arrayProductos.map((producto, index) => (<MenuItem key={index} value={index}>{producto.nombre}</MenuItem>))}

                            </Select>

                        </Grid>

                        <Grid item>
                            <Button onClick = {eliminarProducto} color='primary' >Eliminar</Button>
                            <Button onClick={eliminacionProducto}>Cancelar</Button>
                        </Grid>

                    </Grid>

                </Modal>





                {/* Ventana Modal para agregar nueva fila */}

                <Modal className={estilos.containerModal}
                    open={ventanaNuevaFila}  /* aca ingreso el estado del cual depende la apertura o cierre de la ventana  */
                    onClose={nuevaFila}    /* funcion a la que debera llamarse para el cierre de la ventana */
                    
                >

                    <Grid container ref = {refModalAgregarFila} className={estilos.modalNuevaFila}>


                        <Grid item   className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                            <Typography>Producto:</Typography>

                            <Select className={estilos.modalInputsNuevaFila} defaultValue="">

                                {arrayProductos.map((producto, index) => (<MenuItem key={index} value={index}>{producto.nombre}</MenuItem>))}

                            </Select>

                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                            <Typography>Insumo:</Typography>
                            <Select className={estilos.modalInputsNuevaFila} defaultValue="" onChange={mostrarUnidadVentanaModal}>

                                {arrayInsumos.map((insumo, index) => (<MenuItem key={index} value={insumo.unidad}>{insumo.nombre}</MenuItem>))}
                               {/*  guardo en 'value' la unidad del insumo, para ser utilizada en la funcion 'mostrarUnidadVentanaModal' , 
                                debido a que el valor de 'value' viaja dentro del evento 'onChange' hacia la mencionada funcion. */}
                            </Select>
                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                            <Typography>Consumo por tachada:</Typography>
                            <TextField type="number" InputLabelProps={{ shrink: true, }} defaultValue={0} />

                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                            <Typography style={{ paddingBottom: '7px' }}>Unidad:</Typography>  {/* este paddingBotton es solo una correccion estetica */}
                            <Typography>{estadoUnidadVentanaModal}</Typography>


                        </Grid>

                        <Grid item className={estilos.modalBotones} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button color='primary' onClick= {agregarFila}>Agregar Fila</Button>
                            <Button onClick= {nuevaFila} >Cancelar</Button>
                        </Grid>

                    </Grid>

                </Modal>

            </Grid>









        </div>


    );
}

export default EditarProductos;


