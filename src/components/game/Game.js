import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Profile from "../game/Profile";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null,
      profileUser: null
    };
  }

  logout() {
    //localStorage.removeItem("token");
    localStorage.clear()
    this.props.history.push("/login");
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(response => response.json())
        .then(async users => {
          // delays continuous execution of an async operation for 0.8 seconds.
          // This is just a fake async call, so that the spinner can be displayed
          // feel free to remove it :)
          await new Promise(resolve => setTimeout(resolve, 800));

          this.setState({ users });
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong fetching the users: " + err);
        });
  }

  render() {
    if(this.state.profileUser !== null){
      return <Profile user={this.state.profileUser}/>;
    }

    return (
        <Container>
          <h2>Welcome! </h2>
          <p>Click on a user to see his/her profile.</p>
          {!this.state.users ? (
              <Spinner />
          ) : (
              <div>
                <Users>
                  {this.state.users.map(user => {
                    return (
                        <PlayerContainer key={user.id} onClick={() => {
                          this.setState({profileUser: user});}
                        }>
                          <Player user={user} />
                        </PlayerContainer>
                    );
                  })}
                </Users>
                <Button
                    width="100%"
                    onClick={() => {
                      this.logout();
                    }}
                >
                  Logout
                </Button>
              </div>
          )}
        </Container>
    );
  }
}

export default withRouter(Game);