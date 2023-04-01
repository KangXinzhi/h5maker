import React from "react";
import { useAtom } from "jotai";
import {
  cardsAtom,
  scrollYAtom,
  compActiveIndexAtom,
  showIframeAtom,
} from "../../../../store";

import { IComponentItemProps } from "../comList/schema";
import { Card, PreviewFooter, PreviewHeader } from "@kxz/components";
import { EmptyCard } from "./EmptyCard";
import "./index.less";
import styles from "./index.module.less";

export interface ICardProps {
  scrollY: number;
  cards: [] | IComponentItemProps[];
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>;
  showIframe: boolean;
  compActiveIndex: number | null;
  setCompActiveIndex: (compActiveIndex: number) => void;
}

const index = () => {
  const [cards, setCards] = useAtom<IComponentItemProps[] | []>(cardsAtom);
  const [scrollY] = useAtom<number>(scrollYAtom);
  const [showIframe] = useAtom<boolean>(showIframeAtom);
  const [compActiveIndex, setCompActiveIndex] = useAtom<number | null>(
    compActiveIndexAtom
  );

  // useEffect(() => {
  //   //@ts-ignore
  //   document.querySelector('.preview').style.top = `${-scrollY + 56 + 16}px`;
  // }, [scrollY])

  return (
    <div className="preview-wrap">
      <iframe
        className="preview-iframe"
        src="http://localhost:3007/preview"
        scrolling="yes"
        frameBorder="0"
        id="previewIframe"
        style={{
          visibility: showIframe ? "visible" : "hidden",
          // 调试阶段直接开启 visibility:'hidden'
          // visibility:'hidden'
        }}
      />
      <div
        className="clone-iframe"
        style={{
          visibility: !showIframe ? "visible" : "hidden",
          // 调试阶段直接开启 visibility:'visible',
          // visibility:'visible',
          top: -(scrollY ?? 0) + 56 + 16 + "px",
        }}
      >
        <div className="content">
          <PreviewHeader />
          <div className="main">
            {cards?.length > 0 ? (
              cards.map((card, index) => (
                <Card
                  key={`card-${index}`}
                  IDkey={`card-${index}`}
                  item={card}
                  index={index}
                  cards={cards}
                  setCards={setCards}
                  compActiveIndex={compActiveIndex}
                  setCompActiveIndex={setCompActiveIndex}
                />
              ))
            ) : (
              <EmptyCard
                cards={cards}
                setCards={setCards}
                setCompActiveIndex={setCompActiveIndex}
              />
            )}
          </div>
          <PreviewFooter />
        </div>
      </div>
    </div>
  );
};
export default index;
