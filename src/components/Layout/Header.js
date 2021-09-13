import React from "react";
import AbstractHeader from "./AbstractHeader";
import Translate from 'react-translate-component';
export default function Header() {
    return (
        <React.Fragment>
                    {/*depending on permissions pass deffernet props */}

            <AbstractHeader
                badge={true}
                toolbar={[]}
                navigations={[
                    [{ title: <Translate content = "Login" />, path: "/Login" }],
                    [{ title: <Translate content= "Home" />, path: "/Home" }],
                ]}
                exitIcon={true}
            />
        </React.Fragment>)
}