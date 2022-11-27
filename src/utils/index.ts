type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type BaseType<T, K extends string, P extends keyof any> = Omit<T, K> & {
  [prop in K]: P;
};

type RatioType<T> = T & { ratio: number };

/**
 * Probability of each term
 */
export const calProbability = <
  T extends { probability?: number; id: number | string },
>(
  data: T[],
) => {
  let surplusProbability = 1;
  let unassignedItem: T[] = [];
  let assignedItem: T[] = [];

  data.forEach((item) => {
    if (item.probability === 0 || item.probability) {
      surplusProbability = surplusProbability - item.probability;
      assignedItem.push({
        ...item,
        probability: item.probability.toFixed(2),
      });
    } else {
      unassignedItem.push(item);
    }
  });

  return [
    ...assignedItem,
    ...unassignedItem.map((item) => {
      return {
        ...item,
        probability: (surplusProbability / unassignedItem.length).toFixed(2),
      };
    }),
  ] as BaseType<T, 'probability', number>[];
};

/**
 * Get ratios based on probabilities
 * @param data
 */
export const calRatio = <
  T extends { probability: number; id: number | string },
>(
  data: T[],
  isAllTimes: boolean,
) => {
  return data.map((item) => {
    const curRatio = Math.floor(item.probability * 100);
    if (curRatio <= 0 && isAllTimes) {
      throw new Error("「can't put it back, probability cannot < 0");
    }
    return {
      ...item,
      ratio: curRatio,
    };
  }) as RatioType<T>[];
};

export const calCustomProbabilityIndex = <
  T extends { probability?: number; id: number | string },
>(
  handleData: T[],
  isGetId?: boolean,
) => {
  if (handleData.length <= 0) {
    throw new Error('计算概率值出错');
  }

  let tempArr: number[] = [];
  const notHandleItems = [];
  let surplus = 1;

  for (let i = 0; i < handleData.length; i++) {
    if (handleData[i].probability === 0) continue;
    if (handleData[i].probability) {
      surplus = surplus - (handleData[i].probability as number);
      tempArr = [
        ...tempArr,
        ...Array(Math.floor((handleData[i].probability as number) * 100)).fill(
          isGetId ? handleData[i].id : i,
        ),
      ];
    } else {
      notHandleItems.push(handleData[i]);
    }
  }

  if (surplus > 0) {
    notHandleItems.forEach((item) => {
      tempArr = [
        ...tempArr,
        ...Array(
          Math.floor(Math.floor((surplus / notHandleItems.length) * 100)),
        ).fill(isGetId ? item.id : item),
      ];
    });
  }

  return tempArr[Math.floor(Math.random() * tempArr.length)];
};

export const generatePatioArr = <
  T extends {
    ratio: number;
    id: number | string;
  },
>(
  data: T[],
) => {
  let patioArr: (string | number)[] = [];

  data.forEach((item) => {
    patioArr = [...patioArr, ...Array(item.ratio).fill(item.id)];
  });

  return patioArr;
};

/**
 * Calculated from a ratio
 * @param data
 */
export const calProbabilityFromRatio = <
  T extends { ratio: number; id: number | string },
>(
  data: T[],
) => {
  const patioArr: (string | number)[] = generatePatioArr(data);

  return patioArr[Math.floor(Math.random() * patioArr.length)];
};

/**
 * Probability calculation of 「can't put it back」
 * @returns
 */
export const calCustomProbabilityPro = <
  T extends { probability?: number; id: number | string },
>(
  data: T[],
  isAllTimes = false,
) => {
  return calProbabilityFromRatio(calRatio(calProbability(data), isAllTimes));
};
