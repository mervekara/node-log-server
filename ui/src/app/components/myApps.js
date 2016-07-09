import React from 'react';
import {grey400, deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopBar from './topBar';
import DataList from './dataList';
import session from '../models/session';
import {AppRightMenu} from '../constants/rightMenu';
import {folderIcon} from '../constants/icons';
import { withRouter } from 'react-router';

import ChipList from './chipList';

let ROLES = require('../../../../constants/roles.js');

const styles = {
  container: {
    textAlign: 'center'
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class MyApps extends React.Component {
  constructor(props) {
    super(props);
    this.handleRightIconMenuClick = this.handleRightIconMenuClick.bind(this);
    this.state = {
      username: session.get('username'),
      applications: session.get('applications'),
      selectedApp: null
    };
    console.log('home page state: ', this.state)
  }

  handleRightIconMenuClick(event, child) {
    console.log('selected app id', child.props.id);
    session.set('selectedAppId', child.props.id);
    this.props.router.push(child.props.path);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <TopBar title={'My apps'}/>
          {this.state.applications.length > 0 && <DataList
            content={this.state.applications}
            idKey={'id'}
            primaryTextKey={'name'}
            secondaryTextKey={'url'}
            rightIconMenu={AppRightMenu}
            rightIconMenuClick={this.handleRightIconMenuClick}
            leftAvatar={folderIcon}/>}
          {this.state.applications.length === 0 && <h3>Please create new application from left menu</h3>}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default  withRouter(MyApps);