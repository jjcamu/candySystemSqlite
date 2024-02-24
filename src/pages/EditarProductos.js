import React , {useState} from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button , Select,  MenuItem, TextField, Modal , Typography} from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid';  // para crear la tabla




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
        //backgroundColor : 'green',

    }

})





function EditarProductos() {


     
    const estilos = useStyles()

    // Hook de estado
    // aca controlo el estado de la ventana emergente (modal)
    // false : ventana cerrada , true : abierta

    const [ventanaNuevoProducto, setVentanaNuevoProducto] = useState(false)

    const [ventanaNuevaFila, setVentanaNuevaFila] = useState(false)


    // aca almaceno el tipo de unidad segun el insumo seleccionado en la ventana modal 'Agregar Nueva Fila'

    const [ estadoUnidad, setEstadoUnidad ] = useState('');




    const nuevoProducto = () => {  //desde esta funcion, manejo el estado de la ventana modal

        setVentanaNuevoProducto(!ventanaNuevoProducto) //invierto el valor del estado, osea, si es false lo convierto a true,
        // y viceversa. Esto me sirve para abrir o cerrar la ventana.

    }

    const nuevaFila = () => {  //desde esta funcion, manejo el estado de la ventana modal (ventana 'Agregar Nueva Fila')

        setVentanaNuevaFila(!ventanaNuevaFila) 

    }

    const cambiarUnidad = (e) => {

        setEstadoUnidad(e.target.value)
    }






    //datos obtenidos de la tabla de Productos
    var arrayTablaProductos = ['Propoleo con miel', 'Caramentol', 'Propoleo con Eucalipto']


    // datos obtenidos de la tabla de Insumos
    var arrayTablaInsumos = [
        {
            id : 1,
            insumo: 'Propoleo',
            cantidad: '2000',
            unidad: 'litros'
        },
        {
            id : 2,
            insumo: 'Miel',
            cantidad: '6000',
            unidad: 'kg'
        },
        {
            id : 3,
            insumo: 'Mentol',
            cantidad: '980',
            unidad: 'gramos'
        },

    ]


    const arrayTablaConsumos = [   //(filas) datos obtenidos de la tabla de Consumos, que rellenaran las filas del DataGrid
        {
            id : 1,
            productoId: 1,  // prop con miel
            insumoId: 2,
            consumoPorTachada: '20',
            devolverUnidad: function() {return arrayTablaInsumos[this.insumoId -1].unidad  },

            
       
        },
        {
            id : 2,
            productoId: 1,  //prop con miel
            insumoId: 3,
            consumoPorTachada: '10',
            devolverUnidad: function() {return arrayTablaInsumos[this.insumoId -1].unidad  },

        
          
        },
        {
            id : 3,
            productoId: 2, // caramentol
            insumoId: 1,
            consumoPorTachada: '55.3',
            devolverUnidad: function() {return arrayTablaInsumos[this.insumoId -1].unidad  },


            
        },
    ]


 

    const columnas = [   //columnas de la tabla
        
        {
            field: 'producto',
            headerName: 'Producto',
            width: 200,
            renderCell: (indice) => (
                <Select defaultValue={arrayTablaConsumos[indice.id - 1].productoId - 1}>

                    {/* 'defaultValue' es un valor numerico que indica que item del combobox debe mostrarse por defecto.
                    indice.id devuelve el numero de fila que esta iterando, y '-1' es para que coincida con los elementos
                    del array de 'arrayTablaProductos'.  'arrayTablaProductos[indice.id - 1].productoId' devuelve el id del
                    producto, que es un numero igual o mayor que 1. 
                    '-1' es para que ese id del producto coincida con los elementos del array 'arrayProductos'. */}

                    {arrayTablaProductos.map((producto , index) => (<MenuItem key={index} value={index}>{producto}</MenuItem>))} 
                 

                </Select>
              )


        },
        {
            field: 'insumo',
            headerName: 'Insumo',
            width: 200,
            renderCell: (indice) => (
                <Select defaultValue={arrayTablaConsumos[indice.id - 1].insumoId - 1}>

                    {arrayTablaInsumos.map((item , index) => (<MenuItem key={index} value={index}>{item.insumo}</MenuItem>))} 

                </Select>
              )
        },
        {
            field: 'consumoPorTachada',
            headerName: 'Consumo por tachada',        
            width: 240,
            editable: true,
            type: 'number',
        },
        {
            field: 'unidad',
            headerName: 'Unidad',        
            width: 150,
            editable: false,
            renderCell: (indice) => (

                arrayTablaConsumos[indice.id -1].devolverUnidad()
              )
        },

        
      ];




      

    return (


    <div>


        <Grid container className = {estilos.root}>

            


            <Grid container className = {estilos.containerSuperior}>


                <Grid item  xs={false} sm={1} md={1} lg={1} xl={1}>

                </Grid>    
                <Grid item  xs={12} sm={10} md={10} lg={10} xl={10} >



                            
                        <DataGrid    /* tabla editable */
                            rows={arrayTablaConsumos}
                            columns={columnas}
                            
                            checkboxSelection
                            disableSelectionOnClick

                
                        />
        

                </Grid>
                <Grid item  xs={false} sm={1} md={1} lg={1} xl={1}>

                </Grid>    

            </Grid>


            

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >
                    <Link  style={{ textDecoration: 'none'}} to="/">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Guardar Cambios
                        </Button>   
                    </Link> 


                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick = {nuevaFila}>
                            Agregar Nueva Fila
                        </Button>   


                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Eliminar Fila Seleccionada
                        </Button>   
                    </Link> 

                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"} onClick = {nuevoProducto}>
                            Agregar Nuevo Producto
                        </Button>   
                    

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Imprimir
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
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

                    <Grid container className={estilos.modal}>
                        <Grid item >
                            <h2>Nuevo Producto:</h2>
                        </Grid>

                        <Grid item className={estilos.modalTextfield} >
                            <TextField className={estilos.modalTextfield} label='ingrese nombre del producto'></TextField>
                        </Grid>

                        <Grid item>
                            <Button color='primary' >Aceptar</Button>
                            <Button>Cancelar</Button>
                        </Grid>

                    </Grid>

                </Modal>


                {/* Ventana Modal para agregar nueva fila */}

                <Modal className={estilos.containerModal}
                    open={ventanaNuevaFila}  /* aca ingreso el estado del cual depende la apertura o cierre de la ventana  */
                    onClose={nuevaFila}    /* funcion a la que debera llamarse para el cierre de la ventana */
                >

                    <Grid container className={estilos.modalNuevaFila}>

                    
                        <Grid item  className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>
                            
                            <Typography>Producto:</Typography>

                            <Select className={estilos.modalInputsNuevaFila} defaultValue="">

                                {arrayTablaProductos.map((producto , index) => (<MenuItem key={index} value={index}>{producto}</MenuItem>))} 

                            </Select>
                       
                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>
                            
                            <Typography>Insumo:</Typography>
                            <Select className={estilos.modalInputsNuevaFila} defaultValue="" onChange = {cambiarUnidad}>

                                {arrayTablaInsumos.map((item , index) => (<MenuItem key={index} value={item.unidad}>{item.insumo}</MenuItem>))} 

                            </Select>
                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>

                            <Typography>Consumo por tachada:</Typography>
                            <TextField type="number"  InputLabelProps={{shrink: true,}}/>

                        </Grid>

                        <Grid item className={estilos.modalItems} xs={12} sm={3} md={3} lg={3} xl={3}>
                            
                            <Typography style = {{paddingBottom : '7px'}}>Unidad:</Typography>  {/* este paddingBotton es solo una correccion estetica */}
                            <Typography>{estadoUnidad}</Typography>
                            

                        </Grid>

                        <Grid item className = {estilos.modalBotones} xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button color='primary' >Agregar Fila</Button>
                            <Button>Cancelar</Button>
                        </Grid>

                    </Grid>

                </Modal>

        </Grid>









    </div>


  );
}

export default EditarProductos;
