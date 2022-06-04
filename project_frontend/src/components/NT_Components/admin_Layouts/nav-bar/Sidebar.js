import React ,{useState}from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
const Nav = styled.div`
  background: #28282B;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #28282B;
  width: 280px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

export default function Sidebar() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(sidebar);
  
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> */}
             <a class="navbar-brand" href="#!"><span style={{color: "#5e9693"}}>Reasearch</span><span style={{color: "#fff"}}>Management</span></a> 

            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index}/>;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  )
}
