import React, { Fragment, useState } from 'react'
import './Header.css';
import Backdrop from "@material-ui/core/Backdrop";
import {SpeedDial, SpeedDialAction} from "@material-ui/lab";
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({user}) => {
    const { cartItems } = useSelector((state) => state.cart);

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        {icon: <ListAltIcon/>, name:"Orders", func: orders},
        {icon: <PersonIcon/>, name:"Profile", func: account},
        {icon: <ShoppingCartIcon style={{color: cartItems.length>0 ? "tomato" : "unset"}}/>, name:`Cart{${cartItems.length}}`, func: cart},
        {icon: <ExitToAppIcon/>, name: "Logout", func: logoutUser},
    ]

    if(user.role==="admin"){
        options.unshift({icon: <DashboardIcon/>, name:"Dashboard", func: dashboard})
    }

    function dashboard(){
        navigate("./admin/dashboard")
    }

    function orders(){
        navigate("./orders")
    }

    function account(){
        navigate("./account")
    }

    function cart(){
        navigate("./cart")
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout successflly");
    }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        ariaLabel='SpeedDial tooltip eample'
        onClose={()=>setOpen(false)}
        onOpen={()=>setOpen(true)}
        open={open}
        direction="down"
        className='speedDial'
        icon={<img
        className='speedDialIcon'
        src={user.avatar.url ? user.avatar.url : "https://cdn-icons-png.flaticon.com/512/64/64572.png"}
        alt="Profile"    
        />
        }>
        {options.map((item)=>(
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
        ))}
        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions