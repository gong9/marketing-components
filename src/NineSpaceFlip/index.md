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

export default () => <NineSpaceFlip data={data} />;
```

### 自定义翻奖次数

翻奖次数默认 3 次，可自定义次数。 次数合法区间为[1-9]

把次数定义为 9 次

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

export default () => <NineSpaceFlip data={data} times={9} />;
```

### 自定义样式

todo

### 自定义样式

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

export default () => <NineSpaceFlip data={data} nsfGlobalStyle={{}} />;
```

### 自定义概率

设置概率之后，真实奖项数据的放置顺序和页面上卡片的摆放顺序不再一致

注意：如果设置抽奖次数为 9，则不可以存在某一项的概率被设置为 0。 并且全部概率仅处理 2 位小数 「ps 0.001 会自动 fixd(2)」

> 同时此处的概率属于「不可放回」式，每一轮的概率都是在改变的。
>
> 如下面例子，给代金券 1 设置概率为 50%时，是指的是其在全部未开奖时的概率为 50%「其他占 1/2 \* 1/8」。
>
> 如果第一次有一个奖励开奖，那么第二轮抽中代金券 1 的概率便会变为为 8/15 可根据占比进行计算「8:1:1:1:1:1:1:1」
>
> 第二轮若仍没有抽中，则第三轮抽中代金券 1 的概率便会继续变为为 8/14
>
> ...

仅设置 `useCustomProbability = true` ,每个卡片在每次的抽奖中概率都是相等的

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

export default () => (
  <NineSpaceFlip data={data} times={9} useCustomProbability={true} />
);
```

将抽奖次数设置为 9、代金券 1 的概率调整为 80%、代金券 2 的概率调整为 1%

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '代金券1',
    probability: 0.8,
  },
  {
    id: 2,
    name: '代金券2',
    probability: 0.01,
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

export default () => (
  <NineSpaceFlip data={data} times={9} useCustomProbability={true} />
);
```

将抽奖次数设置为 8、代金券 1 的概率调整为 0

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '代金券1',
    probability: 0,
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

export default () => (
  <NineSpaceFlip data={data} times={8} useCustomProbability={true} />
);
```

### 回调函数

- currentHitAfter 「每一轮翻奖结束触发」
- allHitAfter 「翻奖次数全部用完后触发」

#### currentHitAfter

回调参数：当前命中的奖项数据

> 请打开控制台查看输出

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

// interface NSFItemType {
//   id: number | string;
//   name: string;
//   probability?: number;
// }

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

const currentHitAfterCb = (data) => {
  console.log('🎉恭喜翻中—' + data.name);
};

export default () => (
  <NineSpaceFlip data={data} currentHitAfter={currentHitAfterCb} />
);
```

#### allHitAfter

回调参数：全部命中的奖项数据数组

> 请打开控制台查看输出

```tsx
import { NineSpaceFlip } from 'marketing-components-pro';

// interface NSFItemType {
//   id: number | string;
//   name: string;
//   probability?: number;
// }

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

const allHitAfterCb = (dataArr) => {
  console.log('🎉恭喜翻中—' + dataArr.map((item) => item.name).join(','));
};

export default () => <NineSpaceFlip data={data} allHitAfter={allHitAfterCb} />;
```

### 注意

本组件，仅支持九空格。即仅支持设置 9 个奖项数据

### API

#### 组件属性

| 属性                 | 说明                    | 类型           | 默认值      |
| -------------------- | ----------------------- | -------------- | ----------- |
| data                 | 奖项数据 （必填）       | NSFItemType[ ] | -           |
| useCustomProbability | 是否自定义概率 （可选） | boolean        | false       |
| times                | 可翻奖次数 （可选）     | number         | 3，区间 1-9 |

#### 单 data 属性 [NSFItemType]

| 属性        | 说明                                                  | 类型               | 默认值 |
| ----------- | ----------------------------------------------------- | ------------------ | ------ |
| id          | 奖项唯一 id （必填）                                  | [ string, number ] | -      |
| name        | 奖项描述 （必填）                                     | string             | -      |
| probability | 翻开概率之后「需要添加 useCustomProbability」（可选） | number             | 1/n    |

#### 回调勾子

| 属性            | 说明                            | 类型     | 默认值 |
| --------------- | ------------------------------- | -------- | ------ |
| currentHitAfter | 每一轮翻奖结束触发 （可选）     | function | -      |
| allHitAfter     | 翻奖次数全部用完后触发 （可选） | function | -      |
