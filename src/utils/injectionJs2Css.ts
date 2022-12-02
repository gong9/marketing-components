interface DataType {
  [key: string]: unknown;
}

const injectionJs2Css = (
  nodeRef: React.RefObject<HTMLDivElement>,
  data: DataType,
) => {
  const newData: DataType = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key))
      newData[`--${key}`] = data[key];
  }

  if (nodeRef.current) {
    for (const key in newData) {
      if (Object.prototype.hasOwnProperty.call(newData, key))
        (nodeRef.current as HTMLElement).style.setProperty(
          key,
          newData[key] as string,
        );
    }
  }
};

export default injectionJs2Css;
