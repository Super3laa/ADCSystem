import React from "react";
import AbstractHeader from "./AbstractHeader";
import Translate from 'react-translate-component';
import { useSelector } from "react-redux";
export default function Header() {
    const user = useSelector(state=>state.user)
    console.log(user)
    return (
        <React.Fragment>
            {user.username === "" ?
                <AbstractHeader
                    badge={false}
                    toolbar={[]}
                    navigations={[
                        [{ title: <Translate content="Login" />, path: "/Login" }],
                    ]}
                    exitIcon={false}
                /> : <AbstractHeader
                    badge={true}
                    toolbar={[]}
                    user={user}
                    navigations={[
                        [{ title: <Translate content="Home" />, path: "/Home" }],
                    ]}
                    exitIcon={true}
                />
            }


        </React.Fragment>)
}