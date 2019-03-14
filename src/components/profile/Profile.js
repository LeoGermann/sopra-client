import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import {withRouter} from "react-router-dom";

const Container = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  background: beige;
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  margin-inside: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 550px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Birthday = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const CreationDate = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const Username = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

const Userstatus = styled.div`
  font-weight: bold;
  color: black;
  margin-bottom: 10px;
`;

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            id: null,
            loggedInUser: "",
            status: null,
            edit: false,
            isProfileOwner: false
        };
    }

    redirectDashboard(){
        this.props.history.push(`/game`)
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }
    redirectEdit(user){
        this.props.history.push({
            pathname: `/Edit`,
            state: {user: user}
        });
    }

    componentDidMount() {
        // GET
        fetch(`${getDomain()}/users/${localStorage.getItem("visitedUserId")}`)
            .then(response => response.json())
            .then((user) => {
                this.setState({user: user});
                this.setState({loggedInUser: localStorage.getItem("username")});
                this.setState({creationDate: localStorage.getItem("creationDate")});
                this.setState({id: user.id});
                this.setState({isProfileOwner: localStorage.getItem("visitedUserId") === localStorage.getItem("loggedInUserId")});
                console.log(`Current User: ${this.state.loggedInUser}`)
            })
            .catch(() => {
                alert("Could not fetch user data.");
            })

    }
    render() {
        let user = this.props.location.state.reference;
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Label>Username</Label>
                        <Container>
                            <div>
                                <Username>{this.props.location.state.reference.username}</Username>
                            </div>
                        </Container>
                        <Label>Birthday</Label>
                        <Container>
                            <div>
                                <Birthday>{this.props.location.state.reference.birthday}</Birthday>
                            </div>
                        </Container>
                        <Label>CreationDate</Label>
                        <Container>
                            <div>
                                <CreationDate>{this.props.location.state.reference.creationDate}</CreationDate>
                            </div>
                        </Container>
                        <Label>Status</Label>
                        <Container>
                            <div>
                                <Userstatus>{this.props.location.state.reference.status}</Userstatus>
                            </div>
                        </Container>
                        <div>
                            <ButtonContainer>
                                <Button
                                    width="50%"
                                    onClick={() => {
                                        return this.redirectDashboard();
                                    }}
                                >
                                    Back to Dashboard
                                </Button>
                                {this.state.isProfileOwner ?
                                    <Button
                                        width="50%"
                                        onClick={() => {
                                            return this.redirectEdit(user);
                                        }}
                                    >
                                        Edit Profile
                                    </Button> : ""
                                }
                            </ButtonContainer>
                        </div>
                    </Form>
                </FormContainer>
                <h5>Logged in as: {this.state.loggedInUser} </h5>
            </BaseContainer>
        );
    }
}

export default withRouter(Profile)