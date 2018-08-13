/*global setInterval*/
/* demo.js is loaded by both index.ios.js and index.android.js */

import { random, range } from "lodash";
import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Platform,
  Text
} from "react-native";
import Svg from "react-native-svg";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryStack,
  VictoryCandlestick,
  VictoryErrorBar,
  VictoryBar,
  VictoryLine,
  VictoryArea,
  VictoryScatter,
  VictoryTooltip,
  VictoryZoomContainer,
  VictoryVoronoiContainer,
  VictorySelectionContainer,
  VictoryTheme,
  VictoryBrushContainer,
  VictoryPie,
  createContainer
} from "victory-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#e1d7cd",
    justifyContent: "center",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 50
  },
  text: {
    fontSize: 18,
    fontFamily: (Platform.OS === "ios") ? "Menlo" : "monospace",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20
  },
  heading: {
    fontSize: 27,
    fontFamily: (Platform.OS === "ios") ? "Menlo" : "monospace",
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 30
  }
});

const candleData = [
  {x: 1, open: 9, close: 30, high: 56, low: 7},
  {x: 2, open: 80, close: 40, high: 120, low: 10},
  {x: 3, open: 50, close: 80, high: 90, low: 20},
  {x: 4, open: 70, close: 22, high: 70, low: 5},
  {x: 5, open: 20, close: 35, high: 50, low: 10},
  {x: 6, open: 35, close: 30, high: 40, low: 3},
  {x: 7, open: 30, close: 90, high: 95, low: 30},
  {x: 8, open: 80, close: 81, high: 83, low: 75}
];

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: true,
      y: this.getYFunction(),
      style: this.getStyles(),
      transitionData: this.getTransitionData(),
      randomData: this.generateRandomData(),
      staticRandomData: this.generateRandomData(15),
      data: this.getData()
    };
  }
  getYFunction() {
    const n = random(2, 7);
    return (data) => Math.exp(-n * data.x) * Math.sin(2 * n * Math.PI * data.x);
  }

  generateRandomData(points = 6) {
    return range(1, points + 1).map((i) => ({x: i, y: i + random(-1, 2)}));
  }

  getData() {
    return range(1, 10).map((i) => ({x: i, y: random(1, 10)}));
  }

  getStyles() {
    const colors = [
      "red", "orange", "magenta",
      "gold", "blue", "purple"
    ];
    return {
      stroke: colors[random(0, 5)],
      strokeWidth: random(1, 5)
    };
  }

  getTransitionData() {
    const n = random(4, 10);
    return range(n).map((i) => {
      return {
        x: i,
        y: random(2, 10)
      };
    });
  }

  changeScroll(scrollEnabled) {
    this.setState({scrollEnabled});
  }

  updateDemoData() {
    this.setState({
      y: this.getYFunction(),
      style: this.getStyles(),
      transitionData: this.getTransitionData(),
      randomData: this.generateRandomData(),
      data: this.getData()
    });
  }

  componentDidMount() {
    setInterval(this.updateDemoData.bind(this), 3000);
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container} scrollEnabled={this.state.scrollEnabled}>
        <Text style={styles.heading}>{"Victory Native"}</Text>


        <Text style={styles.text}>{"<VictoryPie/>"}</Text>

        <VictoryPie
          innerRadius={75}
          labelRadius={125}
          style={{ labels: { fontSize: 20 }}}
          data={this.state.randomData}
          animate={{duration: 1500}}
        />

        <VictoryPie
          style={{
            data: {
              stroke: "none",
              opacity: 0.3
            }
          }}
        />
        <VictoryPie innerRadius={90} />
        <VictoryPie
          endAngle={90}
          startAngle={-90}
        />
        <VictoryPie
          endAngle={90}
          innerRadius={90}
          padAngle={5}
          startAngle={-90}
        />
        <VictoryPie
          style={{
            labels: {
              fill: "white",
              stroke: "none",
              fontSize: 15,
              fontWeight: "bold"
            }
          }}
          data={[
            {x: "<5", y: 6279},
            {x: "5-13", y: 9182},
            {x: "14-17", y: 5511},
            {x: "18-24", y: 7164},
            {x: "25-44", y: 6716},
            {x: "45-64", y: 4263},
            {x: "≥65", y: 7502}
          ]}
          innerRadius={70}
          labelRadius={100}
          colorScale={[
            "#D85F49",
            "#F66D3B",
            "#D92E1D",
            "#D73C4C",
            "#FFAF59",
            "#E28300",
            "#F6A57F"
          ]}
        />
        <VictoryPie
          style={{
            data: {
              stroke: (data) => data.y > 75 ? "black" : "none",
              opacity: (data) => data.y > 75 ? 1 : 0.4
            }
          }}
          data={[
            {x: "Cat", y: 62},
            {x: "Dog", y: 91},
            {x: "Fish", y: 55},
            {x: "Bird", y: 55}
          ]}
        />

        
      </ScrollView>
    );
  }
}
