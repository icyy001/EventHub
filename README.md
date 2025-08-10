# EventHub

A lightweight event listing site with a tiny JSON API.  
Frontend: HTML/CSS/Bootstrap + vanilla JS.  
Backend: Node.js/Express (in-memory data) with Jest/Supertest tests.

---

## Features
- List places and events (in-memory data)
- Add new events via a simple form
- Clean Bootstrap UI
- CORS enabled for local development
- Basic API tests (Jest + Supertest)

---

## Quick Start

### Prerequisites
- **Node.js ≥ 18** (for the API)
- A web browser (for the frontend)

### 1) Install & Run the API
    npm install
    npm start
    # API running at http://localhost:3000

### 2) Run the Frontend
Open `index.html` directly in your browser, **or** serve the folder with a quick static server:

    # Option A: Python 3
    python -m http.server 8001
    # visit http://localhost:8001

    # Option B: Node (http-server)
    npx http-server .
    # visit the printed localhost URL

> The frontend expects the API at `http://localhost:3000`. Keep the server running while you use the page.

---

## API (Quick Reference)

**Base URL:** `/api` (e.g., `http://localhost:3000/api`)

### Places
- **GET** `/places` → `[ { id, name } ]`  
- **GET** `/places/:id` → `{ id, name, city, events: [ { id, title } ] }`  
- **POST** `/places` (JSON: `{ "name": "Venue", "city": "City" }`) → `200 { "message": "Place added successfully", "id": <number> }`

### Events
- **GET** `/events` → `[ { id, title, placeId } ]`  
- **GET** `/events/:id` → `{ id, title, place }`  
- **POST** `/events` (JSON: `{ "title": "Talk", "placeId": 1 }`) → `200 { "message": "Event added successfully", "id": <number> }`

> Note: Data is stored in memory; restarting the server resets it.

### Examples (curl)
    # Get all places
    curl http://localhost:3000/api/places

    # Get a place with its events
    curl http://localhost:3000/api/places/1

    # Create a new place
    curl -X POST http://localhost:3000/api/places \
      -H "Content-Type: application/json" \
      -d '{ "name":"Durham Assembly Rooms","city":"Durham" }'

    # Get all events
    curl http://localhost:3000/api/events

    # Create a new event
    curl -X POST http://localhost:3000/api/events \
      -H "Content-Type: application/json" \
      -d '{ "title":"Web Dev Meetup","placeId":1 }'

---

## Running Tests
    npm test

---

## Project Structure
    .
    ├─ index.html            # Frontend (Bootstrap + vanilla JS)
    ├─ server.js             # Express API (in-memory data)
    ├─ package.json
    ├─ __tests__/api.test.js # Jest/Supertest API tests
    └─ (optional) styles.css, events.json, places.json, etc.

---

## Tech
- HTML5, CSS3, **Bootstrap 5**, JavaScript (vanilla)  
- **Node.js**, **Express**, **CORS**  
- **Jest**, **Supertest**

---

## License
MIT — © Rayane El Mselmi
