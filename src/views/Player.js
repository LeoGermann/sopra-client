import React from "react";
import styled from "styled-components";
import Link from "react-router-dom/es/Link";

const Container = styled.div`
  margin: 6px 0;
  width: 500px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
`;

const Username = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: bolder;
  text-decoration: underline;
`;

const Birthday = styled.div`
  font-weight: lighter;
  color: #06c4ff;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: lighter;
`;

const CreationDate = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: lighter;
  color: aquamarine;
`;

const LinkWord = styled(Link)`
  color: beige;
  text-decoration: none;
  &:hover{
  color: darkgrey;
  }
`;

/**
 * This is an example of a Functional and stateless component (View) in React. Functional components are not classes and thus don't handle internal state changes.
 * Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.
 * They are reusable pieces, and think about each piece in isolation.
 * Functional components have to return always something. However, they don't need a "render()" method.
 * https://reactjs.org/docs/components-and-props.html
 * @FunctionalComponent
 */

const Player = ({ user }) => {
    return (
        <Container>
            <LinkWord
                to={{pathname: `/profile`, state: {reference: user}}}>
                <Username
                    onClick={()=> {
                        localStorage.setItem("visitedUserId", user.id);
                    }}
                > {user.username} </Username>
            </LinkWord>
            <Id>Id: {user.id}</Id>
            <CreationDate>CreationDate: {user.creationDate}</CreationDate>
            <Birthday>BD: {user.birthday}</Birthday>
        </Container>
    );
};

export default Player;