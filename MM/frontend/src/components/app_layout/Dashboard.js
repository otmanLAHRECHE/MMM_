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
import {Navigate} from 'react-router-dom';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import OutputIcon from '@mui/icons-material/Output';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import FaxIcon from '@mui/icons-material/Fax';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dashboard_details from './Dashboard-details';
import Fournisseur from './Fournisseur';
import ServiceAffectation from './ServiceAffectaion';




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

  const [page, setPage] = React.useState([true,false,false,false,false,false,false,false,false,false,false]);

  const [logOut, setLogOut] = React.useState(false);

  const [openLogOut, setOpenLogOut] = React.useState(false);


  const LogOutClose = () =>{
    setOpenLogOut(false);
  }

  const LogOutConfirmation = async () =>{
    await localStorage.removeItem("auth_token");
    setLogOut(true);
  }
  
  const handleLogOut = () =>{

    setOpenLogOut(true);
    
  }

  const clickDashboard = () =>{
    
    setPage([true,false,false,false,false,false,false,false,false,false,false])
    setToolBar("Tableau de bord")
  };
  const clickMaterials = () =>{
      
    setPage([false,true,false,false,false,false,false,false,false,false,false])
    setToolBar("Matériels")
  };
  const clickAffectation = () =>{
      
    setPage([false,false,true,false,false,false,false,false,false,false,false])
    setToolBar("Affectation")
  };
  const clickEnPanne = () =>{
      
    setPage([false,false,false,true,false,false,false,false,false,false,false])
    setToolBar("En Panne")
  };

  const clickReform = () =>{
      
    setPage([false,false,false,false,true,false,false,false,false,false,false])
    setToolBar("Réforme")
  };

  const clickReparation = () =>{
      
    setPage([false,false,false,false,false,true,false,false,false,false,false])
    setToolBar("Reparation")
  };

  const clickFamille = () =>{
      
    setPage([false,false,false,false,false,false,true,false,false,false,false])
    setToolBar("Familles d'équipements")
  };

  const clickDesignation = () =>{
      
    setPage([false,false,false,false,false,false,false,true,false,false,false])
    setToolBar("Type d'équipements")
  };

  const clickFournisseur = () =>{
      
    setPage([false,false,false,false,false,false,false,false,true,false,false])
    setToolBar("Fournisseurs")
  };

  const clickService = () =>{
      
    setPage([false,false,false,false,false,false,false,false,false,true,false])
    setToolBar("Services d'affectation")
  };

  const clickUsers= () =>{
      
    setPage([false,false,false,false,false,false,false,false,false,false,true])
    setToolBar("Users")
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

            <Button color="inherit" startIcon={<ThreePRoundedIcon />}>DMM_User</Button>
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
                <ListItemButton selected={page[1]} onClick={clickMaterials}>
                  <ListItemIcon>
                    <HomeRepairServiceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Matériels" />
                </ListItemButton>
                <ListItemButton selected={page[2]} onClick={clickAffectation}>
                  <ListItemIcon>
                    <ContentPasteGoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Affectations" />
                </ListItemButton>
                <ListItemButton selected={page[3]} onClick={clickEnPanne}>
                  <ListItemIcon>
                    <ReportProblemIcon />
                  </ListItemIcon>
                  <ListItemText primary="En Panne" />
                </ListItemButton>
                <ListItemButton selected={page[4]} onClick={clickReform}>
                  <ListItemIcon>
                    <OutputIcon />
                  </ListItemIcon>
                  <ListItemText primary="Réforme" />
                </ListItemButton>
                <ListItemButton selected={page[5]} onClick={clickReparation}>
                  <ListItemIcon>
                    <BuildIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reparation" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />
                    <ListSubheader component="div" inset>
                      Autre options
                    </ListSubheader>

                <ListItemButton selected={page[6]} onClick={clickFamille}>
                  <ListItemIcon>
                    <AutoAwesomeMotionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Familles d'équipements" />
                </ListItemButton>

                <ListItemButton selected={page[7]} onClick={clickDesignation}>
                  <ListItemIcon>
                    <MonitorHeartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Type d'équipements" />
                </ListItemButton>

                <ListItemButton selected={page[8]} onClick={clickFournisseur}>
                  <ListItemIcon>
                    <FaxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Fourniseurs" />
                </ListItemButton>

                <ListItemButton selected={page[9]} onClick={clickService}>
                  <ListItemIcon>
                    <ContactEmergencyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Services d'affectation" />
                </ListItemButton>

                <ListItemButton selected={page[10]} onClick={clickUsers}>
                  <ListItemIcon>
                    <ContactMailIcon />
                  </ListItemIcon>
                  <ListItemText primary="Utilisateurs" />
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
        {page[1] ? <Dashboard_details/> : null}
        {page[2] ? <Dashboard_details/> : null}
        {page[3] ? <Dashboard_details/> : null}
        {page[4] ? <Dashboard_details/> : null}
        {page[5] ? <Dashboard_details/> : null}
        {page[6] ? <Dashboard_details/> : null}
        {page[7] ? <Dashboard_details/> : null}
        {page[8] ? <Fournisseur/> : null}
        {page[9] ? <ServiceAffectation/> : null}
        {page[10] ? <Dashboard_details/> : null}
        

        
          
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