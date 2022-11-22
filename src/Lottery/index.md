---
nav:
  path: /hooks
---



```tsx
import { Lottery } from 'marketing-components'

const data = [
  {
    id: 1,
    name: '代金券1',
  },
  {
    id: 2,
    name: '代金券2',
    is: true,
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
    id:6,
    name: '代金券6',
  },
  {
    id:7,
    name: '代金券7',
  },
  {
    id: 8,
    name: '代金券8',
  },
];

export default () => <Lottery data={ data }/>;
```