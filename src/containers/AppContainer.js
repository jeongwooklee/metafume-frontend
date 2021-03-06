import { connect } from 'react-redux';

import api from '../utils/api';
import * as actions from '../reducers/user';
import { deleteToken } from '../utils/helpers';

import App from '../components/App';

const mapStateToProps = state => ({
  user: state.user?.profile,
  loading: state.user.loading,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  onLoad: token => {
    if (token) dispatch(actions.loginStart(token));
  },
  onLogin: () => {
    dispatch(actions.loginStart());
  },
  onLogout: () => {
    dispatch(actions.logout());
    deleteToken();
  },
  onSubscribe: async (userId, option) => {
    await api.subscribeMail(userId, option);
    dispatch(actions.updateSubscription(option));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
