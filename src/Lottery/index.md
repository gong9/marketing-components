---
nav:
  path: /hooks
---

# 抽奖组件

### 基本使用

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

### 自定义转动时间

将转动时间调整为 10s

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

export default () => <Lottery time={10000} data={data} callback={callback} />;
```

### 自定义概率

> 注意，如果各奖项均设置概率，请保证其概率之和为 1
>
> 如果存在没有设置概率的奖项，则其会自动均分剩余概率 「例如：只有一个奖项设置 80%，则其他 7 个奖项的概率则为 20%/7」

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

将代金券 1 和 2 的概率调整为 50%

```tsx
import { Lottery } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '代金券1',
    probability: 0.5,
  },
  {
    id: 2,
    name: '代金券2',
    probability: 0.5,
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

export default () => <Lottery data={data} useCustomProbability={true} />;
```

### 注意

本组件，仅支持九空格。即仅支持设置 8 个奖项数据

### API

#### 组件属性

| 属性                 | 说明                    | 类型         | 默认值 |
| -------------------- | ----------------------- | ------------ | ------ |
| data                 | 奖项数据                | LDataType[ ] | -      |
| useCustomProbability | 是否自定义概率 （可选） | boolean      | false  |
| time                 | 转动持续时间 （可选）   | number       | 3000   |
| callback             | 转动结束回调 （可选）   | function     | -      |

#### 单 data 属性 [LDataType]

| 属性        | 说明                                         | 类型               | 默认值 |
| ----------- | -------------------------------------------- | ------------------ | ------ |
| id          | 奖项唯一 id                                  | [ string, number ] | -      |
| name        | 奖项描述                                     | string             | -      |
| probability | 设置自定义概率之后，此奖项的命中概率（可选） | number             | 1/n    |
