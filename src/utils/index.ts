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

  console.log(tempArr);

  return tempArr[Math.floor(Math.random() * tempArr.length)];
};
