import React, { useState, useEffect, Fragment } from 'react';
const Mobile = React.lazy(() => import('./mobile'));
const Desktop = React.lazy(() => import('./desktop'));

const Navbar: React.FC = () => {
    const [isMobile, setisMobile] = useState(false);
    useEffect(() => {
        const setWindowSize = () => {
            return window.innerWidth < 900
                ? setisMobile(true)
                : setisMobile(false);
        };
        setWindowSize();
        window.addEventListener("resize", () => setWindowSize());
    });
    return (
        <Fragment>
            {isMobile ? <Mobile /> : <Desktop />}
        </Fragment>
    );
}
export default Navbar;