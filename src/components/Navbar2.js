import React, { useState } from "react";
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./Narbar.elements";
import Admin from "../assets/img/Admin.png";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaShoppingBag,
  FaBriefcase,
} from "react-icons/fa";
import { IconContext } from "react-icons";

const Navbar2 = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <LogoContainer> 
          <img src={Admin}  alt="Logotipo" className="  imagen"  />
            <p>Super </p> 
            <p >Market</p>
          </LogoContainer>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink href="/products">
                <div>
                  <FaShoppingBag /> Productos 
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink href="/Clients">
                <div>
                  <FaBriefcase />
                  Clientes
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div>
                  <FaBriefcase />
                    Factura
                </div>
              </MenuItemLink>
            </MenuItem>
            
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Navbar2;
