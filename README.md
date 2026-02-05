# Morningful AI Landing Page 

A modern, clean React landing page for Morningful AI's financial management platform.

## 🚀 Features

- **Modern React Architecture**: Built with React 19 and best practices
- **Feature-Based Structure**: Organized by features for better maintainability
- **Custom Hooks**: Clean state management with custom hooks
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Type Safety**: PropTypes validation for better development experience

## 📁 Project Structure

```
src/
├── features/                    # Feature-based organization
│   └── landing/                # Landing page sections
├── shared/                     # Shared utilities and components
│   ├── components/             # Reusable components
│   ├── hooks/                  # Custom hooks
│   ├── services/               # API services
│   ├── constants/              # App constants
│   └── config/                 # Configuration
├── config/                     # Legacy config (backward compatibility)
├── services/                   # Legacy services (backward compatibility)
└── App.js                      # Main application component
```

## 🛠 Technologies Used

- **React 19** - Latest React version
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **PropTypes** - Runtime type checking

## 📋 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd cash-kfir-landing-page
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env.local with:
   REACT_APP_API_URL=your-api-url
   ```

4. **Start development server**
   ```bash
   npm start
   ```

## 🌍 Environment Variables

| Variable            | Description     | Default                  |
| ------------------- | --------------- | ------------------------ |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:42000` |

## 📦 Build & Deployment

1. **Build for production**

   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel, Netlify, AWS S3, etc.

## 🤝 Contributing

- Follow the established feature-based organization
- Add PropTypes to new components
- Use meaningful component and variable names
- Keep components focused and single-purpose

---

**Built for Morningful AI**
