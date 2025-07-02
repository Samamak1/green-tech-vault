import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  TextField, 
  Button, 
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

// Fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components
const AnimatedBox = styled(Box)(({ delay = 0 }) => ({
  animation: `${fadeIn} 0.8s ease-out ${delay}s both`,
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}ee 0%, 
    ${theme.palette.success.main}dd 50%, 
    ${theme.palette.secondary.main}ee 100%
  )`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/blockchain-tracking.svg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.05,
    zIndex: 1,
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  color: 'white',
  padding: theme.spacing(4),
}));

const LogoBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '& img': {
    maxWidth: '200px',
    height: 'auto',
    filter: 'brightness(0) invert(1)', // Make logo white
    [theme.breakpoints.down('sm')]: {
      maxWidth: '150px',
    }
  }
}));

const EmailForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  margin: theme.spacing(4, 0),
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.success.main,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: theme.palette.success.main,
    },
  },
  '& .MuiOutlinedInput-input::placeholder': {
    color: 'rgba(255, 255, 255, 0.5)',
  }
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: 'white',
  padding: theme.spacing(1.5, 4),
  borderRadius: '12px',
  fontWeight: 600,
  fontSize: '1rem',
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(78, 205, 196, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.success.dark,
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(78, 205, 196, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}));

const SocialLinksBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  margin: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    gap: theme.spacing(2),
  }
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  color: 'white',
  width: '60px',
  height: '60px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.success.main,
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 10px 30px rgba(78, 205, 196, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50px',
    height: '50px',
  }
}));

const FooterText = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
  marginTop: theme.spacing(6),
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  }
}));

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return;
    }

    // Here you would typically send the email to your backend
    console.log('Email submitted:', email);
    
    setSubscribed(true);
    setShowSnackbar(true);
    setEmail('');
  };

  const handleSocialClick = (platform, url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <GradientBackground>
      <ContentWrapper maxWidth="md">
        {/* Logo */}
        <AnimatedBox delay={0}>
          <LogoBox>
            <img 
              src="/images/logo.png" 
              alt="RYGNeco Logo" 
              onError={(e) => {
                // Fallback if logo doesn't load
                e.target.style.display = 'none';
              }}
            />
          </LogoBox>
        </AnimatedBox>

        {/* Main Headline */}
        <AnimatedBox delay={0.2}>
          <Typography 
            variant={isMobile ? "h3" : "h1"} 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(45deg, #ffffff, #4ECDC4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
          >
            RYGNeco is Almost Here.
          </Typography>
        </AnimatedBox>

        {/* Subheadline */}
        <AnimatedBox delay={0.4}>
          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              fontWeight: 400,
              maxWidth: '600px',
              lineHeight: 1.5,
            }}
          >
            E-waste recycling made easy, secure, and sustainable — launching soon in Cincinnati.
          </Typography>
        </AnimatedBox>

        {/* Email Signup Form */}
        {!subscribed && (
          <AnimatedBox delay={0.6}>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 2,
                opacity: 0.8,
                fontWeight: 500,
              }}
            >
              Be the first to know when we launch.
            </Typography>
            
            <EmailForm component="form" onSubmit={handleEmailSubmit}>
              <StyledTextField
                type="email"
                label="Enter your email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', mr: 1 }} />
                  ),
                }}
              />
              <SubscribeButton 
                type="submit"
                disabled={!email || !email.includes('@')}
              >
                Subscribe
              </SubscribeButton>
            </EmailForm>
          </AnimatedBox>
        )}

        {/* Thank you message for subscribed users */}
        {subscribed && (
          <AnimatedBox delay={0.6}>
            <Box 
              sx={{ 
                backgroundColor: 'rgba(78, 205, 196, 0.2)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: 3,
                margin: 4,
                border: '1px solid rgba(78, 205, 196, 0.3)',
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Thanks for subscribing! 🎉
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                We'll notify you as soon as we launch.
              </Typography>
            </Box>
          </AnimatedBox>
        )}

        {/* Social Media Links */}
        <AnimatedBox delay={0.8}>
          <Typography 
            variant="body1" 
            sx={{ 
              mb: 2,
              opacity: 0.8,
              fontWeight: 500,
            }}
          >
            Connect with us:
          </Typography>
          
          <SocialLinksBox>
            <SocialIconButton 
              onClick={() => handleSocialClick('Instagram', 'https://instagram.com/rygneco')}
              aria-label="Follow us on Instagram"
            >
              <InstagramIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
            </SocialIconButton>
            
            <SocialIconButton 
              onClick={() => handleSocialClick('Facebook', 'https://facebook.com/RYGNeco')}
              aria-label="Follow us on Facebook"
            >
              <FacebookIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
            </SocialIconButton>
            
            <SocialIconButton 
              onClick={() => handleSocialClick('LinkedIn', 'https://linkedin.com/company/rygneco')}
              aria-label="Follow us on LinkedIn"
            >
              <LinkedInIcon sx={{ fontSize: isMobile ? 24 : 28 }} />
            </SocialIconButton>
          </SocialLinksBox>
        </AnimatedBox>

        {/* Footer */}
        <AnimatedBox delay={1.0}>
          <FooterText variant="body2">
            Website under construction. We'll be live soon.<br />
            Thank you for your patience and support.
          </FooterText>
        </AnimatedBox>
      </ContentWrapper>

      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ 
            backgroundColor: theme.palette.success.main,
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            }
          }}
        >
          Successfully subscribed! We'll be in touch soon.
        </Alert>
      </Snackbar>
    </GradientBackground>
  );
};

export default ComingSoonPage; 