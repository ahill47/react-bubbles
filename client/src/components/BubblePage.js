import React, { useState, useEffect } from "react";
import axiosWithAuth from "../components/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  axiosWithAuth()
    .get("/colors")
    .then((res) => {
      setColorList(res.data);
    })
    .catch((err) => console.log("Error: ", err));

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};
export default BubblePage;