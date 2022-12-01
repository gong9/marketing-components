# marketing-components

[![NPM version](https://img.shields.io/npm/v/marketing-components-pro.svg?style=flat)](https://npmjs.org/package/marketing-components)
[![NPM downloads](http://img.shields.io/npm/dm/marketing-components-pro.svg?style=flat)](https://npmjs.org/package/marketing-components)

[docs](https://gong9.github.io/marketing-components/)

## Usage

安装:

`pnpm add marketing-components-pro`

使用:

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

## Options

TODO

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
