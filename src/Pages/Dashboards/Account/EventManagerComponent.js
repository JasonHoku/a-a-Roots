import React, { Component, Fragment, useState } from "react";
import { compose, graphql } from "react-apollo";
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
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";
import axios from "axios";
import Calendar from "react-calendar";
import "../../../assets/components/Calendar.css";
const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://api.a-a-roots.web.app/graphql",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }),
});

class EventManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authVar: this.props.authVar,
      textVar: "",
    };
    this.startTimer = this.startTimer.bind(this);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (this.state.images != null) {
      document.getElementById("apiupform").hidden = true;

      Array.from(this.state.images).forEach((image) => {
        formData.append("files", image);
      });

      formData.Title = "asdf";
      formData.Sizes = "asdf";
      formData.Shop = "asdf";
      formData.Price = "asdf";
      formData.Image = this.state.images[0];
      console.log(formData);

      axios
        .post(
          `https://api.a-a-roots.web.app/events`,
          JSON.stringify(formData),
          {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        )
        .then((res) => {
          if (res.err == null) {
            alert("Success!");
            document.getElementById("apiupform").hidden = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  startTimer() {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        console.log("B");
        this.setState({
          timeNow: Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(Date.now()),
        }),
          1000;
      }, setState(nextState, callback));
    }
  }

  stopTimer() {
    clearInterval(this.timerId);
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.stopTimer;
  }
  onImageChange = (event) => {
    console.log(event.target.files);

    this.setState({
      images: event.target.files,
    });
  };

  render() {
    let { formName, formDesc, formEmail, formMessage } = this.state;
    const { data } = this.state;

    const MY_MUTATION_MUTATION = gql`
      mutation DeleteChat {
        createEvents(input: { where: { id: ${this.state.deleteIDVar} } }) {
          chat {
            id
          }
        }
      }
    `;

    const MyMutationMutation = (props) => {
      try {
        return (
          <Mutation mutation={MY_MUTATION_MUTATION}>
            {(MyMutation, { loading, error, data }) => {
              try {
                if (loading) return <pre>Loading</pre>;

                if (error) {
                }
              } catch (error) {}
              const dataEl = data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
              ) : null;

              return (
                <button
                  onClick={() =>
                    MyMutation(formName + formDesc, Date().toString())
                  }
                >
                  Add Event Data
                </button>
              );
            }}
          </Mutation>
        );
      } catch (error) {}
    };

    return (
      <Fragment>
        <Card
          style={{
            boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
            width: "22rem",
          }}
        >
          <CardHeader>Event Manager</CardHeader>
          <CardBody>
            <div
              style={{
                boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
                width: "16rem",
              }}
            >
              <p>
                {Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(Date.now())}
              </p>
            </div>{" "}
            [ Load Event Data Here]
            <br />
            <input style={{ width: "50px" }}></input> &nbsp;
            <button> Delete Event #</button> <br />
            <br />
            <span className="calendarVar">
              <Calendar
                className="calendarVar"
                onChange={(e) => this.setState({ setDate: e })}
              />
            </span>{" "}
            <br />
            Select Date then Add Data:
            <div
              style={{
                boxShadow: "0px 0px 0px 2px rgba(50,50,50, .8)",
                width: "16rem",
              }}
            >
              {String(this.state.setDate)}
            </div>
            <br />
            <br /> Description:
            <Input
              style={{ top: "15px", position: "relative" }}
              type="textarea"
            ></Input>{" "}
            &nbsp; <br />
            <br />
            <MyMutationMutation />
          </CardBody>
        </Card>
        <br />
      </Fragment>
    );
  }
}
export default EventManagerComponent;
