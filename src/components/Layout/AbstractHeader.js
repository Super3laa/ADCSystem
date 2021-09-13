import React, { useEffect, useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavbarText
} from 'reactstrap'; import { IoMdLogOut } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {changeLanguage} from '../../redux/actions/language';
import { FaUserCircle } from 'react-icons/fa'
import Button from '@material-ui/core/Button';
import { IoMenuSharp } from 'react-icons/io5'
import logo from "./logo.png";
import { useTheme } from "@material-ui/core";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslate } from "react-translate"
import languageTable from './languageTable';

export default function AbstractHeader(props) {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const user = useSelector((state) => state.user);
    const [form, setForm] = useState({ state: false, type: "" });
    const dispatch = useDispatch();
    const theme = useTheme();
    let title;
    const lang = useSelector(state=>state.language)
    const translator = useTranslate(lang.currentLanguage);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentLanguage, setcurrentLanguage]=useState(lang.currentLanguage);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
   
    const handleLangMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleChangeLang = (e)=>{
        dispatch(changeLanguage(languageTable.get(e.currentTarget.textContent)))
        setcurrentLanguage(e.currentTarget.textContent);
        setAnchorEl(null);
    }

    const handleProfileMenuClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleProfileMenu = (e) =>{

        setAnchorElProfile(null);
    }
    try {
        title = "ERP"
        // title = JSON.parse(jwtDecode(localStorage.getItem('EnterpriseProps')).properties).name

    } catch (error) {
        title = "ERP"
    }

    function handleLogout() {

        history.go(0);
    }
    return (
        <React.Fragment>
            {/*form.state
                ? RenderForm({kind:"Insert",type:form.type, actions:{
                    action: () => setForm({ ...form, state: !form.state }),
                }})
            : null*/}
            <Navbar
                id="AbstractHeader"
                expand="lg"
                style={{
                    border: "0",
                    padding: "0.5rem",
                    borderRadius: "0",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    direction:lang.direction
                }}
            >
                <NavbarBrand
                    href=""
                    onClick={() => history.push("/")}
                    style={{ color: "#fff", cursor: "pointer" }}
                >
                    <img
                        id="Home"
                        className="d-inline-block align-top"
                        height="30"
                        src={logo}
                        alt="ERP"
                    />{" "}
                    {title}
                </NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-2" style={{ color: "white" }}><IoMenuSharp /></NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar>
                        {props.navigations.map((x, i) => {
                            if (x.length === 1) {
                                return (
                                    <NavItem>
                                        <NavLink
                                            href=""
                                            key={i}
                                            style={{
                                                color: theme.palette.primary.contrastText
                                            }}
                                            onClick={(e) => {e.preventDefault();history.push(`${x[0].path}`)}}
                                        >
                                            {x[0].title}
                                        </NavLink>
                                    </NavItem>

                                );
                            } else {
                                return (
                                    <UncontrolledDropdown nav inNavbar>

                                        <DropdownToggle nav caret>{x[0].title}</DropdownToggle>
                                        <DropdownMenu right>
                                            {x[1].map((y) => {
                                                return (
                                                    <DropdownItem
                                                        href=""
                                                        onClick={() => history.push(`${y.path}`)}
                                                    >
                                                        {y.title}
                                                    </DropdownItem>
                                                );
                                            })}
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                );
                            }
                        })}
                    </Nav>
                </Collapse>
                <Nav navbar
                    style={{
                        padding: "0px 1.5rem",
                        marginRight: "3rem",
                        display: "-webkit-inline-box",
                    }}
                >
                    {props.toolbar.map((x) => {
                        return (
                            <NavItem>
                                <NavLink
                                    id={`${x.id}`}
                                    style={{ color: `${x.color}` }}
                                    onClick={() => setForm({ type: `${x.id}`, state: !form.state })}
                                >
                                    {x.title}
                                </NavLink>
                            </NavItem>

                        );
                    })}
                </Nav>
                {
                    props.exitIcon ? <Nav>
                        <NavbarText style={{ fontSize: "1.1rem", color: "#fff" }}>
                            {
                                props.badge ?
                                    <>
                                        <Button
                                            aria-controls="LanguageMenu"
                                            aria-haspopup="true"
                                            onClick={handleLangMenuClick}
                                            style={menuButtonStyle} >{currentLanguage}</Button>
                                        <Menu
                                            id="LanguageMenu"
                                            anchorEl={anchorEl}
                                            keepMountedmenu
                                            open={Boolean(anchorEl)}
                                            onClose={handleChangeLang}
                                        >
                                            <MenuItem onClick={handleChangeLang}>EN</MenuItem>
                                            <MenuItem onClick={handleChangeLang}>AR</MenuItem>
                                        </Menu>
                                        <Button
                                            aria-controls="ProfileMenu"
                                            style={menuButtonStyle}
                                            onClick={handleProfileMenuClick}
                                            startIcon={<FaUserCircle />}
                                             > Alaa</Button>
                                        <Menu
                                            id="ProfileMenu"
                                            anchorEl={anchorElProfile}
                                            keepMountedmenu
                                            open={Boolean(anchorElProfile)}
                                            onClose={handleProfileMenu}
                                        >
                                            <MenuItem onClick={handleProfileMenu}>{translator("Logout")} <IoMdLogOut
                                                id="Logout"
                                            /></MenuItem>
                                        </Menu>
                                        </> : null
                            }
                        </NavbarText>
                    </Nav>
                        : null
                }

            </Navbar>
        </React.Fragment>
    );
}

const menuButtonStyle={color: "#fff", minWidth: 0, padding: "0 0.35rem",textTransform: "none"}
