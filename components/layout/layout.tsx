import { Fragment, ReactNode } from "react";
import NavHeader from "../nav-header/nax-header";

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