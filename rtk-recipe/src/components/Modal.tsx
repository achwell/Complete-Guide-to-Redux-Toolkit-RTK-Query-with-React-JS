import React from "react";
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBBtn,
    MDBModalBody,
    MDBModalFooter,
} from "mdb-react-ui-kit";

interface PropsFunction {
    toggleShow: (item: any) => void;
    recipe: any;
    setShow: any;
    show: boolean;
}

const Modal: React.FC<PropsFunction> = ({
                                            toggleShow,
                                            recipe,
                                            show,
                                            setShow,
                                        }) => {
    return (
        <MDBModal show={show} setShow={setShow}>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <h5 className="fw-bold">{recipe.label}</h5>
                        <MDBBtn className="btn-close" color="none" onClick={toggleShow}/>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <img src={recipe.image} alt={recipe.label}/>
                        <div className="mt-2">
                            <h5
                                className="text-start fw-bold text-muted"
                                style={{float: "left"}}
                            >
                                Calories:
                            </h5>
                            <h5 className="text-start">{recipe.calories}Kcal</h5>
                            <h5 className="text-start fw-bold text-muted">Ingredients</h5>
                            {recipe.ingredientLines.map((item: any) => (
                                <li className="text-start">{item}</li>
                            ))}
                        </div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={toggleShow}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )
}
export default Modal
