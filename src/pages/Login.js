/// Pagina de 'login'

import React from 'react';
import {Button, TextField , Typography} from '@material-ui/core' 
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api

import md5 from 'md5' //para el cifrado de contraseñas
import Cookies from 'universal-cookie' //para almacenar la contraseña y que se encuentre al alcance de todas las paginas 

/// Defino los estilos

const useStyles = makeStyles({
    root : {
        display : 'flex', //aplico flexbox
        flexDirection: 'column',
        backgroundColor: 'gray',
        justifyContent : 'center',
        alignItems : 'center',
        height: '95vh'  //que ocupe casi todo el alto de la pantalla (100vh sería todo el alto)
        
    },

    cuadro :{ 
        display : 'flex',
        flexDirection: 'column',
        alignItems : 'center',
        //backgroundColor: 'green',

    },
    boton:{
      //backgroundColor: 'red',
      paddingTop: '50px'
    }
})





const Login = () => {


  const estilos = useStyles()

  const cookies = new Cookies(); // creo un objeto Cookies

  var objetoPass = {}  //creo un objeto 'objetoPass', ya que la peticion de 'axios' solo me permite enviar objetos, 
  //y no simples variables.



  const guardarPassword = (event) => {    
    
    objetoPass.pass = md5(event.target.value)   //guardo el password ingresado en el textfield en la propiedad 'pass'

  }



  async function procesarPassword(){

    // busco en la api el password ingresado
    await axios.post('http://localhost:4000/api/login' , objetoPass ).then(res => {   //cuando se cumpla la peticion...
               
      if(res.data.length != 0){  //si el array 'res.data' tiene algun elemento (osea, se encontró el password ingresado)


        cookies.set ("id", res.data[0]._id , {path: "/" })  //almaceno en la cookie el id del documento devuelto por la api

        window.location.href= '/principal'  //redirecciono a la pagina principal


      }else{
        window.alert('La contraseña ingresada no es correcta.')
      }


    });



  }



  return (
    <div className={estilos.root}>

        

        <div className={estilos.cuadro}>


          <div>
            <Typography>Ingrese la contraseña :</Typography>
          </div>
            
          <div>
            <TextField type="password" onChange={guardarPassword}  />
          </div>
          
          <div className={estilos.boton}>
            <Button onClick={procesarPassword} variant={'contained'} color={"primary"}>
                    Aceptar
            </Button>

          </div>




        </div>


    </div>
  );
}

export default Login;
