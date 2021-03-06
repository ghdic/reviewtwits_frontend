import React, {useContext} from 'react';
import styled from "styled-components";
import {Link, useHistory} from "react-router-dom";
import dashboard_icon from '../images/dashboard_icon.png'
import project_icon from '../images/project_icon.png'
import classnames from "classnames";
import {logout} from "../auth/firebaseAuth";
import {UserContext} from "./AuthProvider";

const NavigatorStyled = styled.div`
  position: fixed;
  width: 300px;
  top: 0;
  left: 0;
  height: 100%;
  background: var(--blue);
  border-left: 10px solid var(--blue);
  transition: 0.5s;
  overflow: hidden;
  
  &.active {
    width: 80px;
  }

  .img_icon img {
    width: 60px;
    padding: 15px;
  }
  
  ul {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0;
    
    & li {
      position: relative;
      width: 100%;
      list-style: none;
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
      
      &.active {
        background: var(--blue2)
      }
      
      & a {
        position: relative;
        display: block;
        width: 100%;
        display: flex;
        text-decoration: none;
        color: var(--white);
        
        .icon {
          position: relative;
          display: block;
          min-width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
          font-size: 1.75em;
        }
        
        .title {
          position: relative;
          display: block;
          padding: 0 10px;
          height: 60px;
          line-height: 60px;
          text-align: start;
          white-space: nowrap;
        }
      }
      
      &:nth-child(1) {
        margin-bottom: 40px;
        cursor: pointer;
        
        &:hover {
          background: var(--blue);
        }
      }
      
      &:hover {
        background: var(--blue2)
      }
    }
  }

  @media (max-width: 991px) {

      left: -300px;
    
      &.active {
        width: 300px;
        left: 0;
      }
  }

  @media(max-width: 480px) {
      width: 100%;
      left: -100%;
      z-index: 1000;
    
      &.active {
        width: 100%;
        left: 0;
      }
  }
`


function Navigator({menuActive, menu}) {
    const {user} = useContext(UserContext);

    const history = useHistory()

  return (
    <NavigatorStyled className={classnames({active:menuActive})}>
        <ul>
            <li className="logo">
                <Link to="/">
                    <span className="icon"><ion-icon name="logo-twitter"></ion-icon></span>
                    <span className="title">ReviewTwits</span>
                </Link>
            </li>
            <li className={classnames({active: menu === 'home'})} onClick={() => history.push('/home')}>
                <Link to="#">
                    <span className="icon"><ion-icon name="home-outline"></ion-icon></span>
                    <span className="title">Home</span>
                </Link>
            </li>
            <li className={classnames({active: menu === 'dashboard'})} onClick={() => history.push('/dashboard')}>
                <Link to="#">
                    <span className="icon"><i className="img_icon"><img src={dashboard_icon} alt=""/></i></span>
                    <span className="title">Dashboard</span>
                </Link>
            </li>
            <li className={classnames({active: menu === 'follower'})} onClick={() => history.push('/follower')}>
                <Link to="#">
                    <span className="icon"><ion-icon name="people-outline"></ion-icon></span>
                    <span className="title">Follower</span>
                </Link>
            </li>
            <li className={classnames({active: menu === 'project'})} onClick={() => history.push('/project')}>
                <Link to="#">
                    <span className="icon"><i className="img_icon"><img src={project_icon} alt=""/></i></span>
                    <span className="title">Project</span>
                </Link>
            </li>
            <li className={classnames({active: menu === 'setting'})} onClick={() => history.push('/setting')}>
                <Link to="#">
                    <span className="icon"><ion-icon name="settings-outline"></ion-icon></span>
                    <span className="title">Setting</span>
                </Link>
            </li>
            {
                user === null ? (
                    <li className={classnames({active: menu === 'login'})} onClick={() => history.push('/login')}>
                        <Link to="#">
                            <span className="icon"><ion-icon name="log-in-outline"></ion-icon></span>
                            <span className="title">Sign In</span>
                        </Link>
                    </li>
                ):(
                    <li className={classnames({active: menu === 'logout'})} onClick={() => history.push('/logout')}>
                        <Link to="#">
                            <span className="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                            <span className="title" onClick={logout}>Sign Out</span>
                        </Link>
                    </li>
                )
            }


        </ul>
    </NavigatorStyled>
  );
}

export default Navigator;