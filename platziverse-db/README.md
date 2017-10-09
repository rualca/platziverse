# platziverse-db

## Usage

```js
const setupDatabse = require('platziverse-db');

setupDatabse(config).then(db => {
  const { Agent, Metric } = db;

}).catch(err => console.error(err))

```