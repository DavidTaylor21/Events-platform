# Events platform

## Summary

**Events platform** is a event management platform designed to connect users with events in their area. The platform allows users to discover, sign up for, and manage events easily. Users can also integrate their Google calendars for event reminders and updates.

### Key Features

- **Event Discovery**: Browse a wide variety of events based on categories and locations.
- **User Registration**: Easy sign-up process for new users.
- **Event Management**: Users can view their signed-up events, add them to their calendars, and manage their participation.

---

## Test Account Access

You can explore the platform using the following test account credentials:

- **Email**: staff@testemail.com
- **Password**: testpassword

---

## Running the Project Locally

Follow these instructions to set up the project on your local machine.

### Prerequisites

- Ensure you have **Node.js** installed. You can download it from [nodejs.org](https://nodejs.org/).
- Ensure you have PostgreSQL installed and running
- Set up a Google Cloud project with OAuth 2.0 Client IDs 

### Setup .env

Create a .env file in the backend folder with:

DATABASE_URL=**your_psql_connection_string**

create a .env file in the frontend folder with:

VITE_GOOGLE_CLIENT_ID=**your_google_client_id**
VITE_GOOGLE_CLIENT_SECRET=**your_google_client_secret**
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/oauthcallback

### Setup Steps

**Clone the Repository**:

1. Navigate into the project directory:
   ```bash
   cd [project-folder]
   ```

2. Open your terminal and run:

   ```bash
   git clone https://github.com/DavidTaylor21/Events-platform


3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Click the link in the terminal to view the app.