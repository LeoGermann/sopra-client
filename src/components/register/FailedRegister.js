import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class FailedRegister extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: null,
        };
    }


    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        return (
            <Container>
                <h2>Oh no! </h2>
                <p>Username and/or password were wrong!</p>
                <div>
                    <Button
                        width="50%"
                        onClick={() => {
                            this.logout();
                        }}
                    >
                        Go back.
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(FailedRegister);