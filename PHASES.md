# Project Roadmap: BildyApp Backend

This document outlines the iterative phases for building the BildyApp API. We will complete these phases sequentially. Do not move to the next phase without explicit approval.

## Phase 0: The Infrastructure (Foundation)
* **Initialization:** Set up the Node.js project using Node.js 22+ with ESM (`"type": "module"`) and environment variables using `--env-file=.env`.
* **Architecture:** Create the expected folder structure (`src/config`, `src/controllers`, `src/middleware`, `src/models`, `src/routes`, `src/services`, `src/utils`, `src/validators`).
* **Database:** Establish the MongoDB Atlas connection using Mongoose.
* **Error Handling:** Implement the `AppError.js` utility class and the centralized error middleware (`error-handler.js`).

## Phase 1: Data Modeling (Schemas)
* **Models:** Create `User.js` and `Company.js` in the `src/models/` directory.
* **Requirements:** Include all specific fields, Mongoose indexes (e.g., `email`, `company`, `status`, `role`), and the virtual `fullName` property in the User model with `toJSON: { virtuals: true }`.

## Phase 2: The Authentication Core (Points 1-3 & Events)
* **Point 1 (Register):** Implement `POST /api/user/register`. Generate a 6-digit verification code, hash the password with bcryptjs, issue JWTs (access + refresh), and validate using Zod. Default role is `admin`.
* **Point 2 (Email Validation):** Implement `PUT /api/user/validation`. Check the 6-digit code, update `status` to `verified`, handle attempts logic, and use the JWT.
* **Point 3 (Login):** Implement `POST /api/user/login`. Validate credentials and return JWTs.
* **Event System:** Implement the `EventEmitter` service to trigger console logs for `user:registered` and `user:verified`.

## Phase 3: Company Onboarding (Points 4-5)
* **Point 4 (Onboarding):** * Implement `PUT /api/user/register` for updating personal data (name, lastName, nif).
    * Implement `PATCH /api/user/company` for assigning/creating a company. Handle the `isFreelance` logic and role assignment (`admin` vs `guest` depending on CIF existence).
* **Point 5 (Logo):** Implement `PATCH /api/user/logo` using Multer to upload a logo image (max 5MB) and save its URL to the Company document.

## Phase 4: Session & Account Management (Points 6-10)
* **Point 6 (Get User):** Implement `GET /api/user`. Return user data, using `populate` for the company details and ensuring the virtual `fullName` is included.
* **Point 7 (Session):** Implement `POST /api/user/refresh` (validate refresh token and issue new access token) and `POST /api/user/logout` (invalidate refresh token).
* **Point 8 (Delete User):** Implement `DELETE /api/user` supporting both hard delete and soft delete (logical delete) via the `?soft=true` query parameter.
* **Point 9 (Change Password):** Implement `PUT /api/user/password`. Validate current password and use Zod `.refine()` to ensure the new password is different from the old one.
* **Point 10 (Invite Peers):** Implement `POST /api/user/invite` (admin only). Create a new guest user linked to the same company, and emit the `user:invited` event.