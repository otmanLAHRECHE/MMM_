import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ThreePRoundedIcon from '@mui/icons-material/ThreePRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import BiotechIcon from '@mui/icons-material/Biotech';
import {Navigate} from 'react-router-dom';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dashboard_details from './Dashboard-details';
import Tests from './Tests';




const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [toolBar,setToolBar] = React.useState("Tableau de bord");

  const [page, setPage] = React.useState([true,false,false,false]);

  const [logOut, setLogOut] = React.useState(false);

  const [openLogOut, setOpenLogOut] = React.useState(false);


  const LogOutClose = () =>{
    setOpenLogOut(false);
  }

  const LogOutConfirmation = async () =>{
    await localStorage.removeItem("auth_token");
    await localStorage.removeItem("user_type");
    setLogOut(true);
  }
  
  const handleLogOut = () =>{

    setOpenLogOut(true);
    
  }

  const clickDashboard = () =>{
    
    setPage([true,false,false,false])
    setToolBar("Tableau de bord")
  };
  const clickTests = () =>{
      
    setPage([false,true,false,false])
    setToolBar("Examens")
  };
  const clickStatestiques = () =>{
      
    setPage([false,false,true,false])
    setToolBar("Statestiques")
  };
  const clickSettings = () =>{
      
    setPage([false,false,false,true])
    setToolBar("Options")
  };

  

  if(localStorage.getItem("auth_token")==null && logOut == true){
    window.location.reload();
  }
  
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {toolBar}
            </Typography>

            <Button color="inherit" startIcon={<ThreePRoundedIcon />}>Reception</Button>
            <FiberManualRecordIcon
                fontSize="small"
                  sx={{
                    mr: 1,
                    color: '#4caf50',
                  }}
            />      
            
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="secondary"
                onClick={handleLogOut}
              >
                <LogoutIcon />
              </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
                <ListItemButton selected = {page[0]} onClick={clickDashboard}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tableau de bord"/>
                </ListItemButton>
                <ListItemButton selected={page[1]} onClick={clickTests}>
                  <ListItemIcon>
                    <BiotechIcon />
                  </ListItemIcon>
                  <ListItemText primary="Examens médicaux" />
                </ListItemButton>
                <ListItemButton selected={page[2]} onClick={clickStatestiques}>
                  <ListItemIcon>
                    <InsertChartOutlinedTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Statestiques" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />
                    <ListSubheader component="div" inset>
                      Autre options
                    </ListSubheader>

                <ListItemButton selected={page[3]} onClick={clickSettings}>
                  <ListItemIcon>
                    <SettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Options" />
                </ListItemButton>
             
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />

        
        {page[0] ? <Dashboard_details/> : null}
        {page[1] ? <Tests/> : null}
        {page[2] ? <Dashboard_details/> : null}
        {page[3] ? <Dashboard_details/> : null}
        

        
          
        </Box>
      </Box>

      <Dialog open={openLogOut}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={LogOutClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la déconnection"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  Êtes-vous sûr ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={LogOutClose}>Anuller</Button>
                                  <Button onClick={LogOutConfirmation}>Log out</Button>
                                </DialogActions>
                  </Dialog>

    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}