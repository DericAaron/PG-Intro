#Postgres Intro

##Keywords:
- MVP - Minimum, Viable, Product
- CRUD - Create, Read, Update, Complete
- API - Application, Programming, Interface

##Connecting SQL DB
- terminal: npm install pg

Download code and do the following:
1. Go into the project directory and run the command 'npm install'.
2. Run the sql in the 'databaseSetup.sql'


##Initial ToDo's
- Delete Route
- Update (PUT) route on server
- Read (GET) route on server
- Create (POST) route
- server setup with express
- Database Setup
- create databaseSetup.sql
- Connect server to DB

###New things:
modules/pool.js
- pool.js where we keep connections to DB

###Notes for CRUD:
- gets need nothing, predetermined --- "GET all SONGS"
    - search criteria - query params

- POST - uses req.body
- DELETE - uses request params for id
- PUT - uses request params for id & req.body for data to update