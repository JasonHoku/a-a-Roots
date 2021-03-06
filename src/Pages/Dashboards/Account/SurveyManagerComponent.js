import React, { Component, Fragment, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";

import {
  Row,
  Col,
  Button,
  ListGroupItem,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Container,
  Input,
  FormText,
  CardHeader,
  CardTitle,
  CardLink,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import axios from "axios";
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.aarootshi.com/graphql",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }),
});

class NoteManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteVar: "",
      deleteIDVar: "26",
    };
  }

  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  getData() {
    console.log("Check Survey Data");
    try {
      this.state.authVar = axios
        .get(`https://api.aarootshi.com/surveys`, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((res) => {
          if (res.err == null) {
            this.setState({ textvar: JSON.stringify(res) });
          }
          localStorage.setItem(
            "NewSurveyCount",
            String(JSON.parse(JSON.stringify(res.data)).length)
          );
          let concData = "";
          for (
            var i = 0;
            i < JSON.parse(JSON.stringify(res.data)).length;
            i++
          ) {
            concData =
              concData +
              "\r\n ID#" +
              JSON.stringify(JSON.parse(JSON.stringify(res.data))[i].id) +
              " : " +
              JSON.stringify(JSON.parse(JSON.stringify(res.data))[i].Answers);

            this.state.textVar = concData
              .split("\n")
              .map((str, index) => <h5 key={index}>{str}</h5>);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }

  handleInputChange(event) {
    this.setState({
      noteVar: event.target.value,
    });
  }
  handleInputChange2(event) {
    this.setState({
      deleteIDVar: event.target.value,
    });
  }

  onSubmit = () => {
    const formData = new FormData();
    formData.Answers = this.state.noteVar;

    axios
      .post(`https://api.aarootshi.com/surveys`, JSON.stringify(formData), {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        if (res.err == null) {
          document.getElementById("apiupform").hidden = false;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onSubmitDelete = () => {
    const formData = new FormData();
    formData.Answers = this.state.noteVar;
    formData.id = 21;
    console.log(formData);

    axios
      .post(`https://api.aarootshi.com/surveys`, JSON.stringify(formData), {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        if (res.err == null) {
          alert("Success!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onImageChange = (event) => {
    console.log(event.target.files);

    this.setState({
      images: event.target.files,
    });
  };

  render() {

    return (
      <Fragment>
        <CardHeader>Survey Manager</CardHeader>
        <CardBody>
          <div
            style={{
              boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
            }}
          >
            <span>{this.state.textVar}</span>
          </div>
          <input
            type="number"
            onChange={(event) => this.handleInputChange2(event)}
            style={{ width: "50px" }}
          ></input>{" "}
          &nbsp;
          <br />
          <Input
            value={this.state.noteVar}
            name="NoteVar"
            id="NoteVar"
            onChange={(event) => this.handleInputChange(event)}
            style={{ top: "15px", position: "relative" }}
            type="textarea"
          ></Input>{" "}
          &nbsp;
          <button onClick={() => this.onSubmit()}> Send</button> <br />
        </CardBody>
        <br />
      </Fragment>
    );
  }
}
export default NoteManagerComponent;
