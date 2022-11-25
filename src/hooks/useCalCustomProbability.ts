// import { useRef } from 'react';
// import { calCustomProbabilityIndex } from '../utils';
// const useCalCustomProbability = <
//   T extends { probability?: number; id: number | string },
// >(
//   handleData: T[],
// ) => {
//   const afterHandle = useRef([]);

//   let curVal: number | string | null = null;

//   const calc = (curData: T[]) => {
//     const awardId = calCustomProbabilityIndex(curData, true);
//     (curData.find((item) => item.id) as T).probability;
//   };

//   return [curVal, calc];
// };
