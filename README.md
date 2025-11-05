# MERN‑Chat_App

## 📋 Overview  
**MERN‑Chat_App** is a full‑stack real‑time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and real‑time communication with Socket.IO (or similar) for instant messaging and chat rooms.  
It is designed to showcase end‑to‑end functionality: user authentication, chat rooms/rooms or 1:1 messaging, and real‑time updates.

## 🎯 Features  
- User signup / login / logout (JWT or session)  
- Real‑time messaging: send & receive messages instantly  
- Chat rooms or direct conversations (depending on your implementation)  
- User presence (online/offline status)  
- Message history (persisted in MongoDB)  
- Responsive frontend built with React  
- Backend API with Express + WebSocket/Socket.IO  
- Environment‐based configuration using `.env` files  
- (Optionally) File/image uploads in chat, typing indicator, read receipts, etc.

## 🛠️ Tech Stack  
- **Frontend**: React.js (hooks / functional components)  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (e.g., via MongoDB Atlas or local)  
- Real‑time layer: Socket.IO (or WebSocket)  
- Styling: (Tailwind CSS if you’re using it)  
- Authentication: JSON Web Tokens (JWT)  
- Environment & configuration: `.env` files  
- Version control: Git & GitHub  

## 🚀 Quick Setup & Installation 
### Inside the server directory, create a .env file with the following variables:
<b> Server configuration </b>
PORT=5000

<b> MongoDB Database Connection </b>
MONGO_URI=your_mongodb_connection_string_here

<b> JWT Secret Key </b>
JWT_SECRET=your_secret_key_here

<b> (Optional) Cloudinary Config for Image Uploads</b>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 1. Clone the repository  
```bash
git clone https://github.com/fahmidamabud/MERN‑Chat_App.git
cd MERN‑Chat_App
```
### 2. Install dependencies for backened
```bash
cd server        
npm install
```
### 2. Install dependencies for frontend
```bash
cd ../client
npm install
```

