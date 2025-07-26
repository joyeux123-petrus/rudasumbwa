# 🎓 RUDASUMBWA Seminary - Complete Authentication System

A modern, secure web application for Petit Séminaire Saint Léon Kabgayi featuring comprehensive authentication, club management, and student portal functionality.

## 🚀 Features

### Authentication System
- **Secure User Registration** - Complete student signup with validation
- **Email Verification Workflow** - Admin approval system via email
- **JWT-based Authentication** - Secure token-based auth with refresh
- **Role-based Access Control** - Different permissions for students/admin
- **Password Security** - bcrypt hashing with salt rounds
- **Rate Limiting** - Protection against brute force attacks

### Frontend Features
- **Modern React UI** - Built with React 18 and TypeScript
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for delightful interactions
- **Touch/Swipe Support** - Apple-style club card navigation
- **Parallax Scrolling** - Immersive visual experience
- **Toast Notifications** - Real-time feedback for user actions

### Club Management
- **Interactive Club Cards** - Apple-style horizontal scrolling
- **Detailed Club Profiles** - Activities, members, achievements
- **Join/Leave Functionality** - Dynamic membership management
- **Search and Filtering** - Find clubs by category or name

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible components
- **Vite** - Fast development and building

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB/JSON** - Database (configurable)
- **JWT** - JSON Web Tokens for auth
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **Helmet** - Security middleware

## 📋 Prerequisites

- **Node.js** 16+ and npm 8+
- **Gmail account** for email service
- **Modern web browser** with JavaScript enabled

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd rudasumbwa-seminary
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
# Copy the environment template
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Application Settings
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:3000

# JWT Security (CHANGE IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Configuration
ADMIN_EMAIL=joyeuxpierreishimwe@gmail.com

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

### 4. Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. Go to **Google Account Settings** → **Security** → **App Passwords**
3. Generate a new app password for "Mail"
4. Use the 16-character app password (not your regular Gmail password)

### 5. Start the Application

#### Development Mode (Both Frontend & Backend)
```bash
npm start
```

#### Separate Commands
```bash
# Backend only
npm run server

# Frontend only (in another terminal)
npm run dev

# Backend with auto-restart
npm run server:dev
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 🔐 Email Workflow

### Registration Process
1. **Student Signup** - Student fills registration form
2. **Admin Notification** - Email sent to `joyeuxpierreishimwe@gmail.com`
3. **Admin Action** - Click approve/reject links in email
4. **Student Notification** - Automatic email with approval/rejection
5. **Login Access** - Approved students can sign in

### Email Templates
- **Admin Notification**: Student details + approve/reject buttons
- **Approval Email**: "You are allowed now to sign in to RUDASUMBWA. Enjoy the study."
- **Rejection Email**: "The Director of Studies has seen that you are not a student of Petit Séminaire Saint Léon Kabgayi. Try to call for more information."

## 🛡️ Security Features

- **Password Hashing** - bcrypt with 12 salt rounds
- **JWT Tokens** - Secure authentication with 7-day expiry
- **Rate Limiting** - 5 attempts per 15 minutes
- **Input Validation** - Server-side validation for all inputs
- **CORS Protection** - Configured for secure origins
- **Helmet Security** - Security headers and middleware
- **XSS Prevention** - Input sanitization

## 📱 Mobile Features

- **Touch/Swipe Navigation** - Apple-style club card swiping
- **Responsive Design** - Optimized for all screen sizes
- **Touch Gestures** - Intuitive mobile interactions
- **Mobile-First CSS** - Designed for mobile first

## 🎨 Design System

- **Dark Theme** - Modern dark interface
- **Glassmorphism** - Frosted glass effects
- **Neon Accents** - Cyan (#00f7ff) highlighting
- **Smooth Animations** - Framer Motion powered
- **Parallax Effects** - Immersive scrolling experience

## 🗄️ Database Structure

```json
{
  "users": [
    {
      "id": "timestamp",
      "firstName": "string",
      "lastName": "string", 
      "email": "string",
      "password": "hashed_string",
      "phone": "string",
      "class": "string",
      "district": "string", 
      "parish": "string",
      "status": "pending|approved|rejected",
      "createdAt": "ISO_date",
      "lastLogin": "ISO_date"
    }
  ]
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/validate` - Token validation

### Admin
- `GET /admin/approve/:email` - Approve user registration
- `GET /admin/reject/:email` - Reject user registration

### User
- `GET /api/user/profile` - Get user profile
- `GET /api/health` - Health check

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your_super_secure_production_key
FRONTEND_URL=https://your-domain.com
# ... other production values
```

### Build Commands
```bash
# Build frontend
npm run build

# Start production server
npm run server
```

### Security Checklist
- [ ] Change default JWT_SECRET
- [ ] Use HTTPS in production
- [ ] Set secure CORS origins
- [ ] Configure proper rate limits
- [ ] Use environment variables for all secrets
- [ ] Enable database backups
- [ ] Set up monitoring and logging

## 🔧 Customization

### Adding New Clubs
Edit the `appleStyleClubs` array in `/App.tsx`:

```typescript
{
  id: "new-club",
  name: "New Club Name",
  logo: "https://image-url.com",
  motto: "Club Motto",
  description: "Club description...",
  category: "Category",
  color: "#hex-color",
  // ... other properties
}
```

### Email Templates
Modify email templates in `/server.js`:
- `sendAdminNotification()` - Admin notification email
- `sendUserNotification()` - User approval/rejection emails

### Styling
- Main styles: `/styles/globals.css`
- Component styles: Tailwind classes in components
- Theme colors: CSS custom properties in globals.css

## 🐛 Troubleshooting

### Common Issues

**Email not sending:**
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
- Verify EMAIL_USER and EMAIL_PASS in .env

**Database errors:**
- Check users.json file permissions
- Ensure write access to application directory

**JWT errors:**
- Verify JWT_SECRET is set in .env
- Check token expiry settings

**Port conflicts:**
- Change PORT in .env if 3001 is in use
- Ensure frontend and backend use different ports

### Logs and Debugging
- Backend logs: Check console output
- Frontend errors: Browser developer console
- Network issues: Browser Network tab

## 📞 Support

For technical support or questions about the RUDASUMBWA Seminary system:

- **Admin Email**: joyeuxpierreishimwe@gmail.com
- **Seminary Phone**: +250 788 123 456
- **Seminary Email**: info@seminairekabgayi.rw

## 📄 License

This project is proprietary software for Petit Séminaire Saint Léon Kabgayi.

---

**"Paravi Lucernam Christo Meo"** - *I have prepared a lamp for my Christ*