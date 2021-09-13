import React from "react";
import AbstractHeader from "./AbstractHeader";
import { useTranslate } from "react-translate"
import { useSelector } from "react-redux";

export default function Header() {
    const translator = useTranslate(useSelector(state=>state.language.currentLanguage))
    return (
        <React.Fragment>
                    {/*depending on permissions pass deffernet props */}

            <AbstractHeader
                badge={true}
                toolbar={[]}
                navigations={[
                    [{ title: translator("Login"), path: "/Login" }],
                    [{ title: translator("Home"), path: "/Home" }],
                ]}
                exitIcon={true}
            />
        </React.Fragment>)
}