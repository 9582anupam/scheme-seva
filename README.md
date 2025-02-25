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
git clone https://github.com/9582anupam/scheme-seva
```

2. Frontend Setup
```bash
cd Frontend
npm install
```

3. Backend Setup
```bash
cd Backend
npm install
```

4. Environment Variables
Create .env file in Backend directory with:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_refresh_token_secret_expiry
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_access_token_secret_expiry
GEMINI_API_KEY=your_gemini_api_key
```

5. Start Backend Server
```bash
npm start
```

5. Start Frontend
```bash
npm start
```

## API Endpoints

### User Routes
- POST `/api/v1/users/signup` - User signup
- POST `/api/v1/users/login` - User login
- POST `/api/v1/users/logout` - User logout (with JWT verification)
- GET `/api/v1/users/refresh-access-token` - Refresh access token
- GET `/api/v1/users/getme` - Get current user details (with JWT verification)
- POST `/api/v1/users/putdata` - Put data (with JWT verification)


  ### Scheme Routes
- GET `/api/v2/schemes/get-all-schemes` - Get all schemes
- GET `/api/v2/schemes/get-scheme-by-id/:id` - Get a specific scheme by ID
- GET `/api/v2/schemes/get-scheme-by-category/:category` - Get schemes by category
- GET `/api/v2/schemes/get-filtered-schemes` - Get filtered schemes
- POST `/api/v2/schemes/save-favorite-schemes` - Save favorite schemes (with JWT verification)
- DELETE `/api/v2/schemes/remove-favorite-schemes/:id` - Remove a favorite scheme by ID (with JWT verification)
- GET `/api/v2/schemes/get-favorite-schemes` - Get all favorite schemes (with JWT verification)


### Chatbot Routes
- POST `/api/v1/chatbot` - Get AI-powered responses

### Recommendation Routes
- GET `/api/v1/users/personalized` - Get personalized recommendations (with JWT verification)


## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
