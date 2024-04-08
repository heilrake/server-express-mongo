import { getProfileHandler } from './getProfile';

class ProfileCtrl {
  profile = getProfileHandler;
}

export const profileCtrl = new ProfileCtrl();
