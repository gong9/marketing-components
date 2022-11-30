import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSetStyle } from '../hooks';
import { calCustomProbabilityIndex } from '../utils';
import './index.scss';

type CallbackType = (arg: LDataType) => void;
export interface LDataType {
  id: string | number;
  name: string;
  probability?: number;
  background?: string;
  awardIcon?: string;
  textColor?: string;
  [propName: string]: unknown;
}

interface LotteryGlobalStyleType {
  background?: string;
  radius?: string;
  btnBackground?: string;
  btnColor?: string;
  activeBackground?: string;
  activeColor?: string;
}

interface LType {
  data: LDataType[];
  time?: number;
  useCustomProbability?: boolean;
  callback?: CallbackType;
  path?: number[];
  lotteryGlobalStyle?: LotteryGlobalStyleType;
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
  const lotteryRef = useRef<HTMLDivElement>(null);
  const lotteryBtnRef = useRef<HTMLDivElement | null>(null);

  // set style
  useSetStyle(
    lotteryRef,
    {
      background: props.lotteryGlobalStyle?.background,
      borderRadius: props.lotteryGlobalStyle?.radius,
    },
    [props.lotteryGlobalStyle],
  );

  useSetStyle(
    lotteryBtnRef,
    {
      background: props.lotteryGlobalStyle?.btnBackground,
      color: props.lotteryGlobalStyle?.btnColor,
    },
    [props.lotteryGlobalStyle],
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

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && props.data.length !== 8) {
      throw new Error(
        'lottery awards arr length invalid,the group length of the number of awards can only be equal to 8',
      );
    }
  }, [props.data]);

  const start = (id: string | number) => {
    if (id !== '__btn__') return;
    if (!flag.current) return;

    flag.current = false;

    const path = props.path || [0, 1, 2, 4, 7, 6, 5, 3];
    let curIndex = 0;
    let stop = false;
    let luckyRewardsValue: number;

    if (props.useCustomProbability) {
      luckyRewardsValue = calCustomProbabilityIndex<LDataType>(props.data);
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
    <div
      ref={lotteryRef}
      className="lottery"
      style={{
        background: props.lotteryGlobalStyle?.background,
      }}
    >
      {realViewData.map((item) => {
        return (
          <div
            className={classNames({
              'lottery-item': true,
              'is-btn': item.id === '__btn__',
              active:
                item.id !== '__btn__' && prizeActiveState[`active${item.id}`],
            })}
            ref={(node) => {
              if (item.id === '__btn__') {
                lotteryBtnRef.current = node;
              }
            }}
            style={{ background: item.background }}
            onClick={() => start(item.id)}
            key={item.id}
          >
            {item.awardIcon && (
              <img
                className="award-icon"
                src={item.awardIcon}
                alt="awardIcon"
              />
            )}
            <span
              className="award-text"
              style={{ color: item.textColor || 'azure' }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Lottery;
