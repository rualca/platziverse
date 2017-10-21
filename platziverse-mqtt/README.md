#platziverse-mqtt

## `agent/connected`

``` js
{
  agent: {
    uuid, // auto generate
    username, // defined by configuration
    name, // defined by configuration
    hostname, // get from os
    pid // get from process
  }
}
```

## `agent/disconnected`

``` js
{
  agent: {
    uuid
  }
}

```

## `agent/message`

``` js
{
  agent,
  metrics: [{
    type,
    value
  }],
  timestamp // generate when message be create
}
```