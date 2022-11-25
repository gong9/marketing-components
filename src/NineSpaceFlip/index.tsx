import classNames from 'classnames';
import React, { useState } from 'react';
import './index.scss';

interface NSFItemType {
  id: number | string;
  name: string;
}
interface NSFType {
  data: NSFItemType[];
  times?: number;
}

const NineSpaceFlip = (props: NSFType) => {
  const [fillState, updateFillState] = useState<any>(
    props.data.reduce(
      (pre, cur) => ({
        ...pre,
        ['active' + cur.id]: false,
      }),
      {},
    ),
  );

  const [times, updateTimes] = useState(props.times || 3);

  const filpItem = (curReward: NSFItemType) => {
    if (times < 1) return;

    updateTimes((times) => times - 1);
    updateFillState({
      ...fillState,
      [`active${curReward.id}`]: true,
    });

    if (times - 1 < 1) {
      setTimeout(() => {
        updateFillState(
          props.data.reduce(
            (pre, cur) => ({
              ...pre,
              ['active' + cur.id]: true,
            }),
            {},
          ),
        );
      }, 500);
    }
  };

  return (
    <div className="nine-space-filp">
      {props.data.map((item) => {
        return (
          <div
            className={classNames({
              'nsf-item': true,
              active: fillState[`active${item.id}`],
            })}
            key={item.id}
            onClick={() => filpItem(item)}
          >
            <div className="nsf-item-outside">奖</div>
            <div className="nsf-item-inside">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NineSpaceFlip;
