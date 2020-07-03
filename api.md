# API

Base url: `domain.com/api/<route>`

Table of contents:

- [API](#api)
  - [Workers module](#workers-module)
    - [GET api/workers/count](#get-apiworkerscount)
    - [GET api/workers/page/:number](#get-apiworkerspagenumber)
    - [GET api/workers/:worker_id](#get-apiworkersworker_id)
    - [POST api/workers/](#post-apiworkers)
    - [PUT api/workers/:worker_id](#put-apiworkersworker_id)
    - [DELETE api/workers/:worker_id](#delete-apiworkersworker_id)
  - [Items module](#items-module)
    - [PUT api/workers/:worker_id/items/:item_id](#put-apiworkersworker_iditemsitem_id)
    - [DELETE api/workers/:worker_id/items/:item_id](#delete-apiworkersworker_iditemsitem_id)

## Workers module

Base url: `/workers`

### GET api/workers/count

Obtain amount of workers.

Return example:

| Code | Description |
| :--: | :---------: |
| 200  |     Ok      |

**200**:

```js
{
  result: 12,
}
```

### GET api/workers/page/:number

Return 10 workers' statistics skipping some of them

Return example:

| Code |   Description    |
| :--: | :--------------: |
| 200  |        Ok        |
| 400  | Validation error |

**200**:

```js
[
  {
    id: 1,
    fullName: "Рыспеков А. К.",
    itemsCount: 4,
    priceSum: 250000,
  },
  // other data
];
```

### GET api/workers/:worker_id

Return a worker data by given id

Return example:

| Code |   Description    |
| :--: | :--------------: |
| 200  |        Ok        |
| 400  | Validation error |
| 404  |  User not found  |

**200**:

```js
{
  id: 1,
  firstName: "Ансар",
  lastName: "Рыспеков",
  middleName: "Кайратович",
  items: [
    {
      id: 1,
      name: "Asus Ноутбук",
      price: 350000,
    }
    // other data
  ],
}
```

### POST api/workers/

Create a new worker

Request body example:

```js
{
  firstName: "Ансар",
  lastName: "Рыспеков",
  middleName: "Кайратович",
  items: [
    {
      name: "Asus Ноутбук",
      price: 350000,
    }
    // other items
  ],
}
```

Response example:

| Code |   Description    |
| :--: | :--------------: |
| 201  |     Created      |
| 400  | Validation error |

### PUT api/workers/:worker_id

Update worker's properties

Request body example:

```js
{
  id: 1, // required
  firstName: "Ансар" // will update this property
}
```

Response example:

| Code |   Description    |
| :--: | :--------------: |
| 202  |     Updated      |
| 400  | Validation error |
| 404  |  User not found  |

### DELETE api/workers/:worker_id

Delete worker by given id

Response example:

| Code |   Description    |
| :--: | :--------------: |
| 202  |     Deleted      |
| 400  | Validation error |
| 404  |  User not found  |

## Items module

Sits inside workers module.

Base url: `workers/<worker-id>/items/`

### PUT api/workers/:worker_id/items/:item_id

Update specific item for given worker

Request body example:

```js
{
  id: 1,
  name: "Телефон Samsung" // this property will be updated
}
```

Response example:

| Code |      Description       |
| :--: | :--------------------: |
| 202  |        Updated         |
| 400  |    Validation error    |
| 404  | User or item not found |

### DELETE api/workers/:worker_id/items/:item_id

Delete specific item for given worker

Response example:

| Code |      Description       |
| :--: | :--------------------: |
| 202  |        Deleted         |
| 400  |    Validation error    |
| 404  | User or item not found |
