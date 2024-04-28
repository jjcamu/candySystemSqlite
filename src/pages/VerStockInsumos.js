import React, { useEffect, useRef, useState }  from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button, TextField, Modal , Typography } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid';  // para crear la tabla
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

    }

})


function VerStockInsumos() {


    const estilos = useStyles()

    let refGrid = useRef(null);  // referencia al dataGrid

    let refModalAgregarFila = useRef(null); //referencia a la ventana modal (cuadro de dialogo) de 'agregar nuevo insumo'


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

        
      ];

    //datos de prueba (para rellenar la tabla) --------------------------------------------------------------------------------

/*     const arrayInsumos = [   //datos que rellenan la tabla (filas)
        {
            id : 1,
            insumo: 'Propoleo',
            cantidad: '20',
            unidad: 'kg'
        },
        {
            id : 2,
            insumo: 'Glucosa',
            cantidad: '50',
            unidad: 'litros'
        },
        {
            id : 3,
            insumo: 'Azucar',
            cantidad: '120',
            unidad: 'kg'
        },
    ] */

    //traer datos de la tabla de insumos --------------------------------------------------------------------------------------

    const [arrayInsumos, setArrayInsumos] = useState([])
    const [permitirPeticion, setPermitirPeticion] = useState(true) // bandera que utilizo para bloquear las peticiones constantes a la api.
    


        useEffect(() => {
            if (permitirPeticion) { //para que no se llame indefinidamente a la funcion 'mostrarPedidos'
    
                    mostrarInsumos()
                  
    
            }
             
        }, [permitirPeticion]) //cada vez que cambie el estado de la bandera, se llamará a 'useEffect'
    
    
        function mostrarInsumos() { 
    
    
            axios.get('http://localhost:4000/api/insumos').then(res => {

                res.data.map((row, index) => row["id"] = index) //guardo en el campo 'id' de todas las filas, el indice .
                //Esto lo hago para que las filas queden enumeradas, y pueda utilizarse en el dataGrid.
                   
                setArrayInsumos(res.data)
                setPermitirPeticion(false)  // a diferencia del componente 'VerPedido.js', seteo la bandera desde aca, porque
                // al trabajar con peticiones y datagrids se producen 'delays' y no llega a cargarse el datagrid con los datos.
    
            });
    
        
    
        }
        
          

    //guardar en BBDD los cambios realizados en el Data Grid -------------------------------------------------------------------

    const guardarCambios = async (e) => {       /* esta funcion es 'async' , porque vamos a realizar una peticion asincrona */
       
        let arrayFilasDataGrid = refGrid.current.firstElementChild.firstChild.offsetParent.childNodes[1].children[1].children[0].children[0].children[0].children[0].children[0].children


        for (let x = 0; x < arrayFilasDataGrid.length; x++) { // itero todas las filas del dataGrid

            const nuevosDatos = {  //creo un objeto por cada fila
                //guardo el contenido de cada celda en la propiedad correspondiente

                _id: arrayInsumos[x]._id,  //recupero el _id asignado por mongoDB, y que luego guardé en 'arrayInsumos'.
                //Esto lo hago para que la fila modificada coincida con la fila original de la BBDD.
                // No confundir este campo '_id' con el campo 'id', que fue creado para poder utilizar el dataGrid.

                nombre: arrayFilasDataGrid[x].children[1].innerText,
                cantidad: parseFloat((arrayFilasDataGrid[x].children[2].innerText).replace(/.(?=\d{3})/g, '').replace(',', '.')),
                //con el primer metodo 'replace()' y su RegEx (expresion regular), quito el punto separador de miles (thousand)
                // para no tener conflictos con mongoDB, porque confunde el punto separador con el punto decimal.
                // con el segundo 'replace()' convierto la coma decimal en punto decimal, ya que parseFloat no reconoce la coma decimal.
                unidad: arrayFilasDataGrid[x].children[3].innerText
            }

            await axios.put('http://localhost:4000/api/insumos', nuevosDatos)

  


        }
       

    }

    //agregar fila a la tabla ---------------------------------------------------------------------------------------------

    const agregarInsumo = async (e) => {    
        
        if ((refModalAgregarFila.current.children[0].children[1].children[0].children[0].value).length != 0){

        
            const nuevoInsumo = {  
                nombre : refModalAgregarFila.current.children[0].children[1].children[0].children[0].value,    
                cantidad : refModalAgregarFila.current.children[1].children[1].children[0].children[0].value,  
                unidad : refModalAgregarFila.current.children[2].children[1].children[0].children[0].value,

            }
            
            await axios.post('http://localhost:4000/api/insumos', nuevoInsumo)

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

        let arrayFilasDataGrid = refGrid.current.firstElementChild.firstChild.offsetParent.childNodes[1].children[1].children[0].children[0].children[0].children[0].children[0].children

        for (let x = 0; x < arrayFilasDataGrid.length; x++) { // itero todas las filas del dataGrid
           
                if (arrayFilasDataGrid[x].children[0].children[0].children[0].children[0].checked == true){
                //si el checkbox de esa fila esta seleccionado..

                    let nombreDelInsumoAEliminar = arrayFilasDataGrid[x].children[1].innerText
                    // guardo el nombre del insumo de la fila cuyo checkbox esta seleccionado

                    arrayFilasDataGrid[x].children[0].children[0].children[0].children[0].checked = false
                    // deselecciono el checkbox

                    axios.delete('http://localhost:4000/api/insumos/' + nombreDelInsumoAEliminar).then(setPermitirPeticion(true))
                    // elimino todos los registros con ese nombre.
                    // luego de cumplirse la peticion, actualizo el contenido del dataGrid, invocando a 'setPermitirPeticion()'

                   
                } 
                       
       }

   }
  
    //--------------------------------------------------------------------------------------------------------------------




    return (


        <div>


        <Grid container className = {estilos.root}>

            <Grid container className = {estilos.containerSuperior}>


                <Grid item  xs={false} sm={1} md={3} lg={3} xl={3}>

                </Grid>    
                <Grid item  xs={12} sm={10} md={6} lg={6} xl={6} >

                            
                        <DataGrid    /* tabla editable */
                            rows={arrayInsumos}
                            columns={columnas}
                            ref={refGrid} 
                            //onStateChange={getInsumos} 
                            
                            checkboxSelection
                            disableSelectionOnClick

                
                        />
        
                
                </Grid>
                <Grid item  xs={false} sm={1} md={3} lg={3} xl={3}>

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


                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Imprimir
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
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


            <Grid item   className={estilos.modalItems} xs={12} sm={4} md={4} lg={4} xl={4}>

                <Typography>Insumo:</Typography>

                <TextField> </TextField>

            </Grid>

            <Grid item className={estilos.modalItems} xs={12} sm={4} md={4} lg={4} xl={4}>

                <Typography>Cantidad:</Typography>
                <TextField type="number" InputLabelProps={{ shrink: true, }} defaultValue={0} />

            </Grid>

            <Grid item className={estilos.modalItems} xs={12} sm={4} md={4} lg={4} xl={4}>

                <Typography>Unidad:</Typography>
                <TextField> </TextField>

            </Grid>

            <Grid item className={estilos.modalBotones} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button color='primary' onClick= {agregarInsumo}>Agregar Insumo</Button>
                <Button onClick= {nuevaFila} >Cancelar</Button>
            </Grid>

        </Grid>

        </Modal>




    </div>

    );


}

export default VerStockInsumos;
