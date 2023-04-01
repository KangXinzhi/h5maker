import React, { useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { useUpdateEffect } from "ahooks";
import { debounce } from "lodash";
import { Card, PreviewHeader, PreviewFooter } from "@kxz/components";

import { HTML5Backend } from "react-dnd-html5-backend";

import "./index.less";
import classNames from "classnames";

const Home = () => {
  const [cards, setCards] = useState([]); // all component
  const [compActiveIndex, setCompActiveIndex] = useState<number | null>(null); // 画布中当前正选中的组件
  useUpdateEffect(() => {
    window.parent.postMessage(
      { compActiveIndex: compActiveIndex, cards: cards },
      "*"
    );
  }, [compActiveIndex]);

  //监听父页面 传过来的postmessage
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.origin === "http://localhost:3000") {
        const { compActiveIndex, cards } = e.data;
        compActiveIndex != null && setCompActiveIndex(compActiveIndex);
        cards && setCards(cards);
      }
    });

    window.addEventListener(
      "scroll",
      debounce(() => {
        const scrollY =
          document.documentElement.scrollTop || document.body.scrollTop;
        console.log("scrollY2", scrollY);
        window.parent.postMessage({ scrollY }, "*");
      }, 500)
    );
  }, []);

  function handleDelete() {
    const filteredCards = cards.filter(
      (card, index) => index !== compActiveIndex
    );
    setCards(filteredCards);
  }

  function handleMoveTop() {
    if (compActiveIndex === null || compActiveIndex === 0) {
      return; // 没有选中组件或者选中组件已经在最上层，不需要操作
    }

    // 先将选中组件从原来的位置删除
    const newCards = [...cards];
    const removedCard = newCards.splice(compActiveIndex, 1)[0];

    // 将选中组件插入到上一层
    newCards.splice(compActiveIndex - 1, 0, removedCard);

    // 更新组件状态
    setCards(newCards);
    setCompActiveIndex(compActiveIndex - 1);
  }

  function handleMoveBottom() {
    if (compActiveIndex === null || compActiveIndex === cards.length - 1) {
      return; // 没有选中组件或者选中组件已经在最下层，不需要操作
    }

    // 先将选中组件从原来的位置删除
    const newCards = [...cards];
    const removedCard = newCards.splice(compActiveIndex, 1)[0];

    // 将选中组件插入到下一层
    newCards.splice(compActiveIndex + 1, 0, removedCard);

    // 更新组件状态
    setCards(newCards);
    setCompActiveIndex(compActiveIndex + 1);
  }

  return (
    <div className="preview">
      <div className="content">
        <PreviewHeader />
        <div className="main">
          <DndProvider backend={HTML5Backend}>
            {cards.map((card, index) => (
              <div className="card-home-container" key={`card-${index}`}>
                <Card
                  IDkey={`card-${index}`}
                  item={card}
                  index={index}
                  cards={cards}
                  setCards={setCards}
                  compActiveIndex={compActiveIndex}
                  setCompActiveIndex={setCompActiveIndex}
                />
                <div
                  className={classNames("home-menu-com", {
                    "home-menu-com-active": compActiveIndex === index,
                  })}
                >
                  <div className="com-operate-img" onClick={handleMoveTop}>
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/FueYv1jc5D0AkaF0v3K4diy1DPKG.png" />
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/FiCbRaJrUuZ0Kq8omORfu_MGImQQ.png" />
                    <div className="widget-name">向上移动</div>
                  </div>
                  <div className="com-operate-img" onClick={handleMoveBottom}>
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/FrIFvEtzBFK3edruBVYb-2Is6ym7.png" />
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/Fr56P014sFYH7UU-n9lFQuejD-iw.png" />
                    <div className="widget-name">向下移动</div>
                  </div>
                  <div className="com-operate-img" onClick={handleDelete}>
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/Fn8qANLH3hZN30maWPVmk6goG73i.png" />
                    <img src="https://img01.yzcdn.cn/upload_files/2022/10/24/FtaT4fXMboDRYwZygIs-skruxzSk.png" />
                    <div className="widget-name">删除</div>
                  </div>
                </div>
              </div>
            ))}
          </DndProvider>
        </div>
        <PreviewFooter />
      </div>
    </div>
  );
};

export default Home;
