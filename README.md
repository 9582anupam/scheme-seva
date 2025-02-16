# Scheme Seva - Government Scheme Management Portal

A comprehensive platform that helps citizens discover, understand, and access government schemes in India.

## Features

### 1. Scheme Discovery
- Browse through central and state government schemes
- Advanced filtering system based on:
  - Income groups (EWS, General, OBC, SC, ST)
  - Gender categories
  - State-specific schemes
  - Age groups
  - Categories/Tags

### 2. AI-Powered Chatbot
- Interactive chatbot for scheme-related queries
- Multilingual support (English, Hindi, Punjabi)
- Context-aware responses about:
  - Eligibility criteria
  - Application process
  - Required documents
  - Scheme benefits

### 3. User Management
- User registration and authentication
- Personalized profile management
- Save favorite schemes
- Track application status
- Custom recommendations based on user profile

### 4. Recommendation System
- Personalized scheme suggestions based on:
  - User demographics
  - Income group
  - Location
  - Interests
  - Previous interactions

## Technical Stack

### Frontend
- React.js
- Material-UI
- Tailwind CSS
- Axios for API integration
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Google's Generative AI (Gemini) for chatbot
- RESTful API architecture

## Setup Instructions

1. Clone the repository
```bash
git clone [repository-url]
```

2. Frontend Setup
```bash
cd Frontend
npm install
npm start
```

3. Backend Setup
```bash
cd Backend
npm install
```

4. Environment Variables
Create .env file in Backend directory with:
```
PORT=8000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
GEMINI_API_KEY=your_gemini_api_key
```

5. Start Backend Server
```bash
npm start
```

## API Endpoints

### User Routes
- POST `/api/v1/users/register` - User registration
- POST `/api/v1/users/login` - User login
- GET `/api/v1/users/profile` - Get user profile

### Scheme Routes
- GET `/api/v1/schemes/get-all-schemes` - Get all schemes
- GET `/api/v1/schemes/get-scheme-filtered` - Get filtered schemes
- GET `/api/v1/schemes/get-scheme-by-id/:id` - Get specific scheme
- POST `/api/v1/schemes/create-scheme` - Create new scheme

### Chatbot Routes
- POST `/api/v1/chatbot` - Get AI-powered responses

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
