import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { ModalFooter, ModalHeader, Modal, ModalBody } from 'react-bootstrap';
import { Label } from 'reactstrap';

function Client() {
   const baseurl="https://localhost:5001/api/Clients";
   const[data, setData]=useState([]);
   const[modalInsertar, setModalInsertar]=useState(false);
   const [clientseleccionado, setClientseleccionado]=useState({
    name: " ",
    address: " ",
    cellPhoneNumber:" "

   })
   const handleChange=e=>{
       const{name, value}=e.target;
       setClientseleccionado({
           ...clientseleccionado,
           [name]: value
       });
       console.log(clientseleccionado);
   }

   const abrirCerrarModalInsertar=()=>{
       setModalInsertar(!modalInsertar);
   }

   
   const peticionGet=async()=>{
    await axios.get(baseurl)
    .then(response=>{
    setData(response.data);
    }).catch(error=>{
    console.log(error);
    })
    }

    const peticionPost=async()=>{
        delete clientseleccionado.id;
        await axios.get(baseurl, clientseleccionado)
        .then(response=>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
            }).catch(error=>{
            console.log(error);
            })
    }
    useEffect(()=>{
        peticionGet();
        },[])
  return (
    <div className='Client'>
        <br></br>
        <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success mb-3">Nuevo Cliente</button>
        <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr>
                   
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Numero de celular</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        
                        data.map(client=>(
                            <tr key={client.id}>
                                
                                <td>{client.id}</td>                 
                                <td>{client.name}</td>
                                <td>{client.address}</td>
                                <td>{client.cellPhoneNumber}</td>
                
                                <td>
                                    <button className='btn btn-primary'>Editar</button>{" "}
                                <button className='btn btn-danger'>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

           <Modal isOpen={modalInsertar}>
               <ModalHeader>Insertar Cliente de Base de Datos </ModalHeader>
               <ModalBody>
                   <div className='form-group'>
                       <Label>Nombre: </Label>
                       <br />
                       <input type="test" className='form control' name="name" onChange={handleChange}/>
                       <br />
                       <Label>Direccion: </Label>
                       <br />
                       <input type="test" className='form control' name="address" onChange={handleChange}/>
                       <br />
                       <Label>Numero de celular: </Label>
                       <br />
                       <input type="test" className='form control' name="cellPhoneNumber" onChange={handleChange}/>
                       <br />
                       
                   </div>
               </ModalBody>
               <ModalFooter>
               <button className='btn btn-primary'onClick={()=>peticionPost()}>Editar</button>{" "}
                 <button className='btn btn-danger'onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
               </ModalFooter>
           </Modal>
        </div>
  )
}

export default Client