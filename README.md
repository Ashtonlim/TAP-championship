# TAP-championship

## How To run this application locally

First, run the frontend

```
cd client
npm install
npm start
```

Then, run the backend. Ensure you're using the lastest version of Node.

```
cd server
npm install
npm start
```

## Application

### Assumptions, interpretation of this application

1. No restrictions were put on what a team could be named.

2. I assume that the year these teams are being registered is whatever the current year is. This is to ensure no teams register on dates that do not exist, such as registering on 29th Feb on a non leap year.

### General details about the applcation

1. The rankings were computed by sorting a 2d array with each row being in the order described in the assignment

```
[Highest total match points, highest total goals, higest alternate total match points, earliest date registered]
```

2. This applications also ensure teams cannot match against another team from a different group or match again themselves.

### Bonuses completed

1. Deploy the web application to a publicly accessible hosting service.❌
2. Data that is entered should persist across system reboots (e.g. using a relational database).✅
3. Handle invalid input sensibly.✅

## Architecture

Stack: MERN.

The intention was to deploy this application online with the used of mongoDB and AWS. However due to time constraints, the application was only set up on to use mongo cloud.

while unsafe, i have uploaded the .env file with the mongo key to access the cloud database as stated below.

```
MONGOAPIKEY=mongodb+srv://ash:qwe@antler-main.5lwsp.mongodb.net/tapChampionship?retryWrites=true&w=majority
```

## Practices and patterns

Some of the practices used in this project are quite contrived, they are to illustrate the use **composability** and **reusability**. Hence, some of the structure used in this application may not be ideal for a real world application.

Validation happens on both client side and server side. However, I was not able to translate the client side validation into UI to feed back in realtime to the user errors in the input due to time contraints.
