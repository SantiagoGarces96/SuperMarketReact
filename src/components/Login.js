import React, {useState} from 'react';
import md5 from 'md5';
import {LogoContainer} from "./Narbar.elements";

import axios from 'axios';
import '../Css/Login.css';
import Admin from "../assets/img/Admin.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const navigate = useNavigate();


  const baseUrl="https://localhost:5001/api/Users";
 
  
  const [form, setForm]=useState({
    usename:"",
    passwor: ""
  });
    const handleChange=e=>{
   const {name, value} = e.target;
   setForm({
     ...form,
     [name]: value
   });
   console.log(form);
    }
  
    const iniciarSesion=async()=>{
      await axios.get(baseUrl+`/${form.usename}/${md5(form.passwor)}`)
      .then(response=>{
        return response.data;
      }).then(response=>{
        if(response.length>0){
          var respuesta=response[0];

        alert("Bienvenido: "+respuesta.names+" "+respuesta.surnames);
        navigate('/Navbar2');
      }else{
        alert('El usuario o la contraseña no son correctos');
      }
    })
    
    .catch(error=>{
      console.log(error);
    })
  }

  

    return (
        <div className="containerPrincipal">
        <div className="containerLogin">
          <div className="form-group">
          <LogoContainer> 
          <img src={Admin}  alt="Logotipo" className="  imagen"  />
            <p>Super </p> 
            <p>Market</p>
          </LogoContainer>
          <p ></p>
          <p ></p>
          <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="usename"
              onChange={handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="passwor"
              onChange={handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={iniciarSesion}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    );
}

export default Login;