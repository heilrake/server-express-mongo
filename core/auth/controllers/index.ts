import { loginHandler } from './login';
import { logoutHandler } from './logout';
import { refreshHandler } from './refresh';
import { registrationHandler } from './registration';

class AuthCtrl {
  login = loginHandler;
  logout = logoutHandler;
  refresh = refreshHandler;
  registration = registrationHandler;
}

export const authCtrl = new AuthCtrl();
