import React from "react";
import AbstractHeader from "./AbstractHeader";
export default function Header() {
    return (
        <React.Fragment>
                    {/*depending on permissions pass deffernet props */}

            <AbstractHeader
                badge={true}
                toolbar={[]}
                navigations={[
                    [{ title: "Login", path: "/Login" }],
                    [{ title: "Home", path: "/Home" }],
                ]}
                exitIcon={true}
            />
        </React.Fragment>)
}