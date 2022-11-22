import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import './index.scss';

type Tuple8<TItem> = [TItem, ...TItem[]] & { length: 8 };
interface LDataType {
  id: string | number;
  name: string;
  isCanHit?: boolean;
}

interface LType {
  data: Tuple8<LDataType>;
  time?: number;
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

  const start = (id: string | number) => {
    if (id !== '__btn__') return;

    const path = [0, 1, 2, 4, 7, 6, 5, 3];
    let curIndex = 0;
    let stop = false;
    const luckyRewardsIndex = Math.floor(Math.random() * path.length);

    setTimeout(() => {
      stop = true;
    }, 3000);

    const intervalId = setInterval(() => {
      if (stop && curIndex === luckyRewardsIndex) clearInterval(intervalId);
      if (curIndex > 7) curIndex = 0;

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
