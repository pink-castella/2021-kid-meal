/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom'
import './Navbar.css'

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode} className="icon_bg">
        <Menu.Item key="login">
          <Link to="/login">
            <Icon type="user" style={{ fontSize: 30 }} />
          </Link>
        </Menu.Item>
      </Menu>      
    )
  } else {
    return (      
      <Menu mode={props.mode} className="icon_bg">
      <Menu.Item key="shop">
        <Link to="/cart">
          <Icon type="shopping-cart" style={{ fontSize: 30 }} />
        </Link>
      </Menu.Item>
      <Menu.Item key="heart">
        <Link to="/favorite">
          <Icon type="heart" style={{ fontSize: 30 }} />
        </Link>
      </Menu.Item>
      <Menu.Item key="mypage">
      <Link to="/mypage">
          <Icon type="user" style={{ fontSize: 30 }} />
        </Link>
      </Menu.Item>
    </Menu>      
    )
  }
}

export default withRouter(RightMenu);

