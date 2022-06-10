import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { ModalFooter, ModalHeader, Modal, ModalBody } from 'react-bootstrap';
import { Label } from 'reactstrap';

function ProductsTable() {
   const baseurl="https://localhost:5001/api/Products";
   const[data, setData]=useState([]);
   const[modalInsertar, setModalInsertar]=useState(false);
   const [productseleccionado, setProductseleccionado]=useState({
    name: " ",
    productElaborationDate: " ",
    productExpirationDate:" ",
    price:" ",
    description:" ",
    stock:" "

   })
   const handleChange=e=>{
       const{name, value}=e.target;
       setProductseleccionado({
           ...productseleccionado,
           [name]: value
       });
       console.log(productseleccionado);
   }

   const abrirCerrarModalInsertar=()=>{
       setModalInsertar(!modalInsertar);
       console.log(modalInsertar)
   }

   
   const peticionGet=async()=>{
    await axios.get(baseurl)
    .then(response=>{
    setData(response.data);
    }).catch(error=>{
    console.log(error);
    })
    }

    const peticionPost=()=>{
        delete productseleccionado.id;
        axios.get(baseurl, productseleccionado)
        .then(response=>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
            }).catch(error=>{
            console.log(error);
            })
    }
    useEffect(()=>{
        console.log("effect")
        peticionGet();
        },[])
  return (
    <div className='ProductsTable'>
        <br></br>
        <button onClick={()=>abrirCerrarModalInsertar()} className="btn btn-success">Nuevo Producto</button>
        <br></br>
            <table className="table table-bordered">
                <thead>
                    <tr>
                   
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Fecha de expedicion del producto</th>
                            <th>Fecha de vencimiento del producto</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Existencia</th>
                            <th>Contenedor</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        
                        data.map(product=>(
                            <tr key={product.id}>
                                
                                <td>{product.id}</td>                 
                                <td>{product.name}</td>
                                <td>{product.productElaborationDate}</td>
                                <td>{product.productExpirationDate}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button className='btn btn-primary'>Editar</button>
                                <button className='btn btn-danger'>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

           <Modal isOpen={modalInsertar}>
               <ModalHeader>Insertar Gestor de Base de Datos </ModalHeader>
               <ModalBody>
                   <div className='form-group'>
                       <Label>Nombre: </Label>
                       <br />
                       <input type="test" className='form control' name="name" onChange={handleChange}/>
                       <br />
                       <Label>Fecha de expedicion del producto: </Label>
                       <br />
                       <input type="test" className='form control' name="productElaborationDate" onChange={handleChange}/>
                       <br />
                       <Label>Fecha de vencimiento del producto: </Label>
                       <br />
                       <input type="test" className='form control' name="productExpirationDate" onChange={handleChange}/>
                       <br />
                       <Label>Precio: </Label>
                       <br />
                       <input type="test" className='form control' name="price" onChange={handleChange}/>
                       <br />
                       <Label>Descripcion: </Label>
                       <br />
                       <input type="test" className='form control' name="description" onChange={handleChange}/>
                       <br />
                       <Label>Existencia: </Label>
                       <br />
                       <input type="test" className='form control' name="stock" onChange={handleChange}/>
                       <br />
                   </div>
               </ModalBody>
               <ModalFooter>
               <button className='btn btn-primary'onClick={()=>peticionPost()}>Editar</button>
                 <button className='btn btn-danger'onClick={()=>abrirCerrarModalInsertar()}>Cerrar</button>
               </ModalFooter>
           </Modal>
        </div>
  )
}

export default ProductsTable