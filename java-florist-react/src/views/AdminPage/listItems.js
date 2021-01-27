import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import MessageICon from '@material-ui/icons/Message';
import CommentICon from '@material-ui/icons/Feedback';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';

export default function MainListItems (props){
  const {setSideBarType} = props;
  return(
    <div>
      <div onClick={()=>{setSideBarType('Dashboard')}}>
        <ListItem button >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </div>

    <div onClick={()=>{setSideBarType('Products')}}>
      <ListItem button>
        <ListItemIcon>
          <LocalFloristIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItem>
    </div>

    <div onClick={()=>{setSideBarType('Orders')}}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItem>
    </div>

    <div onClick={()=>{setSideBarType('Customers')}}>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItem>
    </div>
    <div onClick={()=>{setSideBarType('Message')}}>
      <ListItem button>
        <ListItemIcon>
          <MessageICon/>
        </ListItemIcon>
        <ListItemText primary="Message" />
      </ListItem>
    </div>
    <div onClick={()=>{setSideBarType('Feedback')}}>
      <ListItem button>
        <ListItemIcon>
          <CommentICon/>
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItem>
    </div>
  </div>
  )
};
