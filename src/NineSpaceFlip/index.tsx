import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { calCustomProbabilityPro } from '../utils';
import './index.scss';

export interface NSFItemType {
  id: number | string;
  name: string;
  probability?: number;
  [propName: string]: unknown;
}

interface NSFType {
  data: NSFItemType[];
  times?: number;
  useCustomProbability?: boolean;
  currentHitAfter?: (hitAward: NSFItemType) => void;
  allHitAfter?: (hitAwardArr: NSFItemType[]) => void;
}

interface LocationRecordMapType {
  index: number;
  awardData: NSFItemType;
}

enum FillState {
  Close,
  Open,
  NotSelected,
}

const NineSpaceFlip = (props: NSFType) => {
  const [fillState, updateFillState] = useState<any>(
    props.data.reduce(
      (pre, cur) => ({
        ...pre,
        ['active' + cur.id]: FillState.Close,
      }),
      {},
    ),
  );

  const curAwards = useRef([...props.data]);
  const times = useRef(props.times || 3);
  const locationRecordMap = useRef<LocationRecordMapType[]>([]);
  const curSurplusDataArr = useRef<NSFItemType[]>([]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      props.times &&
      (props.times > 9 || props.times < 1)
    )
      throw new Error('NineSpaceFlip times invalid');
  }, [props.times]);

  useEffect(() => {
    curAwards.current = [...props.data];
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

    let surplusDataArrIndex = 0;

    lastAwardsDataLocation = lastAwardsDataLocation.map((item) => {
      if (item) {
        return item;
      } else {
        return curSurplusDataArr.current[surplusDataArrIndex++];
      }
    });

    curAwards.current = lastAwardsDataLocation;
  };

  const filpItem = (curReward: NSFItemType, index: number) => {
    if (times.current < 1) return;

    times.current--;

    // calculated value
    const curHitAwardId = props.useCustomProbability
      ? calCustomProbabilityPro<NSFItemType>(
          curSurplusDataArr.current,
          props.times === 9,
        )
      : curReward.id;

    curSurplusDataArr.current = curSurplusDataArr.current
      .map((item) => {
        if (curHitAwardId !== item.id) {
          return item;
        } else {
          return undefined;
        }
      })
      .filter((item) => item) as NSFItemType[];

    // use custom probability,reposition location required
    if (props.useCustomProbability) {
      reprocessDataOrder(curHitAwardId, index);
    }

    updateFillState({
      ...fillState,
      [`active${curHitAwardId}`]: FillState.Open,
    });

    if (times.current === 0 && curSurplusDataArr.current.length > 0) {
      setTimeout(() => {
        updateFillState(
          curSurplusDataArr.current.reduce(
            (pre, cur) => ({
              ...pre,
              ['active' + cur.id]: FillState.NotSelected,
            }),
            {},
          ),
        );
      }, 500);
    }
  };

  return (
    <div className="nine-space-filp">
      {curAwards.current.map((item, index) => {
        return (
          <div
            className={classNames({
              'nsf-item': true,
              'not-seleted':
                fillState[`active${item.id}`] === FillState.NotSelected,
              active: fillState[`active${item.id}`] !== FillState.Close,
            })}
            key={index}
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
