/**
 * This utility is used to apply consistent layouts to all pages
 * in the SMS system both on client and admin sides.
 * 
 * It provides instructions for manual implementation and examples of
 * how to apply the standard content container and wrapper styles.
 */

import { getContentContainerStyle, getContentWrapperStyle } from './layoutStyles';

/**
 * IMPLEMENTATION GUIDE
 * 
 * To apply consistent layout to a page, modify its top-level container as follows:
 * 
 * 1. Import the necessary styles:
 *    import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
 * 
 * 2. Apply the styles to your component:
 *    <Box sx={getContentContainerStyle()} data-boundary="true">
 *      <Box sx={getContentWrapperStyle()}>
 *        // Page content goes here
 *      </Box>
 *    </Box>
 * 
 * EXAMPLE USAGE FOR DASHBOARD PAGE:
 * 
 * import React from 'react';
 * import { Box, Typography } from '@mui/material';
 * import { getContentContainerStyle, getContentWrapperStyle } from '../utils/layoutStyles';
 * 
 * const Dashboard = () => {
 *   return (
 *     <Box sx={getContentContainerStyle()} data-boundary="true">
 *       <Box sx={getContentWrapperStyle()}>
 *         <Typography variant="h6">Dashboard</Typography>
 *         // Rest of dashboard content
 *       </Box>
 *     </Box>
 *   );
 * };
 * 
 * export default Dashboard;
 */

/**
 * List of pages that should have the consistent layout applied:
 * 
 * CLIENT PAGES:
 * - Dashboard.js
 * - ClientAnnouncements.js
 * - PickupCalendar.js
 * - Reports.js
 * - ClientMessages.js
 * - RGYNProfile.js
 * - PickupDetail.js
 * - ReportDetail.js
 * - CompanyProfile.js
 * - Devices.js
 * 
 * ADMIN PAGES:
 * - AdminDashboard.js
 * - AdminAnnouncements.js
 * - AdminPickupCalendar.js
 * - AdminMessages.js
 * - AdminClientProfile.js
 * - AdminPickupDetail.js
 * - AdminDeviceDetail.js
 * - AdminProfile.js
 * - TrialPage.js
 */

export { getContentContainerStyle, getContentWrapperStyle }; 