/// Pagina de 'login'

import React, {  useState, useEffect }  from 'react';
import {Button, TextField , Typography} from '@material-ui/core' 
import LinearProgress from "@material-ui/core/LinearProgress";  // barra de progreso
import {makeStyles} from '@material-ui/core/styles' // para personalizar los estilos de un elemento
import axios from 'axios'  //modulo que me permite acceder a la api

import md5 from 'md5' //para el cifrado de contraseñas
import Cookies from 'universal-cookie' //para almacenar la contraseña y que se encuentre al alcance de todas las paginas 

import { useHistory } from "react-router-dom" // otra manera de redirigir a una pagina

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
    },
    espera:{
      margin: '30px',
      minWidth : '150px',
      color: 'darkred'

    },
    barra: {
      minWidth : '150px',
    },
    textoProgreso:{
      textAlign : 'center',
      paddingBottom: '20px'
    }
})





const BarraConTexto = () => {   
//Componente que renderiza una barra de progreso


  const estilos = useStyles()


      //progreso de la barra
      const [progreso, setProgreso] = useState(5);

      useEffect(() => {
        const timer = setInterval(() => {
          setProgreso((prev) => (prev >= 100 ? 100 : prev + 5));
        }, 2000); // cada 2 seg se actualiza el estado 'progreso'
        return () => {
          clearInterval(timer);
        };
      }, []);

  return(

  <div >

    <LinearProgress className={estilos.barra} variant='determinate' value={progreso} />  {/* barra de progreso de material ui */}
    
    <Typography  className={estilos.textoProgreso} variant="body2" color="textSecondary">{`${Math.round(progreso)}%`}</Typography>
  
  </div>

  )
}




const Login = () => {


  const estilos = useStyles()

  let history = useHistory() // otra forma de redirigir a una pagina 

  const cookies = new Cookies(); // creo un objeto Cookies

  var objetoPass = {}  //creo un objeto 'objetoPass', ya que la peticion de 'axios' solo me permite enviar objetos, 
  //y no simples variables.



  const [mostrarBarra, setMostrarBarra] = useState(false)

  const [espera, setEspera] = useState(' ')



  cookies.set ('urlApi', 'https://candysystembackend.onrender.com' , {path: "/" })  //almaceno en una cookie 
  //la url de la api, para ser accedida desde todas las paginas



  const guardarPassword = (event) => {    
    
    objetoPass.pass = md5(event.target.value)   //convierto con cifrado md5 el password ingresado en el textfield , 
    // y lo guardo en la propiedad 'pass'


  }





  async function procesarPassword(){

    setEspera('Espere unos segundos por favor...')

    setMostrarBarra(true)  

   
    // busco en la api el password ingresado

    await axios.post(cookies.get('urlApi') + '/api/login' , objetoPass ).then(res => {   //cuando se cumpla la peticion...
               
      if(res.data.length != 0){  //si el array 'res.data' tiene algun elemento (osea, se encontró el password ingresado)


        cookies.set ("id", res.data[0]._id , {path: "/" })  //almaceno en la cookie el id del documento devuelto por la api


        setMostrarBarra(false)
        //window.location.href= '/principal'  //redirecciono a la pagina principal
        history.push("/principal") 

      }else{
        window.alert('La contraseña ingresada no es correcta.')

        setEspera(' ')

        setMostrarBarra(false)
      }


    });





  }


  function comprobarTeclaEnter(e){

    if(e.keyCode == 13){  //si se presiono la tecla Enter

      procesarPassword()

    }


  }



  return (
    <div className={estilos.root}>

        

        <div className={estilos.cuadro}>



          <div className={estilos.espera}>  <Typography> {espera} </Typography></div>


          { mostrarBarra ? <BarraConTexto  /> : null }   {/* si el estado 'mostrarBarra' es 'true', renderizo el componente, sino es 'null' */}



          <div>
            <Typography>Ingrese la contraseña :</Typography>
          </div>
            
          <div>
            <TextField type="password" onChange={guardarPassword} onKeyDown={comprobarTeclaEnter} />
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
