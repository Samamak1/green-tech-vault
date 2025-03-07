# Green Tech Vault - Environmental Impact Tracking System

A comprehensive web application for tracking, measuring, and showcasing the environmental impact of e-waste management efforts by Green Tech Vault.

## Project Overview

Green Tech Vault collects e-waste, outdated tech, and old electronics from companies with the goal of reducing the 80% of e-waste that typically ends up in landfills. This application helps track and demonstrate the environmental impact of these efforts by:

1. Tracking e-waste collection from companies
2. Calculating environmental impacts for different disposal methods (repurposing, recycling)
3. Creating company profiles showing their contributions
4. Generating reports for each pickup and overall impact

## Environmental Impact Metrics

The system uses industry-standard benchmarks to calculate environmental impacts:

### Carbon Emission Factors

| Device Type | Estimated CO₂ Footprint (New) | Refurbishment Savings | Recycling Savings |
|-------------|-------------------------------|------------------------|-------------------|
| Laptop | 200–300 kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |
| Desktop Tower | 300–400 kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |
| LCD Monitor | 150–200 kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |
| Smartphone | 50–80 kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |
| Tablets/Thin | 100–120 kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |
| Servers | 500–1000+ kg CO₂/device | 70–80% of new device | ~1.2–1.6 kg CO₂/kg e-waste |

### Material Recovery Rates

From 1 metric ton (1,000 kg) of mixed e-waste, typical recovery rates:

- Metals (steel, aluminum, copper, precious metals): ~150–300 kg
- Plastics: ~100–250 kg
- Glass: ~50–100 kg
- Rare Earth Metals: Varies by device type

## Features

- **Company Management**: Create and manage company profiles
- **Pickup Tracking**: Record details of e-waste pickups from companies
- **Device Inventory**: Track individual devices collected, their condition, and disposition
- **Environmental Impact Calculation**: Automatically calculate CO2 savings, materials recovered, and landfill diversion
- **Reporting**: Generate detailed reports for companies showing their environmental impact
- **Dashboard**: Visual representation of impact metrics with charts and comparisons
- **User Authentication**: Secure access for both Green Tech Vault staff and client companies

## Technology Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React.js, Chart.js
- **Authentication**: JWT (JSON Web Tokens)
- **Reporting**: PDF generation for downloadable reports

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd client
   npm install
   ```
3. Set up environment variables (see .env.example)
4. Start the development server:
   ```
   npm run dev:full
   ```

## Project Structure

```
green-tech-vault-impact/
├── client/                 # Frontend React application
├── server/                 # Backend Express application
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── public/                 # Static files
└── .env                    # Environment variables
```

## API Endpoints

- `/api/companies` - Company management
- `/api/pickups` - Pickup tracking
- `/api/devices` - Device inventory
- `/api/impact` - Environmental impact calculations
- `/api/reports` - Report generation
- `/api/auth` - User authentication

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and owned by Green Tech Vault.

## Contact

Green Tech Vault - [contact@greentechvault.com](mailto:contact@greentechvault.com)

Project Link: [https://github.com/greentechvault/environmental-impact-tracker](https://github.com/greentechvault/environmental-impact-tracker) 