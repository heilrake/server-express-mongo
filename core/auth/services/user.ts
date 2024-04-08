import { UserModel } from '../../../models/user-model';
import HttpStatusCode from 'http-status-codes';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import { tokenService } from './token';
import { ApiErrorMessage } from '../../../utils/error-message';
import { JwtPayload } from 'jsonwebtoken';

class UserService {
  async registration(email: string, password: string) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiErrorMessage.BadRequest({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: `User with this email:${email} already existing`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);
    const activationLink = v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });

    const tokens = await tokenService.generateTokens({
      email,
      _id: user._id,
      isActivated: user.isActivated,
    });

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user: { email: user.email, id: user._id, isActivated: user.isActivated },
    };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiErrorMessage.BadRequest({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: `User with this email:${email} not exist`,
      });
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error('Password is incorrect');
    }

    const tokens = await tokenService.generateTokens(user);

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error('This user is not authorized ');
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new Error('Token cant refresh');
    }

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!refreshToken || !tokenFromDb) {
      throw new Error('This user is not authorized ');
    }

    const user = await UserModel.findById((userData as JwtPayload)._id);

    if (!user) {
      throw new Error('This user not found');
    }

    const tokens = await tokenService.generateTokens(user);

    await tokenService.saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async getProfile() {
    const users = await UserModel.find();
    return users;
  }
}

export const userService = new UserService();
