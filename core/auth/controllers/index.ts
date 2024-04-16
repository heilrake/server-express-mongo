import { loginHandler } from "./login";
import { logoutHandler } from "./logout";
import { refreshHandler } from "./refresh";
import { registrationHandler } from "./registration";
import { checkHandler } from "./check";

class AuthCtrl {
  login = loginHandler;
  logout = logoutHandler;
  refresh = refreshHandler;
  registration = registrationHandler;
  check = checkHandler;
}

export const authCtrl = new AuthCtrl();
