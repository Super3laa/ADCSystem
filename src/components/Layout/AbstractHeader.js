import React, { useState } from "react";
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
import {FaUserCircle} from 'react-icons/fa'
import jwtDecode from 'jwt-decode';
import logo from "./logo.png";
import { useTheme } from "@material-ui/core";
export default function AbstractHeader(props) {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const user = useSelector((state) => state.user);
    const [form, setForm] = useState({ state: false, type: "" });
    const dispatch = useDispatch();
    const theme = useTheme();
    let title;
    try {
        title= "ERP"
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
                expand="md"
                style={{
                    border: "0",
                    padding: "0.5rem",
                    borderRadius: "0",
                    backgroundColor:theme.palette.primary.main,
                    color:theme.palette.primary.contrastText
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
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto">
                        {props.navigations.map((x, i) => {
                            if (x.length === 1) {
                                return (
                                    <NavItem>
                                        <NavLink
                                            href=""
                                            key={i}
                                            style={{                    color:theme.palette.primary.contrastText
                                            }}
                                            onClick={() => history.push(`${x[0].path}`)}
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
                <Nav
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
                        <NavbarText style={{ fontSize: "1.1rem" }}>
                            {
                                props.badge ? 
                                <>
                                <FaUserCircle />
                                <Badge
                                  > {"Alaa"}{" "}
                                </Badge> </>: null
                            }
                            <IoMdLogOut
                                onClick={handleLogout}
                                id="Logout"
                                style={{ fontSize: "1.2rem", cursor: "pointer" }}
                            />
                        </NavbarText>
                    </Nav>
                        : null
                }

            </Navbar>
        </React.Fragment>
    );
}
