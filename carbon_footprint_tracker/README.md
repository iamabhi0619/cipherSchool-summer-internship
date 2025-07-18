# 🌱 Carbon Footprint Tracker - Frontend

A comprehensive React frontend application for tracking and reducing your carbon footprint. Built with React 19, React Router DOM v6+, and Tailwind CSS.

## ✨ Features

### 🔐 Authentication
- User login and registration
- JWT token-based authentication
- Protected routes with automatic redirects
- Persistent login sessions

### 📊 Dashboard
- Real-time carbon footprint analytics
- Interactive charts and visualizations
- Weekly progress tracking
- Category-wise emission breakdown
- Personalized suggestions for improvement

### 📝 Activity Logging
- Comprehensive activity form
- Multiple categories: Transportation, Energy, Food, Housing, Shopping
- Automatic carbon emission calculations
- Activity history and tracking

### 🎯 Goal Setting
- Create custom reduction goals
- Progress tracking with visual indicators
- Goal deadline management
- Achievement notifications

### 🏆 Achievements System
- Unlock badges for eco-friendly actions
- Progress tracking for locked achievements
- Ranking system with points
- Multiple achievement categories

### 📈 Leaderboard
- Community ranking system
- Monthly competitions
- Performance trends
- User comparison metrics

### 📄 Reports
- Detailed carbon footprint reports
- PDF export functionality
- Period-wise analysis
- Achievement summaries
- Personalized recommendations

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **React Router DOM v6+** - Client-side routing
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Recharts** - Responsive chart library
- **Lucide React** - Beautiful icon library
- **localStorage** - Client-side storage for authentication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ActivityForm.jsx       # Activity logging form
│   ├── CarbonScoreCard.jsx    # Carbon score display
│   ├── ChartSection.jsx       # Chart components
│   ├── GoalTracker.jsx        # Goal progress tracking
│   ├── LeaderboardTable.jsx   # Leaderboard display
│   ├── MainLayout.jsx         # Main app layout
│   ├── Navbar.jsx             # Navigation component
│   ├── PDFReportButton.jsx    # PDF export functionality
│   ├── PrivateRoute.jsx       # Route protection
│   └── SuggestionsList.jsx    # Improvement suggestions
├── pages/               # Page components
│   ├── HomePage.jsx           # Landing page
│   ├── LoginPage.jsx          # Login form
│   ├── RegisterPage.jsx       # Registration form
│   ├── DashboardPage.jsx      # Main dashboard
│   ├── ActivityFormPage.jsx   # Activity logging page
│   ├── GoalsPage.jsx          # Goals management
│   ├── AchievementsPage.jsx   # Achievements display
│   ├── LeaderboardPage.jsx    # Community leaderboard
│   ├── ReportPage.jsx         # Reports and analytics
│   └── NotFoundPage.jsx       # 404 error page
├── context/             # React Context
│   ├── AuthContext.jsx       # Authentication state
│   └── useAuth.js            # Auth hook
├── utils/               # Utility functions
├── App.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🗺️ Routes

| Route | Component | Description | Protection |
|-------|-----------|-------------|------------|
| `/` | HomePage | Landing page with features | Public |
| `/login` | LoginPage | User login form | Public |
| `/register` | RegisterPage | User registration | Public |
| `/dashboard` | DashboardPage | Main user dashboard | Private |
| `/log-activity` | ActivityFormPage | Log new activities | Private |
| `/goals` | GoalsPage | Manage reduction goals | Private |
| `/achievements` | AchievementsPage | View achievements | Private |
| `/leaderboard` | LeaderboardPage | Community rankings | Private |
| `/report` | ReportPage | Generate reports | Private |
| `*` | NotFoundPage | 404 error page | Public |

## 🎨 UI Components

### Authentication
- **LoginPage** - Clean login form with validation
- **RegisterPage** - Registration with password confirmation
- **PrivateRoute** - Route protection wrapper

### Dashboard
- **CarbonScoreCard** - Circular progress with goal tracking
- **ChartSection** - Bar and pie charts for data visualization
- **SuggestionsList** - Personalized improvement tips

### Activity Management
- **ActivityForm** - Multi-category activity logging
- **GoalTracker** - Visual goal progress with deadlines

### Community Features
- **LeaderboardTable** - Ranked user performance
- **AchievementsBadge** - Unlockable achievement cards

### Reports
- **PDFReportButton** - Export functionality
- **ReportPage** - Comprehensive analytics view

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=EcoTracker
```

### Tailwind Configuration
The project uses Tailwind CSS v4 with automatic configuration. Custom styles can be added to `src/index.css`.

### Vite Configuration
Build and development settings are configured in `vite.config.js`.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with sidebar navigation
- **Tablet** - Adapted layout with collapsible navigation
- **Mobile** - Touch-optimized interface with bottom navigation

## 🎯 Key Features in Detail

### Activity Logging System
- **5 Main Categories**: Transportation, Energy, Food, Housing, Shopping
- **20+ Activity Types**: From car trips to appliance usage
- **Automatic Calculations**: Built-in carbon emission factors
- **Smart Form**: Auto-populating units and validation

### Goal Management
- **SMART Goals**: Specific, measurable, achievable targets
- **Visual Progress**: Circular progress bars and trend indicators
- **Deadline Tracking**: Overdue notifications and timeline management
- **Achievement Integration**: Goals unlock achievements

### Achievement System
- **4 Rarity Levels**: Common, Uncommon, Rare, Epic
- **Multiple Categories**: Milestones, Consistency, Reduction, Competition
- **Progress Tracking**: Visual progress for locked achievements
- **Point System**: Accumulate points for ranking

### Leaderboard Features
- **Multiple Timeframes**: Weekly, monthly, yearly, all-time
- **Category Filtering**: Overall, transportation, energy, food
- **Trend Indicators**: Up, down, or stable performance
- **Competition Rewards**: Monthly prizes for top performers

## 🚧 Future Enhancements

- [ ] Real backend API integration
- [ ] Push notifications for goals and achievements
- [ ] Social sharing features
- [ ] Advanced analytics with machine learning
- [ ] Offline mode with data synchronization
- [ ] Mobile app version
- [ ] Integration with IoT devices
- [ ] Carbon offset marketplace

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Environmental Impact

This app is designed to help users:
- **Track** their carbon footprint accurately
- **Reduce** emissions through informed decisions
- **Compete** in friendly environmental challenges
- **Learn** about sustainable living practices
- **Achieve** measurable environmental goals

---

Made with 💚 for a sustainable future+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
