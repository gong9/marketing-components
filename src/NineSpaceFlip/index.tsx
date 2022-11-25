import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { calCustomProbabilityIndex } from '../utils';
import './index.scss';

interface NSFItemType {
  id: number | string;
  name: string;
  probability?: number;
}
interface NSFType {
  data: NSFItemType[];
  times?: number;
  useCustomProbability?: boolean;
}

interface LocationRecordMapType {
  index: number;
  awardData: NSFItemType;
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

  const [curAwards, updateCurAwards] = useState([...props.data]);

  const times = useRef(props.times || 3);
  const locationRecordMap = useRef<LocationRecordMapType[]>([]);
  const curSurplusDataArr = useRef<NSFItemType[]>([]);

  useEffect(() => {
    updateCurAwards([...props.data]);
    curSurplusDataArr.current = [...props.data];
  }, [props.data]);

  const reprocessDataOrder = (
    curHitAwardId: number | string,
    index: number,
  ) => {
    locationRecordMap.current.push({
      awardData: props.data.find(
        (item) => item.id === curHitAwardId,
      ) as NSFItemType,
      index: index,
    });

    let lastAwardsDataLocation = Array(9).fill(undefined);

    locationRecordMap.current.forEach((item) => {
      lastAwardsDataLocation[item.index] = item.awardData;
    });

    curSurplusDataArr.current = curSurplusDataArr.current
      .map((item) => {
        if (curHitAwardId !== item.id) {
          return item;
        } else {
          return undefined;
        }
      })
      .filter((item) => item) as NSFItemType[];

    let surplusDataArrIndex = 0;

    lastAwardsDataLocation = lastAwardsDataLocation.map((item) => {
      if (item) {
        return item;
      } else {
        return curSurplusDataArr.current[surplusDataArrIndex++];
      }
    });

    updateCurAwards(lastAwardsDataLocation);
  };

  const filpItem = (curReward: NSFItemType, index: number) => {
    if (times.current < 1) return;

    times.current--;

    // calculated value
    const curHitAwardId = props.useCustomProbability
      ? calCustomProbabilityIndex<NSFItemType>(curSurplusDataArr.current, true)
      : curReward.id;

    // use custom probability,reposition location required
    if (props.useCustomProbability) {
      reprocessDataOrder(curHitAwardId, index);
    }

    updateFillState({
      ...fillState,
      [`active${curHitAwardId}`]: true,
    });

    if (times.current === 0) {
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
      {curAwards.map((item, index) => {
        return (
          <div
            className={classNames({
              'nsf-item': true,
              active: fillState[`active${item.id}`],
            })}
            key={item.id}
            onClick={() => filpItem(item, index)}
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
