import React from "react";
import styled from "styled-components";
import {Button} from "../../views/design/Button";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import {BaseContainer} from "../../helpers/layout";

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

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;


class Edit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            username: "",
            birthday: "",
            id: null,
            isProfileOwner: false,
            profileEditable: false
        };
    }

    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    saveChanges(user){
        fetch(`${getDomain()}/users/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                birthday: this.state.birthday
            })
        })
            .then(res => {
                if(res.status ===404){
                    window.alert("User Id (und damit der User) existiert nicht!");
                }else{
                    //localStorage.setItem("loggedInAs", res.username);
                    user.username = this.state.username;
                    user.birthday = this.state.birthday;
                    this.props.history.push({
                        pathname: `/profile`,
                        state: {reference: user}
                    });
                }
            })
            .catch(err => {
                alert(`Something went wrong during saving: ${err.message}`);
            });
    }

    cancel(user) {
        this.props.history.push({
            pathname: `/profile`,
            state: {reference: user}
        });
    }

    componentDidMount() {

    }


    render() {
        let user = this.props.location.state.user;
        return(
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <div>
                            <Label> Username </Label>
                        </div>
                        <InputField
                            placeholder="Enter here..."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <div>
                            <Label> Birthday </Label>
                        </div>
                        <form action="/action_page.php">
                            <input
                                type="date"
                                name="birthday"
                                min="1900-01-01"
                                max="2019-03-13"
                                onChange={e => {
                                    this.handleInputChange("birthday", e.target.value);
                                }}

                                {...() => {
                                    let dd = this.today.getDate();
                                    let mm = this.today.getMonth();
                                    let yyyy = this.today.getFullYear();
                                    if (dd < 10) {
                                        dd = '0' + dd;
                                    }
                                    if (mm < 10) {
                                        mm = '0' + mm;
                                    }
                                    let todayStr = dd + '.' + mm + '.' + yyyy;
                                    document.getElementById("date").setAttribute("max", todayStr);
                                }}
                            />
                        </form>
                        <Button
                            onClick={() => {
                                this.saveChanges(user);
                            }}
                            disabled={!this.state.birthday || !this.state.username}
                            width="50%"
                        >
                            Save
                        </Button>
                        <Button
                            onClick={() => {
                                this.cancel(user);
                            }}
                            width="50%"
                        >
                            Cancel
                        </Button>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Edit)