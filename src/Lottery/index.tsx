import classNames from 'classnames';
import React, { useMemo, useRef, useState } from 'react';
import './index.scss';

type Tuple8<TItem> = [TItem, ...TItem[]] & { length: 8 };
type CallbackType = (arg: LDataType) => void;
interface LDataType {
  id: string | number;
  name: string;
  probability?: number;
}

interface LType {
  data: Tuple8<LDataType>;
  time?: number;
  useCustomProbability?: boolean;
  callback?: CallbackType;
}

const Lottery = (props: LType) => {
  const [prizeActiveState, setPrizeActiveState] = useState<any>(
    props.data.reduce(
      (pre, cur) => ({
        ...pre,
        ['active' + cur.id]: false,
      }),
      {},
    ),
  );

  const flag = useRef(true);

  const realViewData = useMemo(() => {
    return [
      ...props.data.slice(0, 4),
      {
        id: '__btn__',
        name: '抽奖',
      },
      ...props.data.slice(4),
    ];
  }, [props.data]);

  const calCustomProbabilityIndex = () => {
    const handleData = props.data;
    let tempArr: number[] = [];
    const notHandleItems = [];
    let surplus = 1;

    for (let i = 0; i < handleData.length; i++) {
      if (handleData[i].probability === 0) continue;
      if (handleData[i].probability) {
        surplus = surplus - (handleData[i].probability as number);
        tempArr = [
          ...tempArr,
          ...Array(
            Math.floor((handleData[i].probability as number) * 100),
          ).fill(i),
        ];
      } else {
        notHandleItems.push(i);
      }
    }

    if (surplus > 0) {
      notHandleItems.forEach((item) => {
        tempArr = [
          ...tempArr,
          ...Array(
            Math.floor(Math.floor((surplus / notHandleItems.length) * 100)),
          ).fill(item),
        ];
      });
    }

    return tempArr[Math.floor(Math.random() * tempArr.length)];
  };

  const start = (id: string | number) => {
    if (id !== '__btn__') return;
    if (!flag.current) return;

    flag.current = false;

    const path = [0, 1, 2, 4, 7, 6, 5, 3];
    let curIndex = 0;
    let stop = false;
    let luckyRewardsValue: number;

    if (props.useCustomProbability) {
      luckyRewardsValue = calCustomProbabilityIndex();
    }

    const luckyRewardsIndex = props.useCustomProbability
      ? path.findIndex((item) => item === luckyRewardsValue)
      : Math.floor(Math.random() * path.length);

    setTimeout(() => {
      stop = true;
    }, props.time || 3000);

    const intervalId = setInterval(() => {
      if (curIndex > 7) curIndex = 0;

      if (stop && curIndex === luckyRewardsIndex) {
        flag.current = true;
        clearInterval(intervalId);

        if (props.callback) {
          (props.callback as CallbackType)(props.data[path[curIndex]]);
        }
      }

      setPrizeActiveState(
        props.data.reduce((pre, cur) => {
          if (cur.id === props.data[path[curIndex]].id) {
            return {
              ...pre,
              ['active' + cur.id]: true,
            };
          } else {
            return {
              ...pre,
              ['active' + cur.id]: false,
            };
          }
        }, {}),
      );

      curIndex++;
    }, 100);
  };

  return (
    <div className="lottery">
      {realViewData.map((item) => {
        return (
          <div
            className={classNames({
              'lottery-item': true,
              'is-btn': item.id === '__btn__',
              active:
                item.id !== '__btn__' && prizeActiveState[`active${item.id}`],
            })}
            onClick={() => start(item.id)}
            key={item.id}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default Lottery;
