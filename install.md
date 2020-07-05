# Installation

Ideally, Node.js itself won't serve any static files, but for simplicity it will.

> I was using yarn in development, so it's recommended

Versions:

- Node: v13.14.0
- yarn: 1.22.4

## 1) Service

1. [Configure](config-list.md) the service properly
2. In `/service` directory, run `yarn build`
3. After build, run `yarn start:prod`

## 2) App

1. [Configure](config-list.md) the app if needed
2. In `/app` directory, run `yarn build`

## 3) Launch

Now you can test that out!
