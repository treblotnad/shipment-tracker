import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import NavLogo from "./Logo";
import { Box, Text, Button } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);
    // Gets the user's data
    const { loading, data, error } = useQuery(GET_ME);
    if (loading) {
        return (
            <>
                <Box h="85px"></Box>
            </>
        );
    }
    console.log(data);

    return (
        <>
            <Navbar expand="lg">
                <Container fluid>
                    <NavLogo as={Link} to="/" w="200px"></NavLogo>

                    <Navbar id="navbar" className="d-flex flex-row-reverse">
                        <Nav className="d-flex">
                            {Auth.loggedIn() ? (
                                <>
                                    <Text
                                        px={2}
                                        paddingRight="30px"
                                        paddingTop="5px"
                                        textColor="grey"
                                        fontSize="19px"
                                    >
                                        Hello, {data?.me?.firstname}
                                    </Text>
                                    <Nav.Link as={Link} to="/dashboard">
                                        Dashboard
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/account">
                                        Account
                                    </Nav.Link>
                                    <Button onClick={Auth.logout}>Logout</Button>
                                </>
                            ) : (
                                <Button onClick={() => setShowModal(true)}>Login</Button>
                                // <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                            )}
                        </Nav>
                    </Navbar>
                </Container>
            </Navbar>
            {/* set modal data up */}
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="signup-modal"
            >
                {/* tab container to do either signup or login component */}
                <Tab.Container defaultActiveKey="login">
                    {/* <Modal.Header closeButton>
                        <Modal.Title id="signup-modal">
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="login">Login</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>
                        <Tab.Content>
                            <Tab.Pane eventKey="login">
                                <LoginForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="signup">
                                <SignUpForm handleModalClose={() => setShowModal(false)} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Modal.Body>
                </Tab.Container>
            </Modal>
        </>
    );
};

export default AppNavbar;
