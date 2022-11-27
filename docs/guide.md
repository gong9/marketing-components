# 介绍

## 是什么？

mcp 是一个针对于营销侧的业务组件库，提供一些专注于营销领域的组件

如

- 九宫格抽奖
- 九宫格翻牌
- 老虎机
- 刮刮乐
- 大转盘
  ...

## 怎么用？

安装:

`pnpm add marketing-components-pro`

使用:

```tsx | pure
import { Lottery } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '代金券1',
  },
  {
    id: 2,
    name: '代金券2',
  },
  {
    id: 3,
    name: '代金券3',
  },
  {
    id: 4,
    name: '代金券4',
  },
  {
    id: 5,
    name: '代金券5',
  },
  {
    id: 6,
    name: '代金券6',
  },
  {
    id: 7,
    name: '代金券7',
  },
  {
    id: 8,
    name: '代金券8',
  },
];

const callback = (luckyRewards) => {
  console.log(luckyRewards.name);
};

export default () => <Lottery data={data} callback={callback} />;
```
