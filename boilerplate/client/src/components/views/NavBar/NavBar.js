import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import CenterMenu from './Sections/CenterMenu';
import {Route, Link} from 'react-router-dom' 
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <Link to="/">우리 아이 밥심</Link>
      </div>
      
      <div className="menu_center">
        <CenterMenu mode="horizontal" />
      </div>
      
      <div className="menu__container">

        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer   // 화면 작아지면 나오는 메뉴
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar