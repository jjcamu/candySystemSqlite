import React from 'react';
import { Grid, Button, Typography, Select,  MenuItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles' // para personalizar los estilos de un elemento





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

    return (
        <div className={estilos.root}>


            <Grid container>

                <Grid container className={estilos.gridItem1} item={true} xs={6} sm={6} md={6} lg={6} xl={6} >

                    <Select className={estilos.select1} variant="outlined"  defaultValue="">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>



                </Grid>


                <Grid item className={estilos.gridItem2} xs={6} sm={6} md={6} lg={6} xl={6}>


                    <Select className={estilos.select2} variant="outlined"  defaultValue="">
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>



                </Grid>






            </Grid>
















        </div>
    );
}

export default Cargada;
