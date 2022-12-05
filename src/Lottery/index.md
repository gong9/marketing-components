# 九宫格抽奖

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

### 自定义样式

样式配置主要划分为两大部门

- 全局样式配置
  - background 九宫格的背景
  - radius 九宫格的 radius
  - btnBackground 抽奖按钮的背景
  - btnColor 抽奖按钮的字体颜色
  - activeBackground 当前选中态奖项的背景
  - activeColor 当前选中态的字体颜色
- 单奖励项样式配置
  - background 当前奖项的背景
  - textColor 当前奖项的字体颜色
  - awardIcon 设置当前奖项的小图片

#### 例子 🌰：模拟掘金的抽奖样式

```tsx
import { Lottery } from 'marketing-components-pro';

const data = [
  {
    id: 1,
    name: '随机矿石',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
  },
  {
    id: 2,
    name: 'Bug',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp',
  },
  {
    id: 3,
    name: '随机限量徽章一枚',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a4bcb86e4614b6ea9857c2ee8372076~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
  {
    id: 4,
    name: '「睡眠日」编织袋',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d000a0408ece46cd9b89250157d342c6~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
  {
    id: 5,
    name: 'Click午睡枕',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d000a0408ece46cd9b89250157d342c6~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
  {
    id: 6,
    name: '抖音鼠标垫',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62c9841ecdea4434802b7b56c8ffcba2~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
  {
    id: 7,
    name: '索尼降噪耳机',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd767a5e9dfe4aaf88012aba206f9507~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
  {
    id: 8,
    name: 'Switch',
    background: '#fdf3f3',
    textColor: '#d25f00',
    awardIcon:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b6cc3eaa4b4dbbb8adfe4c43e1c7a3~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp?',
  },
];

const callback = (luckyRewards) => {
  console.log(luckyRewards.name);
};

export default () => (
  <Lottery
    data={data}
    callback={callback}
    lotteryGlobalStyle={{
      background: 'red',
      btnBackground: 'rgb(33, 194, 140)',
    }}
  />
);
```

### 自定义转动路径

九宫格奖项的位置排列如下：

```plan
| 0 | 1 | 2 |
————————————
| 3 |   | 4 |
————————————
| 5 | 6 | 7 |
```

默认转动路径为 `[0, 1, 2, 4, 7, 6, 5, 3]`, 即顺时针转动

#### 设置逆时钟转动

即 `path = [0,3,5,6,7,4,2,1]`

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

export default () => <Lottery data={data} path={[0, 3, 5, 6, 7, 4, 2, 1]} />;
```

#### 设置从代金券 3 开始顺时针转动

即 `path = [2, 4, 7, 6, 5, 3, 0, 1]`

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

export default () => <Lottery data={data} path={[2, 4, 7, 6, 5, 3, 0, 1]} />;
```

### 指定命中

大部分的抽奖类的逻辑因安全问题都会放在后端处理，这里我们只需要传一个`currentHit`即可

`currentHit`的值为`奖项的id`

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

export default () => <Lottery data={data} callback={callback} currentHit={2} />;
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
| data                 | 奖项数据 （必填）       | LDataType[ ] | -      |
| useCustomProbability | 是否自定义概率 （可选） | boolean      | false  |
| time                 | 转动持续时间 （可选）   | number       | 3000   |
| callback             | 转动结束回调 （可选）   | function     | -      |

#### 单 data 属性 [LDataType]

| 属性        | 说明                                         | 类型               | 默认值 |
| ----------- | -------------------------------------------- | ------------------ | ------ |
| id          | 奖项唯一 id （必填）                         | [ string, number ] | -      |
| name        | 奖项描述 （必填）                            | string             | -      |
| probability | 设置自定义概率之后，此奖项的命中概率（可选） | number             | 1/n    |
