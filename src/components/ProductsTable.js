import axios from 'axios';
import '../Css/ProductTable.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import { ModalFooter, ModalHeader, Modal, ModalBody } from 'react-bootstrap';
import { Label } from 'reactstrap';

function ProductsTable() {
   const baseUrl="https://localhost:5001/api/Products";
   const[data, setData]=useState([]);
   const [modalEditar, setModalEditar]=useState(false);
   const [modalInsertar, setModalInsertar]=useState(false);
   const [modalEliminar, setModalEliminar]=useState(false);
   const [productSeleccionado, setProductseleccionado]=useState({
    id: " ",
    name: " ",
    productElaborationDate: Date,
    productExpirationDate: Date,
    price:" ",
    description:" ",
    stock:" "

   })
   const handleChange=e=>{
       const{name, value}=e.target;
       setProductseleccionado({
           ...productSeleccionado,
           [name]: value
       });
       console.log(productSeleccionado);
   }

   const abrirCerrarModalInsertar=()=>{
       setModalInsertar(!modalInsertar);
   }

   const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

   const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

   const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
    setData(response.data);
    }).catch(error=>{
    console.log(error);
    })
    }

    const peticionPost=async()=>{
        delete productSeleccionado.id;
        await axios.post(baseUrl, productSeleccionado)
        .then(response=>{
          setData(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }
    
      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+productSeleccionado.id, productSeleccionado)
        .then(response=>{
          var respuesta=response.data;
          var dataAuxiliar=data;
          dataAuxiliar.map(product=>{
            if(product.id===productSeleccionado.id){
                product.nombre=respuesta.nombre;
                product.productElaborationDate=respuesta.productElaborationDate;
                product.productExpirationDate=respuesta.productExpirationDate;
                product.price=respuesta.price;
                product.description=respuesta.description;
                product.stock=respuesta.stock;
            }
          });
          abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }
  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+productSeleccionado.id)
    .then(response=>{
     setData(data.filter(product=>product.id!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarProduct=(product, caso)=>{
    setProductseleccionado(product);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

    useEffect(()=>{
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
                                <button className="btn btn-primary" onClick={()=>seleccionarProduct(product, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={()=>seleccionarProduct(product, "Eliminar")}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

           <Modal isOpen={modalInsertar}>
               <ModalHeader>Insertar producto</ModalHeader>
               <ModalBody>
                   <div className='form-group'>
                       <Label>Nombre: </Label>
                       <br />
                       <input type="text" className='form control' name="name" onChange={handleChange}/>
                       <br />
                       <Label>Fecha de expedicion del producto: </Label>
                       <br />
                       <input type="text" className='form control' name="productElaborationDate" onChange={handleChange}/>
                       <br />
                       <Label>Fecha de vencimiento del producto: </Label>
                       <br />
                       <input type="text" className='form control' name="productExpirationDate" onChange={handleChange}/>
                       <br />
                       <Label>Precio: </Label>
                       <br />
                       <input type="text" className='form control' name="price" onChange={handleChange}/>
                       <br />
                       <Label>Descripcion: </Label>
                       <br />
                       <input type="text" className='form control' name="description" onChange={handleChange}/>
                       <br />
                       <Label>Existencia: </Label>
                       <br />
                       <input type="text" className='form control' name="stock" onChange={handleChange}/>
                       <br />
                   </div>
               </ModalBody>
               <ModalFooter>
               
               <button className='btn btn-primary'onClick={()=>peticionPost()}>Editar</button> {" "}
                 <button className='btn btn-danger'onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
               </ModalFooter>
           </Modal>

           <Modal isOpen={modalEditar}>
      <ModalHeader>Editar Producto</ModalHeader>
      <ModalBody>
        <div className="form-group">
        <label>Id: </label>
          <br />
          <input type="text" className="form-control" readOnly value={productSeleccionado && productSeleccionado.id}/>
          <br />
          <Label>Nombre: </Label>
          <br />
          <input type="text" className='form control' name="name" onChange={handleChange}/>
          <br />
          <Label>Fecha de expedicion del producto: </Label>
          <br />
          <input type="text" className='form control' name="productElaborationDate" onChange={handleChange}/>
          <br />
          <Label>Fecha de vencimiento del producto: </Label>
          <br />
          <input type="text" className='form control' name="productExpirationDate" onChange={handleChange}/>
          <br />
          <Label>Precio: </Label>
          <br />
          <input type="text" className='form control' name="price" onChange={handleChange}/>
          <br />
          <Label>Descripcion: </Label>
          <br />
          <input type="text" className='form control' name="description" onChange={handleChange}/>
          <br />
          <Label>Existencia: </Label>
          <br />
          <input type="text" className='form control' name="stock" onChange={handleChange}/>
          <br />
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"   "}
        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
      </ModalFooter>
    </Modal>

    <Modal isOpen={modalEliminar}>
        <ModalBody>
        ¿Estás seguro que deseas eliminar el producto? {productSeleccionado && productSeleccionado.name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>peticionDelete()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>abrirCerrarModalEliminar()}
          >
            No
          </button>
        </ModalFooter>
      </Modal>
        </div>
  )
}

export default ProductsTable;