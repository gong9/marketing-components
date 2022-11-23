import classNames from 'classnames';
import React, { useState } from 'react';
import './index.scss';

interface NSFItemType {
  id: number | string;
  name: string;
}
interface NSFType {
  data: NSFItemType[];
}

const NineSpaceFlip = (props: NSFType) => {
  const [fillState, updateFillState] = useState<boolean[]>(
    Array(props.data.length).fill(false),
  );

  const filpItem = (curReward: number) => {
    fillState[curReward] = true;
    updateFillState([...fillState]);
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
            <div className="nsf-item-outside">抽奖</div>
            <div className="nsf-item-inside">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NineSpaceFlip;
