import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { calCustomProbabilityIndex } from '../utils';
import injectionJs2Css from '../utils/injectionJs2Css';
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
  currentHit?: number;
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

  // set style
  useEffect(() => {
    injectionJs2Css(lotteryRef, {
      background: props.lotteryGlobalStyle?.background || '#fff',
      radius: props.lotteryGlobalStyle?.radius || '5px',
      btnBackground:
        props.lotteryGlobalStyle?.btnBackground || 'rgb(226 142 11)',
      btnColor: props.lotteryGlobalStyle?.btnColor || '#fff',
      activeBackground:
        props.lotteryGlobalStyle?.activeBackground || 'rgb(121, 221, 248)',
      activeColor: props.lotteryGlobalStyle?.activeColor || '#000',
    });
  }, [props.lotteryGlobalStyle]);

  const generateItemStyle = (isBtn: boolean, item: LDataType) => {
    if (isBtn) return {};

    return {
      background: item.background || 'rgb(133 132 137)',
      color: item.textColor || '#fff',
    };
  };

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

    let luckyRewardsIndex = props.useCustomProbability
      ? path.findIndex((item) => item === luckyRewardsValue)
      : Math.floor(Math.random() * path.length);

    if (props.currentHit) {
      const index = props.data.findIndex(
        (item) => item.id === props.currentHit,
      );
      if (index !== -1) luckyRewardsIndex = index;
      else
        throw new Error('there is a problem with the current hit id specified');
    }

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
    <div ref={lotteryRef} className="lottery">
      {realViewData.map((item) => {
        return (
          <div
            className={classNames({
              'lottery-item': true,
              'is-btn': item.id === '__btn__',
              active:
                item.id !== '__btn__' && prizeActiveState[`active${item.id}`],
            })}
            style={{ ...generateItemStyle(item.id === '__btn__', item) }}
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
            <span className="award-text">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Lottery;
