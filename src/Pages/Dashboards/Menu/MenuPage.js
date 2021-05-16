import React, { Component, Fragment, useState, useEffect, useRef } from "react";

import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

import { FaCartPlus } from "react-icons/fa";

import {
  Row,
  Col,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  CardImg,
  NavLink,
  TabContent,
  TabPane,
  Progress,
  CardFooter,
  ButtonGroup,
} from "reactstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

export default function CRMDashboard2() {
  const [gotMenuData, setGotMenuData] = useState([]);
  const [categoryList, setCategoryList] = useState(["Drinks"]);
  const [categorizedMenuArray, setCategorizedMenuArray] = useState([]);
  const [renderedMenuItemsArray, setRenderedMenuItemsArray] = useState([]);

  const loadStageRef = useRef(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (categorizedMenuArray.length > 0) {
      loadStageRef.current = 2;
    }

    console.log(categorizedMenuArray);
    console.log(loadStageRef.current);
    console.log(categorizedMenuArray);

    console.log("State Refresh");
    if (!isInitialMount.current) {
      //loads last, EveryTime
      // console.log("Running UseEffect2");
      // Listen To Snapshot & Update
    } else {
      loadStageRef.current = 1;
      console.log("State 2 Init");
      let concData = [];
      let concData2 = [];
      let concData3 = [];

      if (loadStageRef.current === 1) {
        console.log("State Stage: " + loadStageRef.current);
        let concData = [];
        let concData2 = [];
        let dbData = {};
        let imgSrcArray = [];
        let gotLoadedObjectData = [];
        let gameObjectData = {};
        var db = firebase.firestore();
        db.collection("MenuItems")
          .get()
          .then((userData) => {
            userData.forEach((doc) => {
              var key = doc.id;
              var data = doc.data();
              data["key"] = key;
              dbData[key] = data;
            });
            let dbDataArray = Object.values(dbData);
            console.log(dbDataArray);
            setGotMenuData(dbDataArray);

            if (dbDataArray) {
              try {
              } catch (error) {}
            }
          });
      }
      isInitialMount.current = false;
    }
  });

  function decideRenderMenu() {
    gotMenuData.sort(sort_by("Category", true, (a) => a.toUpperCase()));

    let tempParsedCategories = [];

    gotMenuData.map((el, index) => {
      if (window.ItemCounter === undefined) {
        window.ItemCounter = 0;
        window.ItemCatCount = 0;
      }
      window.ItemCounter++;
      window.ItemCatCount++;

      console.log("X Items In Category:");

      console.log(window.ItemCatCount);
      console.log("X End");

      if (categoryList.length <= gotMenuData.length)
        categoryList.push(el.Category);
      categoryList.forEach((el2, index) => {
        if (!JSON.stringify(renderedMenuItemsArray).includes(el.ID)) {
          if (
            !JSON.stringify(tempParsedCategories).includes(
              JSON.stringify(el.Category)
            )
          ) {
            console.log("New Category Detected");
            if (window.CategoryCounter === undefined) {
              window.CategoryCounter = 0;
              window.ItemsPerCategory = window.ItemCounter;
            }
            window.CategoryCounter++;
            window.ItemsPerCategory = window.ItemCatCount;
            console.log("X Items In Category:");

            console.log(window.ItemCatCount);
            window.ItemCatCount = 0;

            console.log(el.Category);
            console.log(window.CategoryCounter);

            renderedMenuItemsArray.push(el.ID);
            categorizedMenuArray.push(
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderTop: "2px solid",
                  borderRadius: "25px",
                  fontWeight: 800,
                  fontFamily: `"Montserrat", sans-serif`,
                  backgroundColor: index % 2 ? "#eefffe" : "#ddfffd",
                  position: "relative",
                  top: "-5px",
                  padding: "5px",
                }}
                key={`AA_Div_${el.Category}${index}`}
              >
                <span
                  style={{
                    minWidth: "300px",
                    fontSize: "32px",
                    position: "relative",
                    top: "15px",
                    left: "15px",
                  }}
                >
                  {el.Category}
                </span>
                <Col
                  style={{
                    minWidth: "250px",
                    maxWidth: "500px",
                    boxShadow: "0px 0px 0px 2px #ccdddd",
                    marginTop: "50px",
                    backgroundColor: index % 2 ? "#eeeeff" : "#ddddff",
                    position: "relative",
                    borderRadius: "25px",
                    top: "-5px",
                    padding: "5px",
                  }}
                  key={`Col_${el.Title}${index}`}
                >
                  <span
                    style={{
                      fontSize: "32px",
                      fontWeight: 600,
                      fontFamily: `"Montserrat", sans-serif`,
                    }}
                  >
                    {el.Title}
                    <img
                      style={{
                        maxWidth: "75px",
                        borderRadius: "25px",
                      }}
                      src={el.ImgURL}
                    ></img>
                  </span>{" "}
                  &nbsp;
                  <span>{el.Price}</span>
                  {/* <br /> */}
                  <button
                    hidden
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "25px",
                      backgroundColor: "#66CC66",
                    }}
                  >
                    <span
                      style={{
                        position: "relative",
                        left: "-12px",
                      }}
                    >
                      <FaCartPlus size="25px" color="black" />
                    </span>
                    <br />
                  </button>
                  <br />
                  <span>{el.Description}</span>
                </Col>
              </div>
            );
            tempParsedCategories.push(el.Category);
          } else {
            console.log(" Category Already Exists");
            console.log(el.Category);

            renderedMenuItemsArray.push(el.ID);
            categorizedMenuArray.splice(
              index - window.ItemCatCount,
              0,
              <Col
                style={{
                  minWidth: "250px",
                  maxWidth: "500px",
                  borderRadius: "25px",
                  boxShadow: "0px 0px 0px 2px #ccdddd",
                  backgroundColor: index % 2 ? "#eeeeff" : "#ddddff",
                  position: "relative",
                  top: "-5px",
                  margin: "5px",
                  padding: "5px",
                }}
                key={`Col_${el.Title}${index}`}
              >
                <span
                  style={{
                    fontSize: "32px",
                    fontWeight: 600,
                    fontFamily: `"Montserrat", sans-serif`,
                  }}
                >
                  {el.Title}
                </span>
                <br />
                <span>
                  <img
                    hidden={el.ImgURL === ""}
                    style={{
                      maxWidth: "75px",
                      borderRadius: "25px",
                    }}
                    src={el.ImgURL}
                  ></img>
                  <span
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                      fontFamily: `"Montserrat", sans-serif`,
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;
                    {el.Price}
                  </span>{" "}
                  <br />
                  <button
                    hidden
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "25px",
                      backgroundColor: "#66CC66",
                    }}
                  >
                    <span
                      style={{
                        position: "relative",
                        left: "-12px",
                      }}
                    >
                      <FaCartPlus size="25px" color="black" />
                    </span>
                  </button>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      fontFamily: `"Montserrat", sans-serif`,
                    }}
                  >
                    {el.Description}
                  </span>
                </span>
              </Col>
            );
          }
        }
      });
    });
    console.log("Finished Rendering");
    console.log(categorizedMenuArray);
    console.log(loadStageRef.current);
    console.log(categorizedMenuArray);
    if (loadStageRef.current === 1) {
      return categorizedMenuArray.reverse();
    } else {
      return categorizedMenuArray;
    }
  }

  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };
  return (
    <Fragment>
      <Helmet>
        <title>a`a Roots Menu</title>
        <meta
          name="description"
          content="Smoothies, Burritos, Bowls & More. @ The a`a Roots Menu."
        />
        <link rel="canonical" href="https://a-a-roots.web.app/menu" />
      </Helmet>
      <CSSTransitionGroup
        component="div"
        transitionName="TabsAnimation"
        transitionAppear={true}
        transitionAppearTimeout={0}
        transitionEnter={false}
        transitionLeave={false}
      >
        <Row
          style={{
            backgroundColor: "#eefffe",
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#eefffe",
            }}
          >
            <Card
              style={{
                zIndex: 1,
                opacity: 100,
                width: "100%",
                position: "auto",
                boxShadow: "0px 0px 0px 5px rgba(50,50,50, .8)",
                backgroundColor: "#eefffe",
                left: "auto",
                flexDirection: "column",
              }}
            >
              <CardHeader>
                <h1>a`a Roots: Menu</h1>
              </CardHeader>
              <br />

              <CardBody
                style={{
                  display: "flex",

                  float: "none",
                  maxWidth: "100%",
                }}
              >
                <div>
                  <h1> Site Under Construction </h1>

                  <br />
                  <p
                    style={{
                      float: "none",
                      maxWidth: "100%",
                    }}
                  ></p>
                  <h2>
                    <p>
                      &nbsp;For daily specials and new items, follow us on
                      Instagram or call us!
                    </p>
                  </h2>
                  <p>
                    <a
                      href="https://www.instagram.com/aarootsmaui/"
                      target="_blank"
                    >
                      <strong>@aarootsmaui</strong>
                    </a>
                    <strong> </strong>
                  </p>
                  <p>(808) 298-2499</p>
                  <p></p>
                  <p></p>
                  <p></p>
                  <p>Acai &amp; Pitaya Bowls</p>
                  <p>
                    All bowls come topped with gluten free granola. Unsweetened
                    bowls made with coconut water.
                  </p>
                  <p>$13</p>
                  <p>Napi Bowl</p>
                  <p>
                    Traditional Acai bowl topped with strawberries and bananas
                  </p>
                  <p>$8</p>
                  <p>Mini Napi</p>
                  <p>$14</p>
                  <p>Tropical</p>
                  <p>
                    Acai, banana, pineapple, coconut, crushed macadamia nuts
                  </p>
                  <p>$14</p>
                  <p>The Buzz</p>
                  <p>
                    Acai, coffee, coconut milk, banana, blueberries, dark
                    chocolate covered espresso beans, cacao nibs
                  </p>
                  <p>$14</p>
                  <p>Green Monster</p>
                  <p>Acai, green spirulina, banana, strawberry, blueberry</p>
                  <p>$15</p>
                  <p>Ka-Chava Bowl</p>
                  <p>
                    Acai, Tribal Superfood Ka-Chava (contains over 70
                    superfoods), banana, blueberries, topped with cacao nibs and
                    coconut
                  </p>
                  <p>$14</p>
                  <p>Dragon</p>
                  <p>
                    Pitaya, pineapple, banana, strawberry, topped with bananas,
                    strawberries, blueberries, and coconut
                  </p>
                  <p>$2</p>
                  <p>Additional Toppings</p>
                  <p>
                    Almond butter, peanut butter, chia seeds, cacao nibs, hemp
                    seeds, agave, maple syrup
                  </p>
                  <p>Buddha Bowls - $15</p>
                  <p>
                    All on a bed of Kumu Farms Mixed Greens. Add Tempeh, Tofu,
                    or Avocado $3, Make it a wrap $2
                  </p>
                  <p>Soba Bowl</p>
                  <p>
                    Chilled soba noodles, peanut sauce, carrots, cabbage,
                    edamame, green onion, black sesame seeds, citrus
                    vinaigrette, cilantro
                  </p>
                  <p>The Naked Summer (GF)</p>
                  <p>
                    Chilled rice noodles, peanut sauce, cucumber, cabbage,
                    carrots, mint, furikake, citrus vinaigrette, cilantro
                  </p>
                  <p>The Naked Burrito (GF)</p>
                  <p>
                    Rice, beans, salsa, cabbage, avocado cream, chipotle cream,
                    cilantro
                  </p>
                  <p>Tofu Scramble Bowl (GF)</p>
                  <p>
                    Tofu scramble, red bell pepper, rice, pico, cabbage,
                    balsamic vinaigrette, walnut parm
                  </p>
                  <p>Add Kale $2</p>
                  <p>Curry Bowl (GF)</p>
                  <p>Mixed vegetable curry of the day, rice, cilantro</p>
                  <p>Handhelds &amp; Good Stuff</p>
                  <p>$15</p>
                  <p>Breakfast Burrito</p>
                  <p>
                    Whole wheat wrap, tofu scramble, rice, black beans, cabbage,
                    salsa, avocado crema, chipotle crema
                  </p>
                  <p>$15</p>
                  <p>Curry Kale Wrap</p>
                  <p>Whole wheat wrap, rice, kale, curry of the day</p>
                  <p>$15</p>
                  <p>Tostadas (when available)</p>
                  <p>
                    2 fried corn tortillas, refried beans, mixed greens,
                    cabbage, salsa, avocado crema, chipotle crema, cilantro
                  </p>
                  <p>$16</p>
                  <p>Sassies Burger</p>
                  <p>
                    Maui tempeh, napili flo kimchi, peanut sauce on a toasted
                    bun. Comes with side salad
                  </p>
                  <p>$15</p>
                  <p>Tofu Sando</p>
                  <p>
                    Glazed tofu, caramelized onions, tomato, let&#39;s,
                    veganaise, pickles, mustard. Comes with side salad
                  </p>
                  <p></p>
                  <p>&nbsp;</p>

                  <p>Toast</p>
                  <p>GFO $3</p>
                  <p>$12</p>
                  <p>Avocado Toast</p>
                  <p>
                    2 slices sourdough, avocado, cherry tomato, micro greens,
                    lemon zest, red chili flakes, black sesame seeds, EVOO
                  </p>
                  <p>$12</p>
                  <p>Tofu Scramble Toast</p>
                  <p>
                    2 slices sourdough, tofu scramble, red bell pepper, micro
                    greens
                  </p>
                  <p>$9</p>
                  <p>Sourdough Toast</p>
                  <p>
                    Choice of peanut butter or almond butter w/ banana, maple
                    syrup drizzle
                  </p>
                  <p>Bagels</p>
                  <p>$9</p>
                  <p>Bagel Sandwich</p>
                  <p>
                    Toasted everything bagel, hummus, cucumber, tomato, avocado,
                    mixed greens
                  </p>
                  <p>$5</p>
                  <p>Toasted Bagel</p>
                  <p>
                    Plain or everything bagel, hummus or cashew cream cheese
                  </p>
                  <p>Salads - $13</p>
                  <p>Add Tempeh, Tofu, or Avocado $3, Make it a wrap $2</p>
                  <p>Kale Salad (GF)</p>
                  <p>
                    Kale, cherry tomatoes, carrots, cabbage, sunflower seeds,
                    cilantro-jalapeno tahini dressing, walnut parm
                  </p>
                  <p>Vegan Caesar (GFO)</p>
                  <p>
                    Romaine, cherry tomatoes, croutons, cashew caesar dressing,
                    walnut parm
                  </p>
                  <p>House Salad (GFO)</p>
                  <p>
                    Kumu Farms mixed greens, cherry tomatoes, onion, cabbage,
                    carrot, cucumbers, croutons, walnut parm, balsamic dressing
                  </p>
                  <p>Greek Salad</p>
                  <p>
                    Tofu feta, kalamata olives, tomatoes, cucumber, red onion,
                    greek dressing
                  </p>
                  <p>$12</p>
                  <p>Soup &amp; Salad</p>
                  <p>Soup of the day + mini salad of choice</p>
                  <p>$7</p>
                  <p>Soup</p>
                  <p>$2</p>
                  <p>Add Kale</p>
                  <p>
                    <p>Smoothies</p>
                    <p>16 oz. $9</p>
                    <p>Roots Brew</p>
                    <p>
                      Chocolate almond mylk, coffee, banana, Macarenas, cacao
                      nibs
                    </p>
                    <p>Super Matcha Mint Chip</p>
                    <p>
                      Coconut mylk, spirulina, mint, banana, matcha, cacao nibs
                    </p>
                    <p>Golden Mylk</p>
                    <p>Coconut mylk, banana, turmeric, ginger, spices</p>
                    <p>Pina-Kale-Ada</p>
                    <p>Coconut water, kale, pineapple, banana, coconut meat</p>
                    <p>Lovebug</p>
                    <p>
                      Strawberry, banana, coconut mylk, almond butter, cacao
                      nibs
                    </p>
                    <p>$12</p>
                    <p>West Side Flex (20 oz)</p>
                    <p>
                      Chocolate almond mylk, banana, Sunwarrior protein powder,
                      peanut butter, cacao nibs
                    </p>
                    <p>$6</p>
                    <p>Keiki Smoothis (12 oz)</p>
                    <p>Coconut water, strawberry, banana</p>
                  </p>
                  <p>Juices</p>
                  <p>16 oz. $9</p>
                  <p>Deep Roots</p>
                  <p>Beet, apple, carrot, ginger, lemon</p>
                  <p>Pele</p>
                  <p>Apple, carrot, lemon, ginger, cayenne</p>
                  <p>Lokai</p>
                  <p>Cucumber, celery, kale, lemon</p>
                  <p>Turmeric Tonic</p>
                  <p>Pineapple, carrot, ginger, turmeric, black pepper</p>
                  <p>Pep In-Yo Step</p>
                  <p>Pineapple, cucumber, cilantro, mint, jalapeno</p>

                  <p>Shots</p>
                  <p>$5</p>
                  <p>Turmeric &amp; Black Pepper</p>
                  <p>Ginger &amp; Lemon</p>
                  <p>Turmeric, Ginger, Lemon, &amp; Black Pepper</p>
                  <p>Spirulina &amp; Lemon</p>
                  <p>Napili Flo Kimchi Gut Shot</p>
                  <p>$13</p>
                  <p>Shot Flight (3)</p>
                </div>
              </CardBody>

              <CardBody
                style={{
                  maxWidth: "100%",
                }}
              >
                <Row>{decideRenderMenu()}</Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CSSTransitionGroup>
    </Fragment>
  );
}
