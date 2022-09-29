import React from 'react';
import {MDBBadge, MDBContainer, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarLink} from "mdb-react-ui-kit"
import {useAppDispatch, useAppSelector} from "./redux/hooks"

const NavBar = () => {
    const {totalCount} = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    return (
        <div>
            <MDBNavbar expand="lg" dark bgColor="primary">
                <MDBContainer>
                    <MDBNavbarBrand style={{alignItems: "center", display: "flex", justifyContent: "space-between"}}>
                        Redux-Toolkit Shopping Cart
                    </MDBNavbarBrand>
                    <MDBNavbarLink>
                        <a className="mx-3" href="#!">
                            <MDBIcon fas icon="shopping-cart" size="lg" color="white"/>
                            <MDBBadge pill color="danger" notification style={{fontSize: "12px"}}>
                                {totalCount}
                            </MDBBadge>
                        </a>
                    </MDBNavbarLink>

                </MDBContainer>
            </MDBNavbar>
        </div>
    );
};

export default NavBar;
