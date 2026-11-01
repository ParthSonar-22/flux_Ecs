# FLUX-ECS Frontend-Backend API Contract Specification

This document defines the formal request and response schemas, authentication protocols, and design assumptions established by the frontend presentation layer. The backend engineering team can reference this specification to achieve 1:1 parity with the frontend client.

---

## 1. Global Configurations & Networking

- **Environment Variable**: `NEXT_PUBLIC_API_BASE_URL`
- **Fallback Behavior**: When `NEXT_PUBLIC_API_BASE_URL` is empty, requests route to Next.js internal `/api` handlers.
- **Client Service Layer**: All requests are centralized through `services/api.js`.
- **Authentication Header**:
  ```http
  Authorization: Bearer <TOKEN>
  Content-Type: application/json
  ```
- **Standard Envelope Response**:
  ```json
  {
    "success": true,
    "data": {},
    "error": null
  }
  ```

---

## 2. Authentication Contract (`/api/admin/login`)

### `POST /api/admin/login`
- **Description**: Authenticates administrative personnel.
- **Request Body**:
  ```json
  {
    "password": "administrative_password_string"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "token": "jwt_or_secure_session_token_string",
    "user": {
      "role": "admin",
      "name": "Secretariat Admin",
      "email": "flux.ecs@ves.ac.in"
    }
  }
  ```
- **Error Response (`401 Unauthorized`)**:
  ```json
  {
    "success": false,
    "error": "Invalid administrative key"
  }
  ```
- **Assumption**: Sets an `httpOnly`, `sameSite=lax`, `secure` cookie named `flux_admin_token` for server-rendered routes, while returning the bearer token in the JSON body for client-side API requests.

---

## 3. Events API Contract (`/api/events`)

### `GET /api/events`
- **Description**: Retrieves all department events and workshops.
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "algorithms-auction",
        "slug": "algorithms-auction",
        "title": "Algorithm's Auction",
        "posterLine": "Every move is a strategy. Every bid is a gamble.",
        "shortLine": "Think. Bid. Solve. Win.",
        "status": "upcoming",
        "startDate": "2026-11-02T13:00:00+05:30",
        "endDate": "2026-11-03T15:30:00+05:30",
        "venue": "2nd Floor, VESIT",
        "time": "1:00 pm – 3:30 pm",
        "poster": "https://backend-cdn.com/posters/algorithms-auction.jpg",
        "registerUrl": "https://docs.google.com/forms/...",
        "intro": "2-day algorithmic auction and problem solving battle.",
        "day1": {
          "label": "Day 1: Learn the Logic",
          "date": "2nd November 2026",
          "items": ["Searching & Sorting", "Greedy Algorithms", "Graph Traversal"]
        },
        "day2": {
          "label": "Day 2: Bid. Solve. Win.",
          "date": "3rd November 2026",
          "items": ["Virtual Coin Bidding", "Problem Solving Battles"]
        }
      }
    ]
  }
  ```

### `POST /api/events`
- **Header**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
  ```json
  {
    "title": "Robotics Arena Challenge",
    "venue": "Tinkerers Lab 201",
    "status": "upcoming",
    "startDate": "2026-11-20T10:00:00Z",
    "endDate": "2026-11-21T16:00:00Z",
    "time": "10:00 AM – 4:00 PM",
    "poster": "https://...",
    "registerUrl": "https://...",
    "intro": "Autonomous rover pathfinding tournament."
  }
  ```

### `PUT /api/events/:id`
- **Header**: `Authorization: Bearer <TOKEN>`
- **Request Body**: Partial or full event object updates.

### `DELETE /api/events/:id`
- **Header**: `Authorization: Bearer <TOKEN>`
- **Response**: `{ "success": true, "message": "Event deleted" }`

---

## 4. Posts & Announcements Contract (`/api/posts`)

### `GET /api/posts`
- **Description**: Returns published gazette articles and announcements.
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "iota-archives",
        "slug": "iota-archives",
        "title": "IoTA Archives",
        "subtitle": "Induction Exhibition 2026",
        "date": "7th September 2026",
        "location": "Labs 201, 203 & 215, VESIT",
        "category": "Event Write-up",
        "coverPhoto": "https://...",
        "intro": "IoTA Archives was an exhibition organised by...",
        "sections": [
          {
            "id": "lab201",
            "heading": "Lab 201 — Hardware and Electronics",
            "body": "...",
            "photo": "https://...",
            "projects": ["RC cars", "Obstacle avoiding rover"]
          }
        ],
        "gallery": [
          {
            "src": "https://...",
            "label": "Lab 201 — Cohort Demonstration"
          }
        ]
      }
    ]
  }
  ```

### `POST /api/posts`, `PUT /api/posts/:id`, `DELETE /api/posts/:id`
- Follows standard CRUD semantics with `Authorization: Bearer <TOKEN>`.

---

## 5. Council Members Contract (`/api/members`)

### `GET /api/members`
- **Description**: Returns the active roster of faculty advisors, senior council leaders, and junior officers.
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "shantanu-gaikwad",
        "name": "Shantanu Gaikwad",
        "displayName": "Shantanu Gaikwad",
        "role": "Vice President",
        "post": "Vice Prez",
        "tier": "senior",
        "department": "TE ECS",
        "phone": "+91 70219 65356",
        "photo": "https://backend-cdn.com/team/shantanu-gaikwad.jpg",
        "quote": "Turning ambition into reality.",
        "bio": "Leading strategic execution and department collaborations for FLUX-ECS.",
        "linkedin": "https://www.linkedin.com/in/shantanu-gaikwad-63a300361...",
        "instagram": "https://www.instagram.com/shantu_2580...",
        "github": "https://github.com/Shantu-2580"
      },
      {
        "id": "parth-sonar",
        "name": "Sonar Parth Narendra",
        "displayName": "Parth Sonar",
        "role": "Technical Officer",
        "post": "Technical Officer",
        "tier": "junior",
        "department": "SE ECS",
        "photo": "https://backend-cdn.com/team/parth-sonar.jpg",
        "quote": "Powered by possibility.",
        "bio": "Building web architectures, backend systems, and technical platforms.",
        "linkedin": "https://www.linkedin.com/in/parth-sonar-894025386/",
        "instagram": "https://www.instagram.com/sonar_parth22/",
        "github": "https://github.com/ParthSonar-22"
      }
    ]
  }
  ```

### Note on 3D Card Flip:
- The frontend renders **Photo, Name, and Post on the Front of the card**.
- Clicking flips the card in 3D to reveal **Bio, Quote, and Social Icons (LinkedIn, GitHub, Instagram, Phone)** on the Back.

---

## 6. Media Gallery Contract (`/api/gallery`)

### `GET /api/gallery`
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "gallery-01",
        "title": "Autonomous Chassis Floor Run",
        "category": "Robotics",
        "date": "September 2026",
        "src": "https://backend-cdn.com/photos/iota-robot-floor-test.jpg",
        "description": "Testing obstacle-avoiding chassis algorithms prior to open demonstration."
      }
    ]
  }
  ```

### `POST /api/gallery`
- **Request Body**:
  ```json
  {
    "title": "FPGA Synthesis Bench",
    "category": "Hardware",
    "date": "November 2026",
    "src": "https://...",
    "description": "Demonstrating Verilog logic synthesizers."
  }
  ```

---

## 7. Assumptions & Engineering Agreements

1. **Date Serialization**: All dates sent by backend are either ISO-8601 strings (e.g. `2026-11-02T13:00:00+05:30`) or formatted display strings.
2. **Auto-sorting**: Frontend dynamically sorts events into upcoming vs past by checking `endDate >= Date.now()` (or `startDate >= Date.now()`).
3. **Image Flexibility**: Image fields (`photo`, `poster`, `coverPhoto`, `src`) can accept full remote CDN URLs (`https://...`) or relative paths (`/team/...`). The frontend `SmartImage` component handles fallbacks automatically.
4. **Resilience & Fallbacks**: If the backend API is unreachable during maintenance or partial deployment, the frontend falls back seamlessly to local storage and cached mocks without throwing unhandled exceptions.
