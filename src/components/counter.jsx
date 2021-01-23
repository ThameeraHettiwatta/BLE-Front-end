import React, { Component } from "react";
import Logo from "../images/floor.png";
import Pointer from "../images/redDot.png";
import BlueRing from "../images/blueRing.png";
import axios from "axios";
import { ma } from "moving-averages";

class Counter extends Component {
  state = {
    x: 700,
    y: 410,
    scale: 86,
    variance: 40,
    xPositinList: [],
    yPositionList: [],
  };

  varianceStyle = {
    position: "absolute",
    top: 200,
    left: 200,
  };

  componentDidMount() {
    try {
      setInterval(async () => {
        axios
          .get(`http://localhost/ils_api/device/read_one.php?device_id=3864`)
          .then((res) => {
            let a = res.data.records[0].x_position;
            let b = res.data.records[0].y_position;
            let c = res.data.records[0].variance;
            let xPositinList = this.state.xPositinList.concat(Number(a));
            let yPositionList = this.state.yPositionList.concat(Number(b));
            const variance = c * this.state.scale;
            this.setState({ xPositinList, yPositionList, variance });
          });
      }, 500);
      setInterval(async () => {
        let xAverageList = ma(this.state.xPositinList, 5);
        let yAverageList = ma(this.state.yPositionList, 5);
        let a = xAverageList[xAverageList.length - 1];
        let b = yAverageList[yAverageList.length - 1];
        console.log(a);
        // let a_x = a * Math.cos(17) - b * Math.sin(17);
        // let b_y = a * Math.sin(17) + b * Math.cos(17);
        // const x = 450 - b_y * this.state.scale; //920
        // const y = 710 + a_x * this.state.scale; //716
        const x = 690 - b * this.state.scale; //690
        const y = 409 + a * this.state.scale; //409
        this.setState({ x, y });
        if (xAverageList.length > 20) {
          this.setState({
            xPositinList: this.state.xPositinList.slice(5),
            yPositionList: this.state.yPositionList.slice(5),
          });
        }
      }, 100);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const styles = {
      position: "absolute",
      top: this.state.x, //700px top, 410px left
      left: this.state.y,
    };
    const styleBlueRing = {
      position: "absolute",
      top: this.state.x - (this.state.variance - 30) / 2,
      left: this.state.y - (this.state.variance - 30) / 2,
    };
    return (
      <div>
        <center>
          <img src={Logo} alt="logo" width="700" />
        </center>
        <img
          style={styleBlueRing}
          src={BlueRing}
          alt="pointer"
          width={this.state.variance}
        />
        <img style={styles} src={Pointer} alt="pointer" width="30" />
      </div>
    );
  }
}

export default Counter;
