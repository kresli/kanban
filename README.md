```mermaid
graph TD;
middleware[Middleware]
Component<-->middleware
middleware<-->Websocket
Websocket<-->Backend
middleware<-->Dexie

```
