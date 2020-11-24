
import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';


// const Navbar = (props) => {
//   return (
//     <div className={styles.navbar}>
//       <div className={styles.menubar}>
//         <div>
//           <img src={homeIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to='/Profile'>Profile</NavLink>
//         </div>
//         <div>
//           <img src={messagesIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to='/Dialogs'>Messages</NavLink>
//         </div>
//         <div>
//           <img src={newsIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to={'/News'}>News</NavLink>
//         </div>
//         <div>
//           <img src={musicIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to={'/Music'}>Music</NavLink>
//         </div>
//         <div>
//           <img src={settingsIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to={'/Settings'}>Settings</NavLink>
//         </div>
//         <div>
//           <img src={usersIcon} alt={''}></img>
//           <NavLink activeClassName={styles.activeLink} to={'/Users'}>Users</NavLink>
//         </div>
//       </div>
//       <div className={styles.friendsBar}>
//         <FriendsBar bestFriendsData={props.sidebarData.bestFriendsData} />
//       </div>
//     </div>
//   )
// }



import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { borders } from '@material-ui/system';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChatIcon from '@material-ui/icons/Chat';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import AnnouncementIcon from '@material-ui/icons/Announcement';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonPrevent() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<AccountBoxIcon />} href='/Profile' aria-label="profile" {...a11yProps(0)} />
          <Tab icon={<ChatIcon />} href='/Dialogs'aria-label="dialogs" {...a11yProps(1)} />
          <Tab icon={<AnnouncementIcon />} href='/News'aria-label="news" {...a11yProps(2)} />
          <Tab icon={<MusicNoteIcon />} href='/Music'aria-label="music" {...a11yProps(3)} />
          <Tab icon={<SettingsIcon />} href='/Settings'aria-label="settings" {...a11yProps(4)} />
          <Tab icon={<PeopleIcon />} href='/Users'aria-label="users" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0} ></TabPanel>
      <TabPanel value={value} index={1} ></TabPanel>
      <TabPanel value={value} index={2} ></TabPanel>
      <TabPanel value={value} index={3} ></TabPanel>
      <TabPanel value={value} index={4} ></TabPanel>
      <TabPanel value={value} index={5} ></TabPanel>
    </div>
  );
}

