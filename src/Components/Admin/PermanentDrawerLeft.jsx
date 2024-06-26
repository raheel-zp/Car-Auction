import * as React from 'react';
import { useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
// import { makeStyles } from '@mui/styles';
import SellingEquiries from './SellingEquiries';
import ArticlePage from './ArticlePage';
import EventsPage from './EventsPage';
import UserPage from './UserPage';
import ConsignmentPage from './ConsignmentPage';
import ProductPage from './ProductPage';
import { userloggedIn } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import ExpiredProducts from './ExpiredProducts';
import HoldPaymentBox from './HoldPaymentBox';
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  //   overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
//   overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function PermanentDrawerLeft() {
    const Navigate = useNavigate();
    const {userlogged,setuserLogged,userData,setuserData,url} = useContext(userloggedIn);
    const theme = useTheme();
    const [openHoldPayment,setopenHoldPayment] = React.useState(false);
    const [open, setOpen] = React.useState(true);
    const [activeBox,setactiveBox] = React.useState('Dashboard');
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const logout =async ()=>{
      const res = await fetch(`${url}logout`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
          "authToken": localStorage.getItem("authToken"),
        }
      });
      const data = await res.json();
      if(data){
        if(data.msg === "loggedOut"){
          localStorage.removeItem("authToken");
          setuserLogged(false);
          Navigate('/accounts/login');
        }
      }
    }
    //   const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0,
