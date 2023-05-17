import React from "react";
import Navbar from "./Navbar";
// import { PageFooter } from "./page-footer";

export const PageLayout = ({ children }) => {
    return (
        <div >
            <Navbar />
            {/* <MobileNavBar /> */}
            <div className=" bg-blue-400 h-screen">{children}</div>
            {/* <PageFooter /> */}
        </div>
    );
};