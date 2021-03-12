import ReactDOM from "react-dom";
import React, { Component, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import Text from "./Text";
import { Button } from "./Button";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      canvasStyle: {
        width: "100vw",
        height: "100vh",
      },
    };
  }
  handleCount(value) {
    this.setState((prevState) => ({ count: prevState.count + value }));
  };

  render() {
    return (
      <>
        <Canvas
          style={this.state.canvasStyle}
          onCreated={({ gl }) => gl.setClearColor("lightblue")}
        >
          <ambientLight intensity={2} />
          <pointLight position={[40, 40, 40]} />
          <Suspense fallback={null}>
            <Text hAlign="left" position={[0, 0, 0]} children="Elie" size={3} />
            <Text
              hAlign="right"
              position={[2, 0, 0]}
              children={this.state.count.toString()}
              size={1}
            />
            <OrbitControls />
          </Suspense>
        </Canvas>
        <Button
          sign="+"
          count={this.state.count}
          updateCount={this.handleCount.bind(this)}
        />
        <Button
          sign="-"
          count={this.state.count}
          updateCount={this.handleCount.bind(this)}
        />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
