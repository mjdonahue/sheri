'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _menuButton = require('../menu-button/menu-button');

var _menuButton2 = _interopRequireDefault(_menuButton);

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Avatar = require('material-ui/Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TopNav = _react2.default.createClass({
  displayName: 'TopNav',

  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },

  componentDidMount: function componentDidMount() {
    this.setState({
      open: true
    });
  },
  handleOrgChange: function handleOrgChange(a, b, c) {
    this.props.onOrgChange(a, b, c);
  },


  render: function render() {
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

    var classes = (0, _classnames2.default)({
      'fixed-nav-bar': true,
      open: this.state.open
    });

    return _react2.default.createElement(
      'nav',
      { className: classes },
      _react2.default.createElement(_menuButton2.default, { onClick: this.props.onMenuIconClick }),
      this.props.logo ? this.props.logo : null,
      _react2.default.createElement(
        'div',
        { className: 'exit' },
        _react2.default.createElement(_IconButton2.default, {
          style: style,
          onClick: this.props.onLock,
          iconStyle: iconStyle,
          iconClassName: 'icon icon-lock',
          tooltip: 'Log out'
        })
      ),
      _react2.default.createElement(
        _IconButton2.default,
        {
          style: iconButtonStyle,
          onClick: this.props.onProfileClick,
          className: 'avatar',
          tooltip: this.userName
        },
        _react2.default.createElement(_Avatar2.default, { src: this.props.profileImageUrl })
      ),
      _react2.default.createElement(
        'div',
        { className: 'chat' },
        _react2.default.createElement(_IconButton2.default, {
          style: style,
          onClick: this.props.onChat,
          iconStyle: iconStyle,
          iconClassName: 'icon icon-comment'
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'bell' },
        this.props.newNotificationCount ? _react2.default.createElement(
          'div',
          { className: 'badge' },
          this.props.newNotificationCount
        ) : null,
        _react2.default.createElement(_IconButton2.default, {
          style: style,
          onClick: this.props.onNotifcationsClick,
          iconStyle: iconStyle,
          iconClassName: 'icon icon-notifications'
        })
      ),
      this.props.controls ? _react2.default.createElement(
        'div',
        { className: 'controls' },
        this.props.controls
      ) : null,
      this.props.organizations && this.props.organizations.length ? _react2.default.createElement(
        'div',
        { className: 'organizations' },
        _react2.default.createElement(
          _DropDownMenu2.default,
          { underlineStyle: { borderColor: '#fff' }, value: this.props.selectedOrg, onChange: this.handleOrgChange },
          this.props.organizations.map(function (org) {
            return _react2.default.createElement(_MenuItem2.default, { key: org.id, value: org.id, primaryText: org.name });
          })
        )
      ) : null
    );
  }
});

exports.default = TopNav;
module.exports = exports['default'];
