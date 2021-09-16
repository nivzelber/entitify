# Entitify

![npm](https://img.shields.io/npm/v/@entitify/core)
![npm](https://img.shields.io/npm/dm/@entitify/core)
![GitHub top language](https://img.shields.io/github/languages/top/niv54/entitify)
[![paypal](https://img.shields.io/badge/Donate-PayPal-pink.svg)](https://www.paypal.me/nivzelber)  
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)  


Create API's at lightning speed, without any work at all.

- [Entitify](#entitify)
  - [Description](#description)
  - [Goal](#goal)
  - [Basic usage](#basic-usage)
    - [Express](#express)
    - [Nest.js](#nestjs)
  - [API](#api)
    - [Endpoints](#endpoints)
      - [Find many](#find-many)
      - [Find one](#find-one)
      - [Count](#count)
      - [Create](#create)
      - [Update](#update)
      - [Delete](#delete)
    - [Parameters](#parameters)
      - [Filter](#filter)
        - [Examples](#examples)
      - [Sort](#sort)
        - [Examples](#examples-1)
      - [Paginate](#paginate)
        - [Examples](#examples-2)
  - [Options](#options)

## Description

This is the story of Adam 🧔  
Adam wanted to add a new entity to his existing API.  
Adam then went to do the following:

- Create a DB model for his entity
- Add a `CREATE` route for his entity
- Add an `UPDATE` route for his entity
- Add a `DELETE` route for his entity
- Add a `GET` route for his entity

Then adam realized he didn't only want to GET his entity by ID, but by other fields as well.  
Poor adam then went on to do the following (again 🤦‍♂️):

- Add a `SEARCH` route for his entity so he can search it by other fields but ID
- Support pagination in this route, since he didn't want to receive all the entities at once
- Implement special search options, so he can get all the entities who has a value higher than 6 in a specific field

Adam was so happy of his work. He now has the perfect API for his entity and there is nothing that can stop him 😎  
Adam woke up the next day, and wanted to add a new entity to his API 💪  
Adam then discoverd he needs to re-implement all the stuff he's done for the first entity **ALL OVER AGAIN**.  
Adam then realized he is not interested in development, and went on to sell ice cream for the `REST` his life (pun intended).

## Goal

**entitify** was created for the sole purpose of helping all the other Adam's, and to make their life a breeze.
The API created by Adam for his entity is near perfect, and has all the options someone could ever ask for, but you don't want to write all this code (that is nearly exactly the same) for each of your entities, don't you?

You want some sort of tool that can get a short description of what our entity should look like - and do the rest for you. **entitify** is just the tool for you!
All you need to do is to create a model for your entity, and rest assure, everything Adam did will be done in a breeze by entitify.

## Basic usage

Install entitify

```
npm install @entitify/core @entitify/common typeorm
# select your framework of choice
npm install @entitify/express express
npm install @entitify/nest-rest @nestjs/common @nestjs/core @nestjs/typeorm @nestjs/platform-express
```

create a model for your entity

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  registrationDate: boolean;
}
```

And that's it! your'e all set to go!

### Express

for `express` usage - entitify exposes a `Router` via the `route` method

```ts
import { route } from "@entitify/express";
import express from "express";

import { User } from "./user";

const app = express();
const userRouter = route(User);

app.use("/api/user", userRouter);
```

For a detailed example see [express example](/examples/01-express/)

### Nest.js

for `nest.js` usage - entitify exposes a `Controller` and a `Service`

```ts
import { GeneralController, GeneralService, Tokens } from "@entitify/nest-rest";
import { Module } from "@nestjs/common";

import { User } from "./user";

@Module({
  providers: [
    {
      provide: Tokens.EntityClass,
      useValue: User
    },
    GeneralService
  ],
  controllers: [GeneralController]
})
export class UserModule {}
```

For a detailed example see [nest example](/examples/02-nest-rest/)

## API

### Endpoints

The routes exposed are just as in Adam's story.

| Method | Path   | Description            |
| ------ | ------ | ---------------------- |
| GET    | /      | Get a list of entities |
| GET    | /:id   | Get a specific entity  |
| GET    | /count | Count entities         |
| POST   | /      | Create Entity          |
| PATCH  | /      | Update Entity          |
| DELETE | /:id   | Delete Entity          |

#### Find many

This is probably the best and most powerful route entitify exposes.

- `GET`
- returns

```json
{
  "entities": [
    { [entity fields] },
    { [entity fields] },
    ...
  ],
  "total": [ total number of entities that matches the specified conditions ]
}
```

The special thing about this route is that is has *many* conditions.  
To specify a condition you just add it to the query string.
Read more in the [Api Parameters section](#parameters)

#### Find one

- `GET /:id`
- returns

```json
{
  "entity": { [entity fields] }
}
```

#### Count

- `GET /count`
- returns

```json
{
  "count": [number of entities]
}
```

#### Create

- `POST /`
- body

```json
{
  "entity": { [entity fields] }
}
```

- returns

```json
{
  "entity": { [created entity fields] }
}
```

#### Update

- `PATCH /:id`
- body

```json
{
  "entity": { [entity fields] }
}
```

- returns

```json
{
  "entity": { [updated entity fields] }
}
```

#### Delete

- `DELETE /:id`

### Parameters

when using the default `GET /` route of an entity, entitify offers the usage of multiple API parameters:

- [Filter](#filter)
- [Sort](#sort)
- [Paginate](#paginate)

#### Filter

Filters are used as a suffix to a field's name.
| Filter            | Description                |
| ----------------- | -------------------------- |
| No suffix or `eq` | Equal                      |
| `ne`              | Not equal                  |
| `lt`              | Less than                  |
| `lte`             | Less than or equal to      |
| `mt`              | More than                  |
| `mte`             | More than or equal to      |
| `sw`              | Starts with                |
| `sws`             | Starts with case sensitive |
| `ew`              | Ends with                  |
| `ews`             | Ends with case sensitive   |
| `contains`        | Contains                   |
| `containss`       | Contains case sensitive    |

> Note that *case sensitivity* is DB dependent

##### Examples

**Get all users with first name Adam**  
`GET /users?firsName=adam` or `GET /users?firsName_eq=adam`

**Get all users with age lower than or equal to 25**  
`GET /users?age_lte=25`

By default the relation between conditions is `OR` so the following query will return all users with a name the starts with "ada" *or* has more than 2,000 likes  
`GET /users?firstName_sw=ada&likes_mt=2000`

you can specify the `_and` condition to make the same query above return all users with a name that starts with "ada" *and* has more than 2,000 likes  
`GET /users?_and=true&firstName_sw=ada&likes_mt=2000`

> As for now, entitify only support `and` between different fields - meaning that queries like the following will not return the desired outcome  
> `GET /users?_and=true&age_mte=25&age_lte=30`

#### Sort

Sort entities by a specific field, and direction

> The default field entities are sore by is `id`, and the default direction is `ASC`.  
> To change the defaults per entity, see [Options](#options)

##### Examples

**Get users sorted by age ascending**  
`GET /users?_sort_by=age`

**Get users sorted by name descending**  
`GET /users?_sort_by=name&_sort_direction=DSC`

#### Paginate

entitify supports pagination by default.

> By default, each request is being paginated, and the default value for `_take` is 50.  
> To change the defaults per entity, see [Options](#options)

##### Examples

**Get the first 30 users**  
`GET /users?_take=30`

**Get the second user**  
`GET /users?_skip=1&_take=1`

## Options

entitify has some defaults that can be changed by passing an object of type `Options` (that is exported from `@entitify/common`)
| Option        | Default Value | Description                                   | Implementation status |
| ------------- | ------------- | --------------------------------------------- | --------------------- |
| sortBy        | `id`          | Fields that entities returned will by sort by | ❌                     |
| sortDirection | `ASC`         | Order by direction (`"ASC"` or `"DSC"`)       | ❌                     |
| paginate      | `true`        | Should results paginate                       | ❌                     |
| take          | `50`          | How many entities to will be returned         | ✅                     |

> All options are overridable from the query
