# Green Tech Vault - Environmental Impact Tracking System

A comprehensive platform for tracking the environmental impact of e-waste recycling efforts.

## Overview

Green Tech Vault is a full-stack application designed to help organizations track and visualize the environmental impact of their e-waste recycling initiatives. The platform provides dashboards for monitoring key metrics such as e-waste collection, CO2 emissions saved, and materials recovered.

## Features

- **User Authentication**: Secure login for both clients and administrators
- **Environmental Impact Dashboard**: Visualize key metrics and environmental impact
- **Pickup Management**: Schedule and track e-waste pickups
- **Device Tracking**: Monitor the lifecycle of recycled devices
- **Reporting**: Generate detailed environmental impact reports
- **Admin Dashboard**: Comprehensive management tools for administrators

## Tech Stack

- **Frontend**: React, Material-UI, Chart.js, Recharts
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Deployment to Render

This application is configured for deployment on Render.com. Follow these steps to deploy:

1. **Create a new Web Service on Render**:
   - Connect your GitHub repository
   - Select the branch to deploy
   - Set the build command to: `npm install && npm run build:client`
   - Set the start command to: `npm start`

2. **Environment Variables**:
   - `NODE_ENV`: Set to `production`
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Secret key for JWT authentication
   - `PORT`: Default is 5000, but Render will provide its own

3. **Database Setup**:
   - Create a MongoDB database (Atlas recommended)
   - Add the connection string to your environment variables

## Troubleshooting Deployment Issues

### Missing Recharts Dependency

If you encounter a build error related to the `recharts` library:

```
Failed to compile.
Module not found: Error: Can't resolve 'recharts' in '/opt/render/project/src/green-tech-vault-impact/client/src/components/dashboard'
```

Fix it by adding the recharts dependency to your client's package.json:

1. Add recharts to your dependencies:
   ```
   cd client
   npm install --save recharts
   ```

2. Commit and push the changes:
   ```
   git add .
   git commit -m "Add recharts dependency"
   git push
   ```

3. Redeploy your application on Render

### Other Common Issues

- **Missing Dependencies**: Make sure all dependencies are properly listed in package.json
- **Build Script Issues**: Verify that the build script in package.json is correct
- **Environment Variables**: Check that all required environment variables are set in Render

## Local Development

1. **Clone the repository**:
   ```
   git clone https://github.com/yourusername/green-tech-vault.git
   cd green-tech-vault
   ```

2. **Install dependencies**:
   ```
   npm run install:all
   ```

3. **Start the development server**:
   ```
   npm run dev:full
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## License

ISC

## Contact

Green Tech Vault - support@greentechvault.com

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

<!-- Last updated: 2024-12-19 with design fixes for footer, parallax, and hero section -->

## Features

- React-based frontend with Material-UI
- Node.js/Express backend
- MongoDB database
- E-waste tracking and reporting
- User management system
- Environmental impact calculations

## Development

```bash
# Install dependencies
npm install

# Install client dependencies
cd client && npm install

# Run development server
npm run dev:full
```

## Deployment

The application is deployed on Render with automatic builds from the main branch. 