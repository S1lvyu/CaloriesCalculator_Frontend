import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loader() {
  return (
    <div>
      <ThreeCircles
        visible={true}
        height="200"
        width="200"
        color="#4fa94d"
        middleCircleColor="#FC842D"
        outerCircleColor="#FC842D"
        ariaLabel="three-circles-loading"
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translateX(-50%) translateY(-50%)",
        }}
      />
    </div>
  );
}
