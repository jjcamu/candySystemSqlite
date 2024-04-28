import React from 'react';
import { Grid, Button, Checkbox  } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles({

    root: {
        flexGrow : 1 ,
        //backgroundColor: 'green'

    },
    itemSuperior : {

        justifyContent : 'center',
        //backgroundColor: 'red'
          

    },
    itemInferior : {

        


    },
    check : {
        paddingLeft : '10%',
        //backgroundColor: 'white'
    }
})





function Pedido(props) {


    const estilos = useStyles()




        return (


            <Grid container className = {estilos.root}>
            


            { props.mostrarFechaAnterior() != props.datosDelPedido.dia ?   //comparo las fechas.
            //esto lo hago para agrupar los pedidos de la misma fecha. Si el pedido anterior tiene distinta fecha al pedido actual,
            // entonces renderizo el pedido actual con la fecha y su checkbox. En caso de ser iguales, renderizo el pedido pero
            // sin la fecha y el checkbox.

                

                <Grid container>

                    <Grid item className = {estilos.check} xs={12} sm={3} md={3} lg={3} xl={3} >
                        {/* checkbox */} 
                        <Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>

                    </Grid>

                    <Grid item className = {estilos.itemSuperior}  xs={12} sm={9} md={9} lg={9} xl={9}>

                        <p >Pedido de la fecha: {props.datosDelPedido.dia}</p>
                        

                        

                    </Grid>


                    <Grid container item = {true} className = {estilos.itemInferior} xs={12} sm={12} md={12} lg={12} xl={12}> 

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <p>Cantidad: {props.datosDelPedido.cantidad}</p>
                        </Grid> 

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <p>Producto: {props.datosDelPedido.producto}</p>                        
                        </Grid>       

                    </Grid>              

                        
                       

             
                        
                </Grid>

                    
  
                :

            
     
                <Grid container>
                       
                    <Grid item>

                        

                    </Grid>

                    <Grid container item = {true} className = {estilos.itemInferior} xs={12} sm={12} md={12} lg={12} xl={12}> 

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <p>Cantidad: {props.datosDelPedido.cantidad}</p>
                        </Grid> 

                        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                            <p>Producto: {props.datosDelPedido.producto}</p>                        
                        </Grid>       

                    </Grid>         

                </Grid>
                        

            }

            {props.guardarFecha(props.datosDelPedido.dia)}

            </Grid>
 
            

        );
    

 






    




    

}

export default Pedido;