//       backgroundColor: 'blue', // Change the background color here
//     },
//     drawerPaper: {
//       width: drawerWidth,
//       backgroundColor: 'blue', // Change the background color here as well
//     },
//     toolbar: theme.mixins.toolbar,
//   }));
const [Enquiries,setEnquiries] = React.useState([]);  
const allSellerQueries = async ()=>{
    const res = await fetch(`${url}allSellerQueries`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
    });
    const data = await res.json();
    if(data.msg === 'success'){
      // console.log(data.data[0].Enquiries);
      setEnquiries(data.data[0].Enquiries);
    }
}
const [Articles,setArticles] = React.useState([]);
const [articlesLoading,setarticlesLoading] = React.useState(false);
const allArticles = async ()=>{
    setarticlesLoading(true);
    const res = await fetch(`${url}allArticles`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
    });
    const data = await res.json();
    setarticlesLoading(false);
    if(data.msg === 'success'){
    //   console.log(data.data);
      setArticles(data.data);
    //   setEnquiries(data.data[0].Enquiries);
    }
}
const [Events,setEvents] = React.useState([]);
const [eventsLoading,setEventsLoading] = React.useState(false);
const allEvents = async ()=>{
    setarticlesLoading(true);
    const res = await fetch(`${url}allEvents`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
    });
    const data = await res.json();
    setEventsLoading(false);
    if(data.msg === 'success'){
    //   console.log(data.data);
      setEvents(data.data);
    //   setEnquiries(data.data[0].Enquiries);
    }
}
const [Consignment,setConsignment] = React.useState([]);
const [ConsignmentLoading,setConsignmentLoading] = React.useState(false);
const getAllConsignments = async ()=>{
    setarticlesLoading(true);
    const res = await fetch(`${url}getAllConsignments`,{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      "authToken": localStorage.getItem("authToken"),
    }
    });
    const data = await res.json();
    setConsignmentLoading(false);
    if(data.msg === 'success'){
        // console.log(data.data[0].consignments);
        setConsignment(data.data[0].consignments);
    }
}
// User Page
const [data, setData] = React.useState([]);
const [rows, setRows] = React.useState([]);
const columns = [
  { field: 'firstName', headerName: 'Full Name', width: 150 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { 
    field: 'emailVerified',
    headerName: 'Email Verified', 
    width: 109, 
    renderCell: (params)=>(
      <div style={{margin:'0 auto'}} >
        { params.value?
          <svg style={{fill:'green',height:'1.2rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
          :
          <svg style={{fill:'red',height:'1.2rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        }
      
      </div>
    ),
  },
  { 
    field: 'stripeVerified',
    headerName: 'Stripe Verified', 
    width: 109, 
    renderCell: (params)=>(
      <div style={{margin:'0 auto'}} >
        { params.value?
          <svg style={{fill:'green',height:'1.2rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
          :
          <svg style={{fill:'red',height:'1.2rem'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        }
      
      </div>
    ),
  },
  {
    field: 'Enquiries',
    headerName: 'Active Enquiries',
    width: 114,
    renderCell: (params) => (
      <div style={{margin:'0 auto'}} > {params.value} </div>
    ),
    filterable: true,
    filterOperators: ['greaterThan', 'lessThan'],
  },
  {
    field: 'consignmentPoints',
    headerName: 'Cons.. Points',
    width: 114,
    renderCell: (params) => (
      <div style={{margin:'0 auto'}} > {params.value} </div>
    ),
  },
  {
    field: 'consignments',
    headerName: 'consignments',
    width: 114,
    renderCell: (params) => (
      <div style={{margin:'0 auto'}} > {params.value} </div>
    ),
  },
  {
    field: 'RegisteredDate',
    headerName: 'Registered',
    width: 112,
    renderCell: (params) => (
      <div>{new Date(params.value).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
    ),
  },
];
const fetchAllUsers = async ()=>{
    const res = await fetch(`${url}fetchAllUsers`,{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
      });
    const data = await res.json();
    if(data.msg==="success"){
        setData(data.data);
    }
}
const [products,setProducts] = React.useState([]);
const [loadingProducts,setloadingProducts] = React.useState(false);
// Products which are not expired
const fetchAllProducts = async ()=>{
    setloadingProducts(true);
    const res = await fetch(`${url}fetchAllProducts`,{
      method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
        }
      });
      const data = await res.json();
      setloadingProducts(false);
      console.log(data.data);
      if(data.msg==="success"){
          setProducts(data.data);
      }
}
React.useEffect(() => {
    const updatedRows = data.map((user, index) => ({
      id: index,
      firstName: user.firstName+" "+user.lastName,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      stripeVerified: user.stripeVerified,
      Enquiries: user.Enquiries.length,
      consignmentPoints: user.consignmentPoints,
      consignments: user.consignments.length,
      RegisteredDate: user.RegisteredDate,
    }));

    setRows(updatedRows);
  }, [data]);
  
React.useEffect(()=>{
  allSellerQueries();
  allEvents();
  allArticles();
  getAllConsignments();
  fetchAllUsers();
  fetchAllProducts();
},[])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Dashboard Header */}
      <AppBar position="fixed" open={open} style={{backgroundColor: "#173651"}} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            { activeBox==='Users'? 
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} >
                <div>{activeBox}</div>
                <Button style={{margin:'0 8px',backgroundColor:'green'}} onClick={()=>{setopenHoldPayment(true)}} variant="contained" >
                  {<>Hold Payment</>}
                </Button>
              </div>
             : activeBox }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{backgroundColor: "#f9f9f9"}} >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Upper nav texts */}
        <List style={{backgroundColor: "#f9f9f9"}} >
          {['Dashboard', 'Products','Expired','Articles', 'Events', 'Users'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={()=>{setactiveBox(text)}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* Bottom nav texts */}
        <List style={{backgroundColor: "#f9f9f9"}} >
          {['Consignments', 'Selling Enquiries', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={()=>{setactiveBox(text)}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
          <div style={{display:'flex',justifyContent:'center',alignItems: 'end',height: '100%',backgroundColor: "#f9f9f9"}} >
            <Button variant="contained" onClick={()=>{logout()}} >Logout</Button>
          </div>
        </List>
      </Drawer>
      <HoldPaymentBox openHoldPayment={openHoldPayment} setopenHoldPayment={setopenHoldPayment} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{padding:'0 10px'}} >        
        { activeBox === 'Dashboard'?
            (<div>
                <h1>Dashboard</h1>
            </div>):(<></>)
        }
        { activeBox === 'Products'?
            (<>
                <ProductPage fetchAllProducts={fetchAllProducts} products={products} setProducts={setProducts} />
            </>):(<></>)
        }
        { activeBox === 'Expired'?
            (<>
                <ExpiredProducts fetchAllProducts={fetchAllProducts} products={products} setProducts={setProducts} />
            </>):(<></>)
        }
        { activeBox === 'Articles'?
            (<>
              <ArticlePage allArticles={allArticles} Articles={Articles} setArticles={setArticles} articlesLoading={articlesLoading} setarticlesLoading={setarticlesLoading} />
            </>):(<></>)
        }
        { activeBox === 'Events'?
            (<>
              <EventsPage allEvents={allEvents} Events={Events} setEvents={setEvents} eventsLoading={eventsLoading} setEventsLoading={setEventsLoading} />
            </>):(<></>)
        }
        { activeBox === 'Users'?
            (<>
              <UserPage fetchAllUsers={fetchAllUsers} data={data} setData={setData} rows={rows} setRows={setRows} columns={columns} />
            </>):(<></>)
        }
        { activeBox === 'Consignments'?
            (<>
              <ConsignmentPage Consignment={Consignment} getAllConsignments={getAllConsignments} />
            </>):(<></>)
        }
        { activeBox === 'Selling Enquiries'?
            (<>
              <SellingEquiries allSellerQueries={allSellerQueries} Enquiries={Enquiries} setEnquiries={setEnquiries} />
            </>):(<></>)
        }
      </Box>
    </Box>
  );
}
