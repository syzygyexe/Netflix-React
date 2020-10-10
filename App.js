import React from "react";
import JumboData from "./fixtures/jumbo";
import Jumbotron from "./components/jumbotron/index";
d
function App() {
  return (
    <Jumbotron.Container>
      {JumboData.map((item) => (
        // We are taking item.id and item.direction from jumbo.json
        <Jumbotron key={item.id} direction={item.direction}>
          {/* Left hand-side */}
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          {/* Right hand-side */}
          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
}

export default App;
