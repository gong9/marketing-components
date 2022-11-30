import { useEffect } from 'react';
interface StyleObjType {
  [key: string]: any;
}

const useSetStyle = <
  P extends React.RefObject<HTMLElement>,
  V extends StyleObjType,
>(
  node: P,
  styleObj: V,
  deps: unknown[] = [],
) => {
  useEffect(() => {
    for (const key in styleObj) {
      if (Object.prototype.hasOwnProperty.call(styleObj, key)) {
        if (node.current) {
          node.current.setAttribute(key, styleObj[key]);
        }
      }
    }
  }, deps);
};

export default useSetStyle;
