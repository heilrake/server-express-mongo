import HttpStatusCode from "http-status-codes";
import bcrypt from "bcrypt";
import { tokenService } from "./token";
import { ApiErrorMessage } from "../../../utils/error-message";
import { JwtPayload } from "jsonwebtoken";

import { prisma } from "../../../utils/others";

class UserService {
  async registration(
    email: string,
    password: string,
  ): Promise<{
    user: { email: string; id: string };
    accessToken: string;
    refreshToken: string;
  }> {
    const candidate = await prisma.user.findUnique({ where: { email } });

    if (candidate) {
      throw ApiErrorMessage.BadRequest({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: `User with this email:${email} already existing`,
      });
    }

    const hashPassword = await bcrypt.hash(password, 8);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashPassword,
      },
    });

    const tokens = tokenService.generateTokens({
      email,
      id: user.id,
    });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { email: user.email, id: user.id },
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    user: { id: string; email: string; password: string };
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw ApiErrorMessage.BadRequest({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: `User with this email:${email} not exist`,
      });
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw new Error("Password is incorrect");
    }

    const tokens = await tokenService.generateTokens(user);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("This user is not authorized ");
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new Error("Token cant refresh");
    }

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!refreshToken || !tokenFromDb) {
      throw new Error("This user is not authorized ");
    }

    const user = await prisma.user.findUnique({
      where: { id: (userData as JwtPayload).id },
    });

    if (!user) {
      throw new Error("This user not found");
    }

    const tokens = await tokenService.generateTokens(user);

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
  }

  async getProfile() {
    const users = await prisma.user.findMany();
    return users;
  }
}

export const userService = new UserService();
