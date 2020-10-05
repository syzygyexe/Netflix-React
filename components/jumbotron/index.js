import React from "react";
import {
  Container,
  Inner,
  Item,
  Pane,
  Title,
  SubTitle,
  Image,
} from "./styles/jumbotron";

// If no direction is passed. default: flex-direction = "row".
// ...restProps applies first object/value/etc passed by user. <Inner anyprop={anyvalue} />
function Jumbotron({ children, direction = "row", ...restProps }) {
  return (
    //   Width 100%
    <Item direction={direction} {...restProps}>
      {/* Width 1000px or so */}
      <Inner>{children}</Inner>
    </Item>
  );
}

// Tree for Jumbotron. Basically it contain all Jumbotron components.
Jumbotron.Container = function Jumbotron({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Jumbotron.Pane = function JumbotronPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

Jumbotron.Title = function JumbotronTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Jumbotron.SubTitle = function JumbotronSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Jumbotron.Image = function JumbotronImage({ ...restProps }) {
  return <Image {...restProps} />;
};

export default Jumbotron;
