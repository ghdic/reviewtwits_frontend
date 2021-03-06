import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import Navigator from "./Navigator";
import default_user_image from '../images/default_user_image.jpg'
import classnames from "classnames";
import DashBoard from "./dashboard/DashBoard";
import Home from "./home/Home";
import WaveFooter from "./WaveFooter";
import ProjectCreator from "./project/ProjectCreator";
import Price from "./project/Price";
import Project from "./project/Project";
import Follower from "./follower/Follower";
import Login from "./Login";
import {UserContext} from "./AuthProvider";
import {useHistory} from "react-router-dom";
import NotFound404 from "./NotFound404";
import Logout from "./Logout";

const MainStyled = styled.div`
  .container {
    position: relative;
    width: 100%;
  }
  
  .main {
    position: absolute;
    width: calc(100% - 300px);
    left: 300px;
    min-height: 100vh;
    background: var(--white);
    transition: 0.5s;
    
    &.active {
      width: calc(100% - 80px);
      left: 80px;
    }
  }
  
  .topbar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  
  .toggle {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5em;
    cursor: pointer;
  }
  
  .search {
    position: relative;
    width: 400px;
    margin: 0 10px;
    
    & label {
      position: relative;
      width: 100%;
      
      & input {
        width: 100%;
        height: 40px;
        border-radius: 40px;
        padding: 5px 20px 5px 35px;
        font-size: 18px;
        outline: none;
        border: 1px solid var(--black2);
      }
      
      & ion-icon {
        position: absolute;
        top: 10px;
        left: 10px;
        font-size: 1.2em;
      }
    }
  }
  
  .user {
    position: relative;
    min-width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    
    & img {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  @media (max-width: 991px) {
    .main {
      width: 100%;
      left: 0;
      
      &.active {
        left: 300px;
      }
    }
    
    .card_box {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media(max-width: 768px) {
    .details {
      grid-template-columns: repeat(1, 1fr);
    }
    
    .recent_orders {
      overflow-x: auto;
    }
    
    .status.inprogress {
      white-space: nowrap;
    }
  }

  @media(max-width: 480px) {
    .card_box {
      grid-template-columns: repeat(1, 1fr);
    }
    
    .card_header h2 {
      font-size: 20px;
    }
    
    .user {
      min-width: 40px;
    }
    
    .toggle {
      z-index: 10001;
    }
    
    .main.active .toggle {
      position: fixed;
      right: 0;
      left: initial;
      color: #fff;
    }
  }
`

function Main({match}) {
    const [menuActive, setMenuActive] = useState(false);
    const [menu, setMenu] = useState(match.params.key)

    const history = useHistory()


    const {user} = useContext(UserContext);
    const authenticated = user != null;

    useEffect(() => {
        // if (['dashboard', 'follower', 'project', 'setting'].includes(match.params.key) && !authenticated) {
        //     setMenu('/login')
        //     history.push('/login')
        // } else {
        //     setMenu(match.params.key)
        // }
        setMenu(match.params.key)

    }, [match.params.key])

    const menuDict = {
        'home':<Home/>,
        'dashboard':<DashBoard/>,
        'follower':<Follower/>,
        'project': <Project/>
    }

    const tooggleMenu = () => {
        setMenuActive(!menuActive);
    }


  return (
    <MainStyled>
        <div>
            <div className="container">
                <Navigator menuActive={menuActive} menu={menu} setMenu={setMenu} />
            </div>

            <div className={classnames('main', {active:menuActive})}>
                <div className="topbar">
                    <div className="toggle" onClick={tooggleMenu}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here"/>
                            <ion-icon name="search-outline"></ion-icon>
                        </label>
                    </div>
                    <div className="user">
                        <img src={user === null ? default_user_image : user.profileImage} alt=""/>
                    </div>
                </div>
                {
                    menuDict[menu] === undefined ? <NotFound404/>:menuDict[menu]
                }

            </div>
        </div>
    </MainStyled>
  );
}

export default Main;