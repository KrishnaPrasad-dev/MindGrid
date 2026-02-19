# MindGrid 🧠

A full-stack web application built for managing club memberships, member profiles, and tracking contributions — all in one place.

---

## 🚀 Live Demo

[mindgrid-gnu.vercel.app](https://mindgrid-gnu.vercel.app)

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login and registration with protected routes
- 👤 **Member Profiles** — Each member gets a personal profile with their details
- ✏️ **Edit Profile** — Members can update their own profile information anytime
- 📋 **Membership Management** — Track and manage club members efficiently
- 🏆 **Contributions Page** — Dedicated page listing each member's contributions to the club

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (with Vite)
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (with Mongoose)

**Auth:**
- JWT (JSON Web Tokens)
- bcrypt for password hashing

---

## 📁 Project Structure

```
mindgrid/
├── frontend/
    |── MindGrid/          # React frontend (Vite)
│     ├── src/
│     │   ├── components/
│     │   ├── pages/
│     │   └── main.jsx
├── backend/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mindgrid.git
cd mindgrid

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend/MindGrid
npm install
```

### Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the App

```bash
# Start the backend
cd backend
npm start

# Start the frontend (in a new terminal)
cd frontend/MindGrid
npm run dev
```

App will be running at `http://localhost:5173`

---

## 📸 Screenshots

```markdown
![Home Page](assets/Home.png)
![Club Members Page](assets/Members.png)
![Explore Page](assets/Explore.png)
![contributions Page](assets/Contributions.png)
![Profile Page](assets/Profile.png)
```

---

## 🙋‍♂️ Author

**Krishna Prasad**  
[Portfolio](https://krishnaprasad.space) • [GitHub](https://github.com/KrishnaPrasad-dev) • [LinkedIn](https://www.linkedin.com/in/krishnaprasad-webdev)
