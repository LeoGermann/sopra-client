import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

class Register extends React.Component {
    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        return (
            <Container>
                <h2>You registered! </h2>
                <p>Great! Now you can go back and login.</p>
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

export default withRouter(Register);