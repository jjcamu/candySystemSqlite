import React from 'react';
import { Link } from 'react-router-dom';  // para poder enlazar a otras paginas de manera mas fluida desde un button
import { Grid, Button } from '@material-ui/core' 
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

        
    }
})


function VerStockInsumos() {


    const estilos = useStyles()





    const columnas = [   //columnas de la tabla
        
        {
          field: 'insumo',
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
      

    const filas = [   //datos que rellenan la tabla (filas)
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
    ]

    return (



        <Grid container className = {estilos.root}>

            <Grid container className = {estilos.containerSuperior}>


                <Grid item  xs={false} sm={1} md={3} lg={3} xl={3}>

                </Grid>    
                <Grid item  xs={12} sm={10} md={6} lg={6} xl={6} >

                            
                        <DataGrid    /* tabla editable */
                            rows={filas}
                            columns={columnas}
                            
                            checkboxSelection
                            disableSelectionOnClick

                
                        />
        

                </Grid>
                <Grid item  xs={false} sm={1} md={3} lg={3} xl={3}>

                </Grid>    

            </Grid>


            

            <Grid container className = {estilos.containerInferior} >

                <Grid container className = {estilos.containerBotones} >
                    <Link  style={{ textDecoration: 'none'}} to="/">  
                        <Button  className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Guardar Cambios
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Agregar Nuevo Insumo
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Eliminar Insumo<br /> Seleccionado
                        </Button>   
                    </Link> 

                    <Link style={{ textDecoration: 'none'}} to="/">  
                        <Button className = {estilos.boton} variant = { 'contained'} color = {"primary"}>
                            Buscar
                        </Button>   
                    </Link> 

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


        </Grid>

  );
}

export default VerStockInsumos;
