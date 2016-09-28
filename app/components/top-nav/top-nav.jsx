import React from 'react';
import MenuButton from '../menu-button/menu-button';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import classNames from 'classnames';

var TopNav = React.createClass({
  getInitialState: function () {
    return {
      open: false,
    };
  },

  componentDidMount() {
    this.setState({
      open: true,
    });
  },

  handleOrgChange(a, b, c){
    this.props.onOrgChange(a, b, c);
  },

  render: function () {
    this.userName = this.props.userFirstName + ' ' + this.props.userLastName;
    this.userAbbr = this.props.userFirstName.substr(0, 1) + '' + this.props.userLastName.substr(0, 1);

    var style = {
      padding: '13px'
    };

    var iconStyle = {
      iconHoverColor: '#212121',
      fontSize: '24px',
      color: '#bdbdbd'
    };

    var iconButtonStyle = {
      padding: 0
    };

    const classes = classNames({
      'fixed-nav-bar': true,
      open: this.state.open,
    });

    return (
      <nav className={classes}>
        <MenuButton onClick={this.props.onMenuIconClick}/>
        <If condition={this.props.logo}>
          {this.props.logo}
        </If>

        <div className="exit">
          <IconButton
            style={style}
            onClick={this.props.onLock}
            iconStyle={iconStyle}
            iconClassName="icon icon-lock"
            tooltip="Log out"
          >
          </IconButton>
        </div>
        <IconButton
          style={iconButtonStyle}
          onClick={this.props.onProfileClick}
          className="avatar"
          tooltip={this.userName}
        >
          <Avatar src={this.props.profileImageUrl}/>
        </IconButton>
        <div className="chat">
          <IconButton
            style={style}
            onClick={this.props.onChat}
            iconStyle={iconStyle}
            iconClassName="icon icon-comment"
          >
          </IconButton>
        </div>
        <div className="bell">
          <If condition={this.props.newNotificationCount}>
            <div className="badge">
              {this.props.newNotificationCount}
            </div>
          </If>
          <IconButton
            style={style}
            onClick={this.props.onNotifcationsClick}
            iconStyle={iconStyle}
            iconClassName="icon icon-notifications"
          >
          </IconButton>
        </div>
        <If condition={this.props.controls}>
          <div className="controls">
            {this.props.controls}
          </div>
        </If>
        <If condition={this.props.organizations && this.props.organizations.length}>
          <div className="organizations">
            <DropDownMenu underlineStyle={{ borderColor: '#fff' }} value={this.props.selectedOrg} onChange={this.handleOrgChange}>
              {
                this.props.organizations.map(org => (
                  <MenuItem key={org.id} value={org.id} primaryText={org.name}/>
                ))
              }
            </DropDownMenu>
          </div>
        </If>
      </nav>
    );
  }
});

export default TopNav;
