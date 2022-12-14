import classNames from 'classnames';
import { throttle } from 'poor-utils-pro';
import React, { useEffect, useRef, useState } from 'react';
import { calCustomProbabilityPro } from '../utils';
import injectionJs2Css from '../utils/injectionJs2Css';
import './index.scss';

interface NSFItemType {
  id: number | string;
  name: string;
  probability?: number;
  [propName: string]: unknown;
}

interface NsfGlobalStyleType {
  outsideBackground?: string;
  outsideColor?: string;
  insideBackground?: string;
  insideColor?: string;
  insideIcon?: string;
  uncheckedBackground?: string;
  uncheckedColor?: string;
}

interface NSFType {
  data: NSFItemType[];
  times?: number;
  useCustomProbability?: boolean;
  nsfGlobalStyle?: NsfGlobalStyleType;
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
  const curHitDataArr = useRef<NSFItemType[]>([]);
  const nsfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'development' &&
      props.times &&
      (props.times > 9 || props.times < 1)
    )
      throw new Error('nine-space-flip times invalid');
  }, [props.times]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && props.data.length !== 9) {
      throw new Error(
        'nine-space-flip awards arr length invalid,the group length of the number of awards can only be equal to 9',
      );
    }

    curAwards.current = [...props.data];
    curSurplusDataArr.current = [...props.data];
  }, [props.data]);

  useEffect(() => {
    injectionJs2Css(nsfRef, {
      outsideBackground:
        props.nsfGlobalStyle?.outsideBackground || 'rgb(222, 220, 220)',
      outsideColor: props.nsfGlobalStyle?.outsideColor,
      insideBackground:
        props.nsfGlobalStyle?.insideBackground || 'rgb(233, 238, 188)',
      insideColor: props.nsfGlobalStyle?.insideColor,
      insideIcon: props.nsfGlobalStyle?.insideIcon,
      uncheckedBackground:
        props.nsfGlobalStyle?.uncheckedBackground || 'rgb(214, 214, 211)',
      uncheckedColor: props.nsfGlobalStyle?.uncheckedColor,
    });
  }, [props.nsfGlobalStyle]);

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

  const filpItem = throttle((curReward: NSFItemType, index: number) => {
    if (times.current < 1) return;
    if (
      curHitDataArr.current.findIndex((item) => item.id === curReward.id) !== -1
    )
      return;

    times.current--;

    // calculated value
    const curHitAwardId = props.useCustomProbability
      ? calCustomProbabilityPro<NSFItemType>(
          curSurplusDataArr.current,
          props.times === 9,
        )
      : curReward.id;

    curHitDataArr.current.push(
      props.data.find((item) => item.id === curHitAwardId) as NSFItemType,
    );

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

    setTimeout(() => {
      if (props.currentHitAfter) {
        props.currentHitAfter(
          props.data.find((item) => item.id === curHitAwardId) as NSFItemType,
        );
      }

      if (times.current === 0 && props.allHitAfter)
        props.allHitAfter(curHitDataArr.current);
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
  }, 10);

  return (
    <div className="nine-space-filp" ref={nsfRef}>
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
            <div className="nsf-item-outside">???</div>
            <div className="nsf-item-inside">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default NineSpaceFlip;
