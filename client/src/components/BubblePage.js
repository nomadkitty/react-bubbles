import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [update, setUpdate] = useState(false)
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        console.log(res)
        setColorList(res.data)
      })
      .catch(err => console.log(err))
  },[update])

  const handleUpdate = () => {
    setUpdate(!update);
  }

  return (
    <>
      <ColorList colors={colorList} handleUpdate={handleUpdate}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
