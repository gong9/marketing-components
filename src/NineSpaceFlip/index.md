---
nav:
  path: /hooks
---

# 九宫格翻牌

### 基本使用

不做任何设置，默认数据奖项的放置顺序和页面卡片的摆放顺序是一致的

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

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
  {
    id: 9,
    name: '代金券9',
  },
];

const callback = (luckyRewards) => {
  console.log(luckyRewards.name);
};

export default () => <NineSpaceFlip data={data} />;
```

### 设置概率

设置概率之后，真实奖项数据的放置顺序和页面上卡片的摆放顺序不再一致

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '代金券1',
    probability: 0.5,
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
  {
    id: 9,
    name: '代金券9',
  },
];

export default () => <NineSpaceFlip data={data} useCustomProbability={true} />;
```
