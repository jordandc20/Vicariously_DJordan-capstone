import React from "react";
import Navbar from "./Navbar";
// import { PageFooter } from "./page-footer";

export const PageLayout = ({ children }) => {
    return (
        <div className="page-layout">
            <Navbar />
            {/* <MobileNavBar /> */}
            <div className="page-layout__content">{children}</div>
            {/* <PageFooter /> */}
        </div>
    );
};