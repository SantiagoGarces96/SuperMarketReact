import React from "react";
import Navbar2 from "../components/Navbar2";
import {Route, Routes } from "react-router-dom";
import Products from "../pages/Products";
import Users from "../pages/Users";
import Clients from "../pages/clients";
import Product from "../components/Product";

function Routers() {
  return (
    <div className="flex">
      <div className="content w-100">
      
      <Routes>

          <Route path="product" element={<Product></Product>}></Route>
          <Route path="clients" element={<Clients></Clients>}></Route>
          <Route path="Products" element={<Products></Products>}></Route>
          <Route path="Users" element={<Users></Users>}></Route>
          <Route path= "Navbar2" element={<Navbar2/>}></Route><Route/>
          

          
        <Route path="/" element={<Users />}></Route>
        </Routes>
    

        
      </div>
      <div></div>
    </div>
  );
}

export default Routers;
