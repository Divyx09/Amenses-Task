# Ameneses - Collaborative Event & Polling Platform

A modern full-stack web application for creating and managing events with integrated real-time polling functionality. Built with React.js frontend and Node.js backend.

## 🚀 Features

### Event Management
- **Create Events**: Users can create events with details like title, description, date, location, and category
- **Join Events**: Users can discover and join events created by others
- **Event Details**: Comprehensive event information with participant lists
- **Modern UI**: Beautiful, responsive design with smooth animations

### Integrated Polling System
- **Create Polls**: Event organizers and participants can create polls within events
- **Real-time Voting**: Interactive voting with live results and progress bars
- **Vote Tracking**: Visual indicators showing user voting status
- **Comprehensive Analytics**: Vote counts and percentages display

### User Authentication
- **Secure Registration/Login**: JWT-based authentication system
- **Protected Routes**: Access control for authenticated users
- **User Profiles**: Personalized user experience

### Modern Design
- **Responsive Layout**: Works seamlessly on all devices
- **Smooth Animations**: Framer Motion powered transitions
- **Clean UI**: Tailwind CSS inspired design system
- **Glassmorphism Effects**: Modern visual design elements

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **Framer Motion** - Animation library
- **Lucide React** - Modern icon library
- **Custom CSS** - Tailwind-inspired utility classes
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Ameneses/
├── backend/                 # Node.js backend
│   ├── controllers/        # Business logic
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   └── pollController.js
│   ├── models/             # Database models
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Poll.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── event.js
│   │   └── poll.js
│   ├── middleware/         # Custom middleware
│   │   └── auth.js
│   ├── package.json
│   └── index.js           # Server entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   └── Navbar.js
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── Events.js
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd Ameneses
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ameneses
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Event Endpoints
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event (authenticated)
- `POST /api/events/:id/join` - Join an event (authenticated)

### Poll Endpoints
- `GET /api/polls/event/:eventId` - Get polls for an event
- `POST /api/polls` - Create new poll (authenticated)
- `POST /api/polls/:id/vote` - Vote on a poll (authenticated)

## 🎯 Key Features Explained

### Event Details Modal
When users click "View Details" on an event, they get access to:
- Complete event information
- Participant list
- **Integrated polling system** where they can:
  - Create new polls (if they're participants or organizers)
  - Vote on existing polls
  - See real-time results with progress bars
  - View voting analytics

### Polling System
- **Dynamic Poll Creation**: Add/remove options dynamically
- **Real-time Results**: Live vote counts and percentages
- **Visual Feedback**: Progress bars and checkmarks for voted options
- **Access Control**: Only participants and organizers can vote
- **Duplicate Prevention**: Users can only vote once per poll

### Modern UI/UX
- **Smooth Animations**: Page transitions and hover effects
- **Responsive Design**: Optimized for all screen sizes
- **Loading States**: Skeleton loaders and spinner animations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time input validation

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Protected Routes**: Authentication middleware
- **Input Validation**: Server-side data validation
- **CORS Configuration**: Cross-origin resource sharing setup

## 🌟 Future Enhancements

- [ ] Real-time notifications using Socket.io
- [ ] Event categories and filtering
- [ ] Advanced poll types (multiple choice, rating scales)
- [ ] Event calendar integration
- [ ] Email notifications
- [ ] File upload for event images
- [ ] Advanced analytics dashboard
- [ ] Social sharing features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created as a showcase project demonstrating modern full-stack development skills with integrated polling functionality.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- Framer Motion for smooth animations
- Lucide React for beautiful icons
