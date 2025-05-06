import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Divider,
  useTheme
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart, 
  Area,
  LineChart,
  Line
} from 'recharts';
import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
import Header from '../components/layout/Header';
import ClientSidebar from '../components/layout/ClientSidebar';

const ClientReports = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Mock data for Carbon Footprint
  const carbonFootprintData = [
    { month: 'Jan', CO2: 120 },
    { month: 'Feb', CO2: 200 },
    { month: 'Mar', CO2: 150 },
    { month: 'Apr', CO2: 230 },
    { month: 'May', CO2: 190 },
    { month: 'Jun', CO2: 270 },
    { month: 'Jul', CO2: 310 },
    { month: 'Aug', CO2: 280 },
    { month: 'Sep', CO2: 330 },
    { month: 'Oct', CO2: 260 },
    { month: 'Nov', CO2: 290 },
    { month: 'Dec', CO2: 350 }
  ];

  // Mock data for Environmental Impact
  const environmentalImpactData = [
    { name: 'Trees Saved', value: 45 },
    { name: 'Water Saved (gal)', value: 12500 },
    { name: 'Energy Saved (kWh)', value: 8500 },
    { name: 'Emissions Reduced (kg)', value: 3200 }
  ];

  // Mock data for Landfill Diversion
  const landfillDiversionData = [
    { name: 'Recycled', value: 75 },
    { name: 'Landfill', value: 25 }
  ];

  // Mock data for Materials Collected
  const materialsCollectedData = [
    { name: 'Electronics', value: 42 },
    { name: 'Metals', value: 28 },
    { name: 'Plastics', value: 20 },
    { name: 'Glass', value: 5 },
    { name: 'Other', value: 5 }
  ];

  // Mock data for monthly trends
  const monthlyTrendsData = [
    { month: 'Jan', devices: 32, weight: 120 },
    { month: 'Feb', devices: 45, weight: 180 },
    { month: 'Mar', devices: 38, weight: 150 },
    { month: 'Apr', devices: 56, weight: 210 },
    { month: 'May', devices: 42, weight: 160 },
    { month: 'Jun', devices: 60, weight: 225 },
    { month: 'Jul', devices: 65, weight: 240 },
    { month: 'Aug', devices: 55, weight: 200 },
    { month: 'Sep', devices: 70, weight: 260 },
    { month: 'Oct', devices: 62, weight: 230 },
    { month: 'Nov', devices: 75, weight: 280 },
    { month: 'Dec', devices: 90, weight: 320 }
  ];

  // Colors for charts
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];
  const PIE_COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#FF3333'];
  const LANDFILL_COLORS = ['#00C49F', '#FF5252'];

  return (
    <Box sx={{ display: 'flex' }}>
      <ClientSidebar />
      <Box sx={{ flexGrow: 1, ml: '225px' }}>
        <Header />
        <Box sx={getContentContainerStyle()} data-boundary="true">
          <Box sx={{ ...getContentWrapperStyle(), mt: '64px' }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#185B5F' }}>
              Environmental Impact Reports
            </Typography>
            
            <Paper sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  bgcolor: '#f5f5f5',
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#185B5F',
                  },
                  '& .Mui-selected': {
                    color: '#185B5F !important',
                    fontWeight: 'bold',
                  }
                }}
              >
                <Tab label="Carbon Footprint" />
                <Tab label="Environmental Impact" />
                <Tab label="Landfill Diversion" />
                <Tab label="Materials Collected" />
              </Tabs>
            </Paper>
            
            {/* Carbon Footprint */}
            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      CO₂ Emissions Saved (kg) - Monthly
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      By recycling your electronic devices with Green Tech Vault, your company has saved the following amount of CO₂ emissions from entering the atmosphere.
                    </Typography>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart
                        data={carbonFootprintData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="CO2" 
                          name="CO₂ Saved (kg)" 
                          stroke="#185B5F" 
                          fill="#185B5F" 
                          fillOpacity={0.3} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    
                    <Box sx={{ mt: 4, p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ color: '#185B5F', fontWeight: 'bold' }}>
                              2,580
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Total CO₂ Saved (kg)
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ color: '#185B5F', fontWeight: 'bold' }}>
                              215
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Monthly Average (kg)
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" sx={{ color: '#185B5F', fontWeight: 'bold' }}>
                              37%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Year-over-Year Increase
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
            
            {/* Environmental Impact */}
            {activeTab === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Environmental Resources Saved
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Your recycling efforts have contributed to preserving these natural resources.
                    </Typography>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={environmentalImpactData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="Amount Saved" fill="#3f51b5">
                          {environmentalImpactData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Your Environmental Impact
                    </Typography>
                    
                    <Box sx={{ mt: 2, mb: 4 }}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        Equivalent to:
                      </Typography>
                      
                      <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2, mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                          45 Trees Planted
                        </Typography>
                        <Typography variant="body2">
                          Your e-waste recycling has saved enough resources to plant this many trees
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2, mb: 2 }}>
                        <Typography variant="h6" sx={{ color: '#1565c0' }}>
                          950 Gallons of Gas
                        </Typography>
                        <Typography variant="body2">
                          That's enough to drive from NYC to LA three times!
                        </Typography>
                      </Box>
                      
                      <Box sx={{ p: 2, bgcolor: '#fff8e1', borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ color: '#f57c00' }}>
                          6,200 kWh of Electricity
                        </Typography>
                        <Typography variant="body2">
                          Equivalent to powering an average home for 7 months
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        mt: 2, 
                        bgcolor: '#185B5F',
                        '&:hover': { bgcolor: '#124548' }
                      }}
                    >
                      Download Full Report
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            )}
            
            {/* Landfill Diversion */}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Waste Diversion Rate
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Percentage of e-waste diverted from landfills through recycling and refurbishment.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={landfillDiversionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {landfillDiversionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={LANDFILL_COLORS[index % LANDFILL_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', color: '#00C49F' }}>
                      You've diverted 75% of your e-waste from landfills!
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                      That's 15% above the industry average.
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Monthly Diversion Trend
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Your progress in diverting e-waste from landfills over the past year.
                    </Typography>
                    
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart
                        data={monthlyTrendsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" orientation="left" stroke="#185B5F" />
                        <YAxis yAxisId="right" orientation="right" stroke="#FF8042" />
                        <Tooltip />
                        <Legend />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="devices" 
                          name="Devices Recycled" 
                          stroke="#185B5F" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="weight" 
                          name="Weight (kg)" 
                          stroke="#FF8042" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    
                    <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        Key Insights:
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        • Your recycling volume has increased by 28% in the past 6 months
                      </Typography>
                      <Typography variant="body2">
                        • December was your most impactful month with 90 devices recycled
                      </Typography>
                      <Typography variant="body2">
                        • Your company has maintained a consistent upward trend throughout the year
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            )}
            
            {/* Materials Collected */}
            {activeTab === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Materials Breakdown
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Types of materials recovered from your recycled electronics.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={materialsCollectedData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {materialsCollectedData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#185B5F' }}>
                      Materials Recovery Impact
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Precious Metals
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ color: '#1565c0' }}>
                              3.2 kg
                            </Typography>
                            <Typography variant="body2">
                              Gold, silver, and palladium recovered
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Copper
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ color: '#2e7d32' }}>
                              15.7 kg
                            </Typography>
                            <Typography variant="body2">
                              Recovered from wiring and circuit boards
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#fff8e1', height: '100%' }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Plastics
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ color: '#f57c00' }}>
                              28.5 kg
                            </Typography>
                            <Typography variant="body2">
                              Recycled into new products
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Card sx={{ bgcolor: '#ffebee', height: '100%' }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              Hazardous Materials
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ color: '#c62828' }}>
                              5.3 kg
                            </Typography>
                            <Typography variant="body2">
                              Safely processed and neutralized
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        mt: 3, 
                        bgcolor: '#185B5F',
                        '&:hover': { bgcolor: '#124548' }
                      }}
                    >
                      Download Materials Report
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClientReports; 