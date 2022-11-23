---
nav:
  path: /hooks
---

# 九宫格翻牌

### 基本使用

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
