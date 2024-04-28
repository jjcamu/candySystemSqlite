import React, { useEffect, useState  }  from 'react';
import { Grid,  Select,  MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api





const useStyles = makeStyles({


    root: {
        flexGrow: 1,
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
        /* backgroundColor : 'green' */
        justifyContent : 'center'
    },

    gridItem2: {
        /* backgroundColor : 'green' */
        paddingRight : 50
    },




})

function Cargada() {


    const estilos = useStyles()

    


    // logica para mostrar los productos en los select ------------------------------------------------------------------

    const [arrayProductos, setArrayProductos] = useState([]) 

    useEffect(() => {

        const getProductos = async() => {
            const res = await axios.get('http://localhost:4000/api/productos')

            setArrayProductos(res.data)
            
          }

          getProductos()

          
          

  
    }, []);  //quité la dependencia arrayPedidos , para que no se vuelva a llamar indefinidamente a useEffect
    // esto provocará que solo se llame a useEffect en la primera renderizacion del componente


//-------------------------------------------------------------------------------------------------------------------------






    return (
        <div className={estilos.root}>


            <Grid container>

                <Grid container className={estilos.gridItem1} item={true} xs={6} sm={6} md={6} lg={6} xl={6} >

                    <Select className={estilos.select1} variant="outlined"  defaultValue=""  >
                        <MenuItem value={0.3}>1 tachada</MenuItem>
                        <MenuItem value={0.5}>1/2 cargada</MenuItem>
                        <MenuItem value={1}>1 cargada</MenuItem>

                    </Select>




                </Grid>


                <Grid item className={estilos.gridItem2} xs={6} sm={6} md={6} lg={6} xl={6}>


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
