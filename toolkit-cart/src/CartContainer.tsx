import React, {useEffect} from 'react'
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit"
import {useAppDispatch, useAppSelector} from "./redux/hooks"
import {clearCart, getCartItems, getCartTotal} from "./redux/feature/cartSlice"
import CartItem from "./CartItem";

const CartContainer = () => {
    const {totalAmount, items} = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCartTotal())
    }, [items])

    if (items.length === 0) {
        return (
            <>
                <h3 className="fs-bold" style={{marginTop: "20px"}}>
                    Your Shopping{" "}
                    <span>
            <MDBIcon fas icon="shopping-bag"/>
          </span>{" "}
                    is Empty
                </h3>
                <MDBBtn
                    className="mx-2"
                    style={{marginRight: "100px"}}
                    onClick={() => dispatch(getCartItems())}
                >
                    Get Items
                </MDBBtn>
            </>
        )
    }
    return (
        <div>
            <h2 className="lead-mb-0 mt-2">Your Shooping Cart</h2>
            {items.map((item) => {
                return <CartItem key={item.id} {...item} />;
            })}
            <footer>
                <hr/>
                <div>
                    <h4 style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        marginRight: "60px",
                    }}>Total <span>${totalAmount}</span></h4>
                </div>
                <MDBBtn
                    color="danger"
                    onClick={() => dispatch(clearCart())}
                    style={{ width: "140px", marginTop: "50px" }}
                >
                    Clear Cart
                </MDBBtn>
            </footer>
        </div>
    );
};

export default CartContainer
