import React, { useState, useEffect } from "react";
import "./index.css";

let id = 0;
const View = () => {
  const [currentCacheCopm, setCurrentCacheCopm] = useState([]);

  // useEffect(() => {
  //   getCompsInfo();
  // }, []);

  /** 读取组件信息 */
  // const getCompsInfo = async () => {
  //   let data = null;
  //   try {
  //     data = await getSchema();
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   data && setCurrentCacheCopm(data.resData.currentCacheCopm);
  // };

  return (
    <div className="view">
      2
    </div>
  );
};

export default View;
