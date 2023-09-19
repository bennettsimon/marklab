import React from "react";
import LoopImg from "./loopImg";

function BackgroundContainer() {
  return (
    <div className="h-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6 w-full m-auto">
      <LoopImg
        imgArr={[
          require("../../../../asset/img/1.jpeg"),
          require("../../../../asset/img/2.jpeg"),
          require("../../../../asset/img/3.jpeg"),
          require("../../../../asset/img/4.jpeg"),
        ]}
        direction="top"
      />
      <LoopImg
        imgArr={[
          require("../../../../asset/img/5.jpeg"),
          require("../../../../asset/img/6.jpeg"),
          require("../../../../asset/img/7.jpeg"),
          require("../../../../asset/img/8.jpeg"),
        ]}
        direction="bottom"
      />
      <LoopImg
        className="hidden md:flex"
        imgArr={[
          require("../../../../asset/img/4.jpeg"),
          require("../../../../asset/img/3.jpeg"),
          require("../../../../asset/img/2.jpeg"),
          require("../../../../asset/img/1.jpeg"),
        ]}
        direction="top"
      />
      <LoopImg
        className="hidden md:flex"
        imgArr={[
          require("../../../../asset/img/8.jpeg"),
          require("../../../../asset/img/7.jpeg"),
          require("../../../../asset/img/6.jpeg"),
          require("../../../../asset/img/5.jpeg"),
        ]}
        direction="bottom"
      />
      <LoopImg
        className="hidden md:flex"
        imgArr={[
          require("../../../../asset/img/1.jpeg"),
          require("../../../../asset/img/2.jpeg"),
          require("../../../../asset/img/3.jpeg"),
          require("../../../../asset/img/4.jpeg"),
        ]}
        direction="top"
      />
      <LoopImg
        className="hidden lg:flex"
        imgArr={[
          require("../../../../asset/img/5.jpeg"),
          require("../../../../asset/img/6.jpeg"),
          require("../../../../asset/img/7.jpeg"),
          require("../../../../asset/img/8.jpeg"),
        ]}
        direction="bottom"
      />
      <LoopImg
        className="hidden lg:flex"
        imgArr={[
          require("../../../../asset/img/3.jpeg"),
          require("../../../../asset/img/4.jpeg"),
          require("../../../../asset/img/5.jpeg"),
          require("../../../../asset/img/6.jpeg"),
        ]}
        direction="top"
      />
    </div>
  );
}

export default BackgroundContainer;
