import React, { Component, Fragment, useEffect } from "react";
import { compose, graphql } from "react-apollo";

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

import { gql, useQuery } from "@apollo/client";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { Query, ApolloProvider, Mutation } from "react-apollo";
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

class ProductManagerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authVar: this.props.authVar,
      textVar: "",
    };
  }

  handleInputChange2(event) {
    this.setState({
      deleteIDVar: event.target.value,
    });
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
          `https://api.aarootshi.com/pcp-products`,
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
        deletePcpProduct(input: { where: { id: ${this.state.deleteIDVar} } }) {
          pcpProduct {
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
                  Delete Product #
                </button>
              );
            }}
          </Mutation>
        );
      } catch (error) {}
    };

    return (
      <Fragment>
        <CardHeader>Pono Premium Services Management</CardHeader>
        <CardBody> Coming Soon
        </CardBody>
      </Fragment>
    );
  }
}
export default ProductManagerComponent;
