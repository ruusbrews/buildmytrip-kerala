# BuildMyTrip Kerala 🌴

BuildMyTrip Kerala is a personalized travel planning website that allows users to explore Kerala and generate custom optimised itineraries using an AI-powered planner.

This project was built as part of a university web development assignment and includes both a frontend website and a Node.js backend using the OpenAI API.

## Features
- Destination-based trip planning
- AI-generated Kerala travel itinerary optimising travel times and experience
- Interactive contact and subscription forms with client-side form validation, FAQs page
- Clean, attractive user-friendly interface

## Technologies Used
- HTML, CSS, JavaScript
- Node.js & Express
- OpenAI API
- dotenv

## Project Structure
project-root/
│
├── HTML/ # All HTML pages
├── CSS/ # Stylesheets
├── IMAGES/ # Images and assets
├── server/ # Backend server
│ ├── app.js
│ ├── package.json
│ ├── package-lock.json
│ └── .env # NOT committed to GitHub
│
└── README.md

## How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/buildmytrip-kerala.git
cd buildmytrip-kerala

### 2. Install backend dependencies
Need to install express, cors, dotenv and openai.
```bash
cd server
npm install

### 3. Get an OpenAI API key
1. Go to 👉 https://platform.openai.com/
2. Log in or create an account
3. Navigate to View API Keys
4. Create a new secret key
5. Copy the key (you won’t be able to see it again)

### 4. Create .env file
Inside the 'server' folder, create a file called '.env'. Add this line:
OPENAI_API_KEY = your_api_key_here

### 5. Start server
```bash
cd server
node app.js

Open any html file using Live Server or directly in your browser and enjoy!
