# Page & Pine — Library Management System (Admin + Student)

A full-stack React + Vite frontend, Express/Node backend, and MongoDB database. Includes role-based login and separate admin/student experiences.

## Features
- JWT login for admin and student roles.
- Admin-only dashboard, book create/edit/delete, student account creation, member listing/deletion, and issue/return management.
- Student-only experience: browse/search books, borrow available books, see only their own transactions, and return only their own books.
- Server-side role checks; hiding links in React is not the only security control.
- A student account is created together with a linked Member profile.
- Student limit of 5 active loans; default fine is ₹5 per overdue day.
- Seed script ensures 65+ distinct book titles and creates an initial admin user.

## Requirements
Node.js 18+ and MongoDB (local or Atlas).

## Setup
1. In `backend`, copy `.env.example` to `.env` and set `MONGODB_URI` and a long random `JWT_SECRET`.
2. Set `CLIENT_ORIGIN=http://localhost:5173` in `backend/.env` (if Vite uses another port, update it to that origin).
3. In a terminal: `cd backend`, then `npm install`, then `npm run seed`, then `npm start`.
4. In a second terminal: `cd frontend`, then `npm install`, copy `.env.example` to `.env`, then `npm run dev`.
5. Open the local URL printed by Vite.

## Initial administrator
Username: `admin`; initial password: `admin123` when the admin is first seeded. The seed script uses `$setOnInsert`, so it does not reset an existing admin password. Change this password after first login. To use a different initial password, set `SEED_ADMIN_PASSWORD` in the backend environment before running the seed script for the first time.

## Create student login
Sign in as admin → **Students & Members** → **Create student login**. Set a username and password of at least 8 characters. The app creates the student login and associated member record. Do not expose student passwords publicly.

## API routes
- `POST /api/auth/login` — admin/student login
- `POST /api/auth/students` — admin-only create student + member
- `GET /api/books` — any authenticated user
- `POST /api/books`, `PUT /api/books/:id`, `DELETE /api/books/:id` — admin-only
- `GET /api/members`, `DELETE /api/members/:id` — admin-only
- `GET /api/transactions` — admin sees all; student sees own only
- `POST /api/transactions` — admin issues to selected member; student borrows for self only
- `PATCH /api/transactions/:id/return` — admin may return any; student may return own only
- `GET /api/dashboard` — admin-only
- `GET /api/health` — health check

## Security notes
- Never commit `.env` files. Use `.env.example` placeholders only.
- Replace the example JWT secret with a long random value.
- Use a least-privilege MongoDB database user and restrict Atlas network access where possible.
- The demo admin password is for local setup only; change it before deployment.
