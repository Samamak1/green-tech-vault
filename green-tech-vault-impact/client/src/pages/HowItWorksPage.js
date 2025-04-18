import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import RecyclingMUIIcon from '@mui/icons-material/Recycling';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import ArticleIcon from '@mui/icons-material/Article';
import GppGoodIcon from '@mui/icons-material/GppGood';
import DeleteIcon from '@mui/icons-material/Delete';
import DevicesIcon from '@mui/icons-material/Devices';
import InventoryIcon from '@mui/icons-material/Inventory';
import ScaleIcon from '@mui/icons-material/Scale';
import ParkIcon from '@mui/icons-material/Park';
import LinkIcon from '@mui/icons-material/Link';
import ComputerIcon from '@mui/icons-material/Computer';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PrinterIcon from '@mui/icons-material/Print';
import TvIcon from '@mui/icons-material/Tv';
import NetworkWifiIcon from '@mui/icons-material/NetworkWifi';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import CableIcon from '@mui/icons-material/Cable';

// Import our custom RecyclingIcon
import RecyclingIcon from '../components/branding/RecyclingIcon';

// Styled components
const ProcessIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.teal.main,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}));

const ProcessCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: 8,
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
  },
}));

// Table styled component for the waste sorting
const StyledTableCell = styled(TableCell)(({ theme, type }) => ({
  padding: theme.spacing(2),
  ...(type === 'header' && {
    backgroundColor: theme.palette.teal.main,
    color: 'white',
    fontWeight: 'bold',
  }),
  ...(type === 'category' && {
    backgroundColor: theme.palette.teal.light,
    color: 'white',
    fontWeight: 'bold',
  }),
}));

const HowItWorksPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Process steps data
  const processSteps = [
    {
      icon: <AccessTimeIcon fontSize="large" />,
      title: "Schedule",
      description: "Schedule a pickup for your e-waste through our easy online form, or drop by one of our online hubs."
    },
    {
      icon: <LocalShippingIcon fontSize="large" />,
      title: "Collect",
      description: "Our team collects your devices from your location to the scheduled time."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "Secure",
      description: "All data is securely wiped from all devices following industry standards."
    },
    {
      icon: <RecyclingIcon fontSize="large" style={{ width: '1.5em', height: '1.5em' }} />,
      title: "Process",
      description: "Devices are examined, refurbished, or responsibly recycled."
    },
    {
      icon: <BarChartIcon fontSize="large" />,
      title: "Impact",
      description: "Receive detailed reports on your environmental impact and data security."
    }
  ];
  
  // Accepted Items categories
  const acceptedItems = [
    {
      category: "Computers",
      icon: <ComputerIcon />,
      items: ["Desktop Computer", "Laptop", "Servers", "Tablets", "Monitors"]
    },
    {
      category: "Mobile Devices",
      icon: <PhoneAndroidIcon />,
      items: ["Smartphones", "Cell Phones", "iPads", "Smart Watches", "Tablets"]
    },
    {
      category: "Office Equipment",
      icon: <PrinterIcon />,
      items: ["Printers", "Scanners", "Fax machines", "Copiers", "Shredders"]
    },
    {
      category: "Entertainment",
      icon: <TvIcon />,
      items: ["Televisions", "DVD/Blu-ray Players", "Gaming Consoles", "Audio Equipment", "Streaming Devices"]
    },
    {
      category: "Networking",
      icon: <NetworkWifiIcon />,
      items: ["Routers", "Modems", "Switches", "Hubs", "Network Cards"]
    },
    {
      category: "Peripherals",
      icon: <KeyboardIcon />,
      items: ["Keyboards", "Mice", "Webcams", "External Drives", "USB Devices"]
    },
    {
      category: "Power Equipment",
      icon: <BatteryFullIcon />,
      items: ["Batteries", "Power Supplies", "UPS Systems", "Chargers", "Adapters"]
    },
    {
      category: "Cables & Misc",
      icon: <CableIcon />,
      items: ["Cables", "Circuit Boards", "Memory Cards", "Hard Drives"]
    }
  ];
  
  // Waste sorting data
  const wasteCategories = [
    {
      category: "Definition",
      stockA: "Electronic items that are outdated, damaged, unwanted, or at the end of their useful lives.",
      stockB: "Technology that was considered outdated but could still be useful with some repairs, upgrades, or refurbishing.",
      stockC: "Electronics that are beyond usable function, missing key components, or too damaged to be safely refurbished."
    },
    {
      category: "Examples",
      stockA: "Older-model working laptops and smartphones, gaming consoles, functional office equipment.",
      stockB: "Computers with outdated specs but still operable, phones with cracked screens.",
      stockC: "Non-functional electronics, devices missing essential components, items with severe water or physical damage."
    },
    {
      category: "Treatment",
      stockA: "Testing, refurbishment, resale, data wiping, component harvesting if needed.",
      stockB: "Parts harvesting, data wiping, repairs, refurbishment, recycling of unusable parts.",
      stockC: "Dismantle for valuable materials, safe disposal of hazardous components, certified responsible recycling processes."
    },
    {
      category: "Where do they go?",
      stockA: [
        {
          title: "Registered Resellers",
          description: "Devices are resold after being refurbished, with proceeds supporting our mission."
        },
        {
          title: "Charity",
          description: "Functional devices are donated to schools, non-profits, communities needing affordable technology access."
        }
      ],
      stockB: [
        {
          title: "Workshops",
          description: "Used for training, research projects, and educational initiatives to build repair skills."
        },
        {
          title: "Components Harvesting",
          description: "Valuable parts are salvaged to repair other devices or sold to specialized repair shops."
        }
      ],
      stockC: [
        {
          title: "Responsible Parts Markets",
          description: "Valuable materials like gold, silver, copper, and rare earth minerals are recovered."
        },
        {
          title: "Recycling Industry",
          description: "Materials undergo specialized processing to properly handle hazardous components."
        },
        {
          title: "Raw Materials Stream",
          description: "Recovered minerals (e.g., gold, copper, rare earth) are sent back into manufacturing cycle."
        }
      ]
    }
  ];
  
  // Report types
  const reportTypes = [
    {
      title: "Certificate of Recycling",
      description: "Proof that your materials were responsibly processed in accordance with regulations.",
      icon: <ArticleIcon />
    },
    {
      title: "Data Destruction Certificate",
      description: "Confirms secure erasure or shredding of data-containing media.",
      icon: <GppGoodIcon />
    },
    {
      title: "Asset Tracking Report",
      description: "Itemized list with serial numbers and descriptions of every device collected.",
      icon: <DevicesIcon />
    },
    {
      title: "Weight Summary",
      description: "Breakdown of total materials collected, categorized by type.",
      icon: <ScaleIcon />
    },
    {
      title: "Environmental Impact Report",
      description: "See your positive impact in resources saved and waste diverted from landfills.",
      icon: <ParkIcon />
    },
    {
      title: "Chain of Custody",
      description: "A full record of how your e-waste was handled throughout processing.",
      icon: <LinkIcon />
    }
  ];
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.teal.main,
          color: 'white',
          py: 6,
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recycle Responsibly
              </Typography>
              <Typography variant="h6" paragraph>
                Dispose of your electronics safely while protecting your data and the environment!
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Button 
                  variant="contained" 
                  sx={{ 
                    bgcolor: 'white', 
                    color: theme.palette.teal.main,
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  REGISTER
                </Button>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    },
                    fontWeight: 'bold'
                  }}
                >
                  CLIENT LOGIN
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ maxWidth: 200 }}>
                <RecyclingIcon size={200} color="black" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Our Process Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}>
          Our Process
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 5 }}>
          From collection to refurbishment, reuse to responsible recycling, our process is designed with care. Whether you're an individual or an organization, we make it simple—so you can be part of the solution, every step of the way.
        </Typography>
        
        <Grid container spacing={4}>
          {processSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <ProcessCard elevation={2}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <ProcessIcon>
                    {step.icon}
                  </ProcessIcon>
                  <Typography variant="h6" component="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2">
                    {step.description}
                  </Typography>
                </CardContent>
              </ProcessCard>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* What Items Do We Accept Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
            What Items Do We Accept?
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 4 }}>
            Aren't sure if you can turn in a specific item? Use our search tool below to look up specific items!
          </Typography>
          
          {/* Search tool */}
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 6,
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            <TextField
              fullWidth
              placeholder="Search items..."
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ ml: 1 }}
                  >
                    <SearchIcon />
                  </Button>
                ),
              }}
            />
          </Box>
          
          <Typography variant="body2" sx={{ textAlign: 'center', mb: 4, color: 'text.secondary' }}>
            For further questions, please reach us at support@ecocycle.com or call (555) 123-4567
          </Typography>
          
          {/* Items Categories */}
          <Grid container spacing={4}>
            {acceptedItems.map((category, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ 
                  height: '100%', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          color: theme.palette.teal.main, 
                          mr: 1.5,
                          display: 'flex'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {category.category}
                      </Typography>
                    </Box>
                    
                    <List dense disablePadding>
                      {category.items.map((item, idx) => (
                        <ListItem key={idx} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 24 }}>
                            <Box 
                              sx={{ 
                                width: 6, 
                                height: 6, 
                                borderRadius: '50%', 
                                bgcolor: 'text.primary',
                                mt: 0.7
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ 
                              variant: 'body2',
                              sx: { fontWeight: 'medium' }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* How Do We Sort Your E-Waste Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
          How Do We Sort Your E-Waste?
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', mb: 5 }}>
          At EcoCycle Solutions, we sort your e-waste into three categories described in the table below
        </Typography>
        
        <TableContainer component={Paper} sx={{ mb: 6, overflow: 'hidden', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell type="header"></StyledTableCell>
                <StyledTableCell type="header" align="center">Stock A</StyledTableCell>
                <StyledTableCell type="header" align="center">Stock B</StyledTableCell>
                <StyledTableCell type="header" align="center">Stock C</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wasteCategories.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <StyledTableCell type="category">{row.category}</StyledTableCell>
                    {/* For Definition, Examples, and Treatment rows */}
                    {row.category !== "Where do they go?" && (
                      <>
                        <TableCell>{row.stockA}</TableCell>
                        <TableCell>{row.stockB}</TableCell>
                        <TableCell>{row.stockC}</TableCell>
                      </>
                    )}
                    {/* For "Where do they go?" row, which has nested items */}
                    {row.category === "Where do they go?" && (
                      <>
                        <TableCell>
                          {row.stockA.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell>
                          {row.stockB.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                        <TableCell>
                          {row.stockC.map((item, idx) => (
                            <Box key={idx} sx={{ mb: 2 }}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {item.title}
                              </Typography>
                              <Typography variant="body2">
                                {item.description}
                              </Typography>
                            </Box>
                          ))}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      
      {/* Recycling Reports Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            Recycling Reports You Can Rely On
          </Typography>
          <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 5 }}>
            We provide detailed documentation with every pickup and processing job. Our reporting is complete, transparent, and eco-conscious.
          </Typography>
          
          <Grid container spacing={3} justifyContent="center">
            {reportTypes.map((report, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%', 
                          bgcolor: theme.palette.teal.main,
                          color: 'white',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mr: 2
                        }}
                      >
                        {report.icon}
                      </Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {report.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {report.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ bgcolor: theme.palette.teal.main, color: 'white', py: 5 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Ready to start recycling?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Join us in our mission to make e-waste recycling accessible, secure, and sustainable for everyone.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: 'white', 
                color: theme.palette.teal.main,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)'
                },
                fontWeight: 'bold',
                px: 4
              }}
            >
              SCHEDULE A PICKUP
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                },
                fontWeight: 'bold',
                px: 4
              }}
            >
              LEARN MORE
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HowItWorksPage; 