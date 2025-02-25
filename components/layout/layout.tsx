import { Fragment, ReactNode } from "react";
import NavHeader from "../nav-header/nav-header";

interface Props {
    children?: ReactNode
}

export default function Layout({children}: Props) {
    return(
        <Fragment>
            <NavHeader/>
            <main>{children}</main>
        </Fragment>
    );
}