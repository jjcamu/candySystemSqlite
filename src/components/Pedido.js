import React from 'react';
import { Grid, Button, Checkbox  } from '@material-ui/core' 
import { makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles({

    root: {

        display: 'flex',
        flexDirection: 'column',

    },

    tituloDia : {

        display: 'flex',   //reseteo flex para sobreescribir el flexDirection column
        justifyContent: 'center'

    },
    lista:{

        display: 'flex',   //reseteo flex para sobreescribir el flexDirection column
        justifyContent: 'center'

    }

})





function Pedido(props) {


    const estilos = useStyles()

                
    let fechaPedido = new Date(props.datosDelPedido.dia); 
    //invierto el string de la fecha, y lo convierto en un dato de tipo fecha 
    let dia = fechaPedido.getDay(); //obtengo el numero de dia de la semana
    let semana = ["Lunes", "Martes", "Miercoles" , "Jueves", "Viernes", "Sabado", "Domingo"];
    var nombreDia = (semana[dia]); //obtengo el nombre del dia de la semana
    




        return (


            <Grid container className = {estilos.root}>
            


            { props.mostrarFechaAnterior() != props.datosDelPedido.dia ?   //comparo las fechas.
            //esto lo hago para agrupar los pedidos de la misma fecha. Si el pedido anterior tiene distinta fecha al pedido actual,
            // entonces renderizo el pedido actual con la fecha y su checkbox. En caso de ser iguales, renderizo el pedido pero
            // sin la fecha y el checkbox.

                

                <Grid container>




                    <Grid container className = {estilos.tituloDia} >

                        {props.eliminarCheck != true ?  //si la propiedad ingresada 'eliminarCheck' no es true, se imprime el checkbox.

                            <Grid item   >
                                {/* checkbox */} 
                                <Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }}/>

                            </Grid>

                        : 

                            <Grid item > {/* //si 'eliminarCheck' es true, no se imprimira el checkbox */}
                                        {/* Grid item vacío.. */}
                            </Grid>
                        
                        }

                        <Grid item  >



                            <p style={{fontFamily : 'sans-serif', fontSize: 18, fontWeight : 'bold'}}>Pedido del dia :{ " " + nombreDia + " " + (props.datosDelPedido.dia).split("-").reverse().join("-")}</p>
                            {/* &nbsp; es un espacio en blanco en html */}
                            {/* '(props.datosDelPedido.dia).split("-").reverse().join("-")' toma la fecha que es un string, y la invierte de 'yyyy-mm-dd' a 'dd-mm-yyyy' */}

                                

                        </Grid>

                    </Grid>


                    <Grid container className = {estilos.lista} > 
     

                        <h5 style={{fontFamily : 'courier', fontSize: 17}}>{props.datosDelPedido.cantidad + '.'.repeat(60 - ((props.datosDelPedido.producto).length + (props.datosDelPedido.cantidad).length ) ) + props.datosDelPedido.producto}</h5> 
                              {/* 'string.repeat()' repite una cadena tantas veces como se le indique en su argumento  */}

                    </Grid>              

                        
                       

             
                        
                </Grid>

                    
  
                :

            
     
                <Grid container>
                       


                    <Grid container className = {estilos.lista}> 

                        <h5 style={{fontFamily : 'courier', fontSize: 17}}>{props.datosDelPedido.cantidad + '.'.repeat(60 - ((props.datosDelPedido.producto).length + (props.datosDelPedido.cantidad).length ) ) + props.datosDelPedido.producto}</h5> 
                                {/* 'string.repeat()' repite una cadena tantas veces como se le indique en su argumento  */}
     

                    </Grid>         

                </Grid>
                        

            }

            {props.nroPedido == props.pedidosTotales - 1 ?  //si es el ultimo componente pedido iterado
            

            props.guardarFecha(0)  //pongo la fecha anterior en cero

            :  // si no es el ultimo..

            props.guardarFecha(props.datosDelPedido.dia) //guardo la fecha anterior
            } 

            </Grid>
 
            

        );
    

 






    




    

}

export default Pedido;
