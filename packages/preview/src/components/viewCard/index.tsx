import { FC, useMemo } from "react";
import { useRef } from "react";
import classnames from "classnames";
import "./index.less";
import styles from "./index.module.less";

export interface IComponentItemProps {
  text: string; // 组件区中组件的名称
  name: string; // 组件区中组件的的key
  icon: string; // 组件区中组件的icon地址
  config: {
    label: string; // 配置区中title名称
    type: string; // 配置区组件类型
    format: string;
    value?: string;
    config?: {
      // 默认配置项
      icon: string;
      name?: string;
      style?: React.CSSProperties;
      tooltip: string;
    };
    configOptions?: {
      // 配置区中组件配置列表
      icon: string;
      name?: string;
      style?: React.CSSProperties;
      tooltip: string;
    }[];
  }[];
}

export interface CardProps {
  item: IComponentItemProps;
  index: number;
  cards: [] | IComponentItemProps[];
  setCards: React.Dispatch<React.SetStateAction<[] | IComponentItemProps[]>>;
  IDkey: string;
}

export const ViewCard: FC<CardProps> = ({
  item,
  IDkey,
  cards,
  index,
  setCards,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const titleTextStyle = useMemo(() => {
    let result: any = {};

    if (item.name === "titleText") {
      item?.config.forEach((_item: any) => {
        if (_item.config) {
          result[_item.format] = _item.config.style;
        }
      });
    }

    return result;
  }, [item]);

  const shopInfoStyle = item.config.filter(
    (_item) => _item.type === "legend-style-shop"
  )[0]?.config?.name;
  const shopInfoBackground = item.config.filter(
    (_item) => _item.type === "image"
  )[0]?.value;
  const shopName = item.config.filter((_item) => _item.format === "shopName")[0]
    ?.value;
  const shopInfo = item.config.filter((_item) => _item.format === "shopInfo")[0]
    ?.value;

  return (
    <div ref={ref} className={classnames("card3-container")}>
      {item.name === "titleText" && (
        <div className={styles["title-text-container"]}>
          {item?.config.map((item2, index2) => {
            return (
              <div
                key={`titleText-${index2}`}
                className={styles["title-text-item"]}
                style={titleTextStyle["position"]}
              >
                {item2.type === "input" && (
                  <span
                    className={styles["title-text"]}
                    style={titleTextStyle["title-size"]}
                  >
                    {item2.value}
                  </span>
                )}
                {item2.type === "textarea" && (
                  <span
                    className={styles["content-text"]}
                    style={titleTextStyle["content-size"]}
                  >
                    {item2.value}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {item.name === "shopInfo" && (
        // @ts-ignore
        <div className={styles[shopInfoStyle]}>
          <div
            className={styles["shopInfo-image"]}
            style={{
              background: `url(${shopInfoBackground}) no-repeat center center`,
            }}
          >
            <div className={styles["image-mask"]} />
          </div>
          <div className={styles["shopInfo-text-container"]}>
            <img src="https://img.yzcdn.cn/upload_files/2021/01/11/FuS7UjK06564M1CD8817mQPtu81Q.png" />
            <div className={styles["shopInfo-text"]}>
              <div>{shopName}</div>
              <div>{shopInfo}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
