import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ token }) => ({
  name: token && token.user_name
});

const mapDispatchToProps = dispatch => ({
  onLogOut: (e) => {
    dispatch({
      type: 'CLEAR_TOKEN'
    })
  }
});

const Header = ({name, onLogOut}) => (
  <header>
    <div className="app-header">
      <h1 className="app-header__title">Taskify</h1>
      {name ? 
        <div className="app-header__links">
          <p>Welcome: { name } | </p>
          <a href="javascript:void(0)" onClick={onLogOut}>Log Out</a>
        </div>
      : null}
    </div>
  </header>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);