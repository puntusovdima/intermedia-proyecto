# BildyApp Backend API

A robust RESTful API for managing construction delivery notes, built with a focus on security, scalability, and clean MVC architecture.

## 🚀 Features

- **User Authentication**: JWT-based auth with Access/Refresh token rotation and secure password hashing (`bcryptjs`).
- **Onboarding Flow**: Conditional validation for Freelance vs. Standard companies using Zod `discriminatedUnion`.
- **File Management**: Secure logo uploads with automatic disk cleanup using `Multer`.
- **Advanced Account Management**: Soft/Hard delete support, role-based access control (Admin/Guest), and populated relationships.
- **Production-Grade Security**:
    - **Helmet**: Secure HTTP headers.
    - **Rate Limiting**: Brute-force protection.
    - **Zod**: Type-safe validation for every input.
    - **Custom Error Handling**: Centralized operational error management.

## 🛠️ Technology Stack

- **Runtime**: Node.js 22+ (ES Modules)
- **Framework**: Express 5
- **Database**: MongoDB Atlas via Mongoose
- **Validation**: Zod
- **Security**: jsonwebtoken, bcryptjs, helmet, express-rate-limit

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd intermedia-proyecto
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   ```

4. **Run the application**:
   ```bash
   # Development mode (with watch)
   npm run dev

   # Production mode
   npm start
   ```

## 📂 Project Structure

```text
src/
├── config/             # Database connection & env config
├── controllers/        # Request handlers (Thin controllers)
├── middleware/         # Auth, Role, Upload, and Error handlers
├── models/             # Mongoose schemas (User, Company)
├── routes/             # Route definitions
├── services/           # Business events & notifications
├── utils/              # Custom AppError & JWT utilities
├── validators/         # Zod validation schemas
├── app.js              # Express app configuration
└── index.js            # Server entry point
```

## 🔒 Security Notes

- **Express 5**: Uses the latest Express framework for modern async handling.
- **Token Invalidation**: Refresh tokens are stored in the database to allow for secure logout and session invalidation.
- **Soft Delete**: Users can be logically deleted (`?soft=true`) to preserve data integrity while disabling access.

---

*Build by Dmitrii Puntusov as part of the Web Programming: Server subject in U-TAD, 2026.*
