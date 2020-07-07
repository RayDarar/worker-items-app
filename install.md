# Installation

Ideally, Node.js itself won't serve any static files, but for simplicity it will.

> I was using yarn in development, so it's recommended

Versions:

- Node: v13.14.0
- yarn: 1.22.4

1. _(optionally)_ you can insert data from `/db/default-data.sql`
2. [Configure](config-list.md) the service properly
3. In `/service` directory, run `yarn install` and `yarn build`
4. After build, run `yarn start:prod`
5. [Configure](config-list.md) the app if needed
6. In `/app` directory, run `yarn install` and `yarn build`
7. Launch
