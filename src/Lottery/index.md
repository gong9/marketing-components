---
nav:
  path: /hooks
---

# 抽奖组件

### 不使用自定义概率

默认抽取到每一项奖励的概率都是相等的，均为 1/8

```tsx
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

### 使用自定义概率

将代金券 4 的概率调整为 80%

```tsx
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
    probability: 0.8,
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

export default () => <Lottery data={data} useCustomProbability={true} />;
```
