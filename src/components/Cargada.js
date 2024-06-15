import React, { useEffect, useState  }  from 'react';
import { Grid,  Select,  MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api
import Cookies from 'universal-cookie' //para verificar si se ingreso correctamente la contraseña  


var useStyles

if (window.innerWidth > 700){  //si la pantalla del dispositivo es mayor a 700 (por ej: una PC)

    useStyles = makeStyles({


        root: {

            padding : 10,

        },

        select1: {

            minWidth: '50%',
            backgroundColor: 'white'
        },

        select2: {

            minWidth: '100%',
            backgroundColor: 'white'
        },

        gridItem1: {
            display: 'flex',
            justifyContent : 'center',           
            width : '50%'
            
        },

        gridItem2: {

            paddingRight : 50,           
            width : '50%'
        },

    })

}else {

    useStyles = makeStyles({

        select1: {

            minWidth: '100%',
            scale: '0.8',
            backgroundColor: 'white'
        },

        select2: {

            minWidth: '100%',
            scale: '0.8',
            backgroundColor: 'white'
        },

        gridItem1: {

            width : '35%'
        },

        gridItem2: {
            width : '65%'
        },

    })

}

function Cargada() {


    const estilos = useStyles()

    const cookies = new Cookies();

    // logica para mostrar los productos en los select ------------------------------------------------------------------

    const [arrayProductos, setArrayProductos] = useState([]) 

    useEffect(() => {

        const getProductos = async() => {
            const res = await axios.get(cookies.get('urlApi') + '/api/productos')

            setArrayProductos(res.data)
            
          }

          getProductos()

          
          

  
    }, []);  //quité la dependencia arrayPedidos , para que no se vuelva a llamar indefinidamente a useEffect
    // esto provocará que solo se llame a useEffect en la primera renderizacion del componente


//-------------------------------------------------------------------------------------------------------------------------






    return (
        <div className={estilos.root}>


            <Grid container className={estilos.container}>

                <Grid item className={estilos.gridItem1}  >

                    <Select className={estilos.select1} variant="outlined"  defaultValue=""  >
                        <MenuItem value={0.3}>1 tachada</MenuItem>
                        <MenuItem value={0.5}>1/2 cargada</MenuItem>
                        <MenuItem value={1}>1 cargada</MenuItem>

                    </Select>




                </Grid>


                <Grid item className={estilos.gridItem2}>


                    <Select className={estilos.select2} variant="outlined"  defaultValue=""  >
                    {
                        arrayProductos.map(datos => ( <MenuItem key={arrayProductos.indexOf(datos)} 
                        value={arrayProductos.indexOf(datos)} >{datos.nombre}</MenuItem> ))
                    }

                    </Select>



                </Grid>






            </Grid>














           

        </div>

    
    );
}

export default Cargada;
