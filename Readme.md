# MERN Bug Tracker

A full-stack bug tracking application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to report, track, and manage bugs efficiently.

## Features

- **CRUD Operations:** Create, read, update, and delete bug reports
- **User Management:** Assign bugs to team members
- **Priority & Status Management:** Set priority levels and track bug status
- **Search & Filters:** Quickly find and filter bug reports
- **Error Handling:** Robust backend and frontend error handling
- **Testing:** Comprehensive unit and integration tests for stability

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Jest & Supertest (for testing)

### Frontend
- React.js (Vite)
- React Router
- Tailwind CSS
- Jest & React Testing Library (for testing)

## Project Structure

```
mern-bug-tracker/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (Local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```sh
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/bug-tracker
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the frontend directory with the following variables:
   ```sh
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Testing

### Backend Tests
Run backend tests:
```sh
cd backend
npm test
```

### Frontend Tests
Run frontend tests:
```sh
cd frontend
npm  run test
```

## Debugging Techniques

### Backend Debugging
- **Console Logging:** Track request data and responses
- **Error Middleware:** Centralized error handling
- **Node.js Inspector:** Step-by-step debugging

### Frontend Debugging
- **React DevTools:** Inspect components and state
- **Browser DevTools (Network Tab):** Track API requests
- **Error Boundaries:** Catch UI crashes

## Error Handling

### Backend
- **Custom Middleware:** Catches and processes errors
- **Input Validation:** Prevents invalid data
- **Try-Catch Blocks:** Handles async errors gracefully

### Frontend
- **Error Boundaries:** Prevents component crashes
- **Form Validation:** Ensures valid user input
- **API Error Handling:** Displays user-friendly messages

## Deployment

1. **Set up a MongoDB Atlas cluster** (if using a cloud database)
2. **Deploy the backend** to a platform like **Heroku** or **Render**
3. **Deploy the frontend** to **Netlify** or **Vercel**
4. **Configure production environment variables** in respective platforms

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```sh
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a pull request

## License

This project is licensed under the **MIT License**.

