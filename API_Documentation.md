# EventHub API Documentation

Base URL: `http://localhost:3000/api`

## Endpoints

### GET /places
Returns a list of all places

### GET /places/:id
Returns one place with related events

### POST /places
Add a new place

### GET /events
Returns a list of all events

### GET /events/:id
Returns one event with related place

### POST /events
Add a new event

## Status Codes
- 200 OK
- 400 Bad Request
- 404 Not Found
- 403 Forbidden — reserved for future authentication/authorization; not currently used by this demo API
