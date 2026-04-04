---
trigger: always_on
---

# BildyApp Technical Guardrails
**0. Use powershell compatible commands

**1. Tech Stack & Environment**
- Strictly use Node.js 22+ and ES Modules (`import`/`export`). Never use CommonJS (`require`).
- Use Express 5 and modern asynchronous patterns. All async operations must use `async`/`await`.

**2. Architecture & Code Organization**
- Enforce strict MVC architecture. Code must be organized into `models/`, `controllers/`, `routes/`, `middleware/`, and `validators/`.
- Keep controllers thin. Do not mix business logic into router definitions.

**3. Validation & Error Handling**
- All request bodies, parameters, and queries must be validated with Zod before processing. Use `.transform()` for normalization and `.refine()` for cross-validation.
- Never handle errors directly in controllers by sending a response. Always throw the custom `AppError` class and let the centralized `error-handler.js` middleware catch and format it.

**4. Database (MongoDB/Mongoose)**
- Always define explicit indexes for frequently queried fields (e.g., `email`, `company`, `status`, `role`).
- Ensure Mongoose schemas that use virtuals (like `fullName`) are configured with `toJSON: { virtuals: true }`.
- Always use `populate()` when returning data that references other collections (like User -> Company).

**5. Security & Auth**
- Passwords must always be hashed with `bcryptjs` before saving to the database.
- Use the short-lived Access Token and long-lived Refresh Token pattern with `jsonwebtoken`.
- Ensure `helmet`, `express-rate-limit`, and `express-mongo-sanitize` are applied globally or on relevant routes.