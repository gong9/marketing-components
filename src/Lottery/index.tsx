import classNames from 'classnames';
import React, { useMemo } from 'react';
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

  return (
    <div className="lottery">
      {realViewData.map((item) => {
        return (
          <div
            className={classNames({
              'lottery-item': true,
              'is-btn': item.id === '__btn__',
            })}
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
