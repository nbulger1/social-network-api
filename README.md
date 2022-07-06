## Social Network API - Homework Week 18

## Description

MongoDB is a NoSQL database that can be used as a general purpose document database by storing data in objects. It is popular due to its flexibility with unstructured data and speed with large amounts of data. I was tasked to create a social network API where users can share their thoughts, react to friends' thoughts, and create a friend list.

This application utilizes Express.js for routing, a MongoDB database, the Mongoose Object Document Model (ODM), and moment for timestamp formatting.

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Models](#models)
- [Controllers and Routes](#controllers-and-routes)
- [Seeds](#seeds)
- [License](#license)
- [Link](#link)

## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Models

The models were created using the following requirements:

**User**:

- `username`

  - String, Unique, Required, Trimmed

- `email`

  - String, Required, Unique, Match a valid email address

- `thoughts`

  - Array of `_id` values referencing the `Thought` model

- `friends`

  - Array of `_id` values referencing the `User` model (self-reference)

- `friendCount`
  - **Virtual** that retrieves the length of the user's `friends` array

---

**Thought**:

- `thoughtText`

  - String, Required, Between 1 and 280 characters

- `createdAt`

  - Date, Default value = current timestamp, Formatted with moment

- `username` (The user that created this thought)

  - String, Required

- `userId`

  - Array of `_id` values referencing the `User` model

- `reactions`

  - Array of nested documents created with the `reactionSchema`

- `reactionCount`
  - **Virtual** that retrieves the length of the thought's `reaction` array

---

**Reaction** (SCHEMA ONLY nested in thoughts - no model)

- `reactionId`

  - ObjectId data type, Default value = new ObjectId

- `reactionBody`

  - String, Required, 280 character maximum

- `username`

  - String, Required

- `createdAt`
  - Date, Default value = current timestamp, Formatted with moment

## Controllers and Routes

The controllers/routes were created based on the various requirements of the API. There are several different routes depending on the user request. A total of 14 routes are tested in Insomnia in the walkthrough video. Below is an overview of each pathway and the associated expected actions:

**api/users**

- `GET` all users
- `CREATE` new user

**api/users/:userId**

- `GET` single user by ID
- `UPDATE` single user by ID
- `DELETE` single user by ID (and associated thoughts)

**api/users/:userId/friend/:friendId**

- `CREATE` new friend by ID of user by ID
- `DELETE` friend by ID of user by ID

**api/thoughts**

- `GET` all thoughts
- `CREATE` new thought (tied to user who created it)

**api/thoughts/:thoughtId**

- `GET` single thought by ID
- `UPDATE` single thought by ID
- `DELETE` single thought by ID

**api/thoughts/:thoughtId/reactions**

- `CREATE` new reaction to thought by ID

**api/thoughts/:thoughtId/reactions/:reactionId**

- `DELETE` reaction by ID of thought by ID

## Seeds

There was no seed data provided for this task, thus we were instructed to seed the database using Insomnia after API creation. I did attempt to make my own seed data within the `utils` folder. This portion is still a work in progress as a practice creating seed data, thus I seeded the data using Insomnia instead of running `npm run seed`.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is protected under the MIT License.

## Link

See the following for a walkthrough video:
