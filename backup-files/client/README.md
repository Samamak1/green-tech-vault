# Green Tech Vault - Environmental Impact Tracker (Frontend)

This is the frontend application for the Green Tech Vault Environmental Impact Tracking System. It provides a user interface for tracking, measuring, and showcasing the environmental impact of e-waste management efforts.

## Features

- **Interactive Dashboard**: Visualize environmental impact metrics with charts and graphs
- **Company Profiles**: View and manage company information and impact metrics
- **Pickup Management**: Track e-waste collection events
- **Device Inventory**: Manage collected devices and their disposition
- **Report Generation**: Create and download environmental impact reports
- **Secure Authentication**: User login and role-based access control

## Technology Stack

- **React**: Frontend library for building the user interface
- **Material-UI**: Component library for modern, responsive design
- **Chart.js**: Library for data visualization
- **React Router**: For navigation and routing
- **Axios**: For API requests
- **JWT**: For authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Project Structure

```
client/
├── public/                # Static files
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── context/           # React context providers
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── assets/            # Images, icons, etc.
│   ├── App.js             # Main application component
│   └── index.js           # Entry point
└── package.json           # Dependencies and scripts
```

## Environmental Impact Metrics

The application calculates and displays various environmental impact metrics:

- **CO2 Emissions Saved**: Through recycling and refurbishment
- **Materials Recovered**: Metals, plastics, glass, and rare earth metals
- **Landfill Diversion**: Amount of e-waste diverted from landfills
- **Environmental Equivalents**: Tree planting and car emissions equivalents

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and owned by Green Tech Vault. 