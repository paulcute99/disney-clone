import React, {useEffect} from 'react'
import styled from "styled-components"
import { selectUserName, selectUserPhoto , setUserLogin, setSignOut} from '../features/user/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import { auth, provider } from '../firebase'
import {useHistory } from "react-router-dom"
const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex:1;
    margin-left: 25px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        
        img{
            height: 20px;
        }

        span{
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`
const LoginContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
`

function Header() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const signIn = () =>{
        auth.signInWithPopup(provider)
        .then((result) =>{
            let user = result.user;
            dispatch(setUserLogin({
                name:user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push("/ ")
        })
    }

    const signOut = () =>{
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut)
            history.push("/login")
        })
    }

    useEffect(() =>{
        auth.onAuthStateChanged(async (user)=>{
            if(user){
                dispatch(setUserLogin({
                    name:user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/ ")
            }
        })
    }, [])
    return (
        <Nav>
            <Logo src="/images/logo.svg"/>
            {!userName  ? (
                    <LoginContainer>
                        <Login onClick = {signIn}>Login</Login>
                    </LoginContainer>
                    ):
                    <>
                    <NavMenu>
                    <a>
                        <img src="/images/home-icon.svg"/>
                        <span>HOME</span>
                    </a>
                    <a>
                        <img src="/images/search-icon.svg"/>
                        <span>SEARCH</span>
                    </a>
                    <a>
                        <img src="/images/watchlist-icon.svg"/>
                        <span>WATCH LIST</span>
                    </a>
                    <a>
                        <img src="/images/original-icon.svg"/>
                        <span>ORIGINALS</span>
                    </a>
                    <a>
                        <img src="/images/movie-icon.svg"/>
                        <span>MOVIES</span>
                    </a>
                    <a>
                        <img src="/images/series-icon.svg"/>
                        <span>SERIES</span>
                    </a>
                </NavMenu>
                <UserImg onClick={signOut}
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ficons.iconarchive.com%2Ficons%2Ficonlicious%2Fmisc%2F512%2FUser-icon.png&f=1&nofb=1"/>
                </>
            }
            
        </Nav>
    )
}

export default Header
