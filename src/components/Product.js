import React, { Component } from 'react';
import '../Css/Product.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="https://localhost:5001/api/Products";

class Product extends Component {
state={
  data:[],
  modalInsertar: false,
  modalEliminar: false,
  form:{
    name: " ",
    productElaborationDate: Date,
    productExpirationDate: Date,
    price:" ",
    description:" ",
    stock:" "
  }
}

peticionGet=()=>{
axios.get(url).then(response=>{
  this.setState({data: response.data});
}).catch(error=>{
  console.log(error.message);
})
}

peticionPost=async()=>{
  delete this.state.form.id;
 await axios.post(url,this.state.form).then(response=>{
  this.setState({data: response.data});
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  })
}

peticionPut=()=>{
  axios.put(url+this.state.form.id, this.state.form).then(response=>{
    this.modalInsertar();
    this.peticionGet();
    this.setState({data: response.data});
  })
}

peticionDelete=()=>{
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
    this.setState({data: response.data});
  })
}

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

seleccionarProdcut=(product)=>{
  this.setState({
    tipoModal: 'actualizar',
    form: {
    id: product.id,
    name: product.name,
    productElaborationDate: product.productElaborationDate,
    productExpirationDate: product.productExpirationDate,
    price: product.price,
    description: product.description,
    stock: product.stock
    }
  })
}

handleChange=async e=>{
e.persist();
await this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value
  }
});

console.log(this.state.form);
}

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    const {form}=this.state;
  return (
    <div className="App">
    <br /><br /><br />
  <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Producto</button>
  <br /><br />
    <table className="table ">
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
        {this.state.data.map(product=>{
          return(
            <tr key={product.id}>
           <td>{product.id}</td>                 
           <td>{product.name}</td>
           <td>{product.productElaborationDate}</td>
          <td>{product.productExpirationDate}</td>
           <td>{product.price}</td>
           <td>{product.description}</td>
          <td>{product.stock}</td>
          <td>
                <button className="btn btn-primary" onClick={()=>{this.seleccionarProduct(product); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{this.seleccionarProduct(product); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
          </tr>
          )
        })}
      </tbody>
    </table>



    <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                    
                    <label htmlFor="id">Id</label>
                    <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                    <br />
                    <label htmlFor="name">Nombre</label>
                    <input className="form-control" type="text" name="name"  onChange={this.handleChange} value={form?form.name: ''}/>
                    <br />
                    <label htmlFor="productElaborationDate">Fecha de expedicion del producto</label>
                    <input className="form-control" type="text" name="productElaborationDate"  onChange={this.handleChange} value={form?form.productElaborationDate: ''}/>
                    <br />
                    <label htmlFor="productExpirationDate">Fecha de vencimiento del producto</label>
                    <input className="form-control" type="text" name="productExpirationDate"  onChange={this.handleChange} value={form?form.productExpirationDate:''}/>
                    <br />
                    <label htmlFor="price">Precio</label>
                    <input className="form-control" type="text" name="price"  onChange={this.handleChange} value={form?form.price:''}/>
                    <br />
                    <label htmlFor="description">Existencia</label>
                    <input className="form-control" type="text" name="description"  onChange={this.handleChange} value={form?form.description:''}/>
                    <br />
                    <label htmlFor="stock">Contenedor</label>
                    <input className="form-control" type="text" name="stock"  onChange={this.handleChange} value={form?form.stock:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  {this.state.tipoModal=== 'insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
               Estás seguro que deseas eliminar el producto {form && form.name}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
  </div>



  );
}
}
export default Product;
