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
  const [fillState, updateFillState] = useState<boolean[]>(
    Array(props.data.length).fill(false),
  );
  const [times, updateTimes] = useState(props.times || 3);

  const filpItem = (curReward: number) => {
    if (times < 1) return;

    fillState[curReward] = true;
    updateTimes((times) => times - 1);
    updateFillState([...fillState]);

    if (times - 1 < 1) {
      setTimeout(() => {
        updateFillState(Array(props.data.length).fill(true));
      }, 500);
    }
  };

  return (
    <div className="nine-space-filp">
      {props.data.map((item, i) => {
        return (
          <div
            className={classNames({
              'nsf-item': true,
              active: fillState[i],
            })}
            key={item.id}
            onClick={() => filpItem(i)}
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
