import jwt from "jsonwebtoken";
import { prisma } from "../../../utils/others";

class TokenService {
  generateTokens(payload: { email: string; id: string }): {
    accessToken: string;
    refreshToken: string;
  } {
    const { email, id } = payload;

    const accessToken = jwt.sign(
      { email, id },
      process.env.SECRET_ACCESS_JWT || "secret-access-key",
      {
        expiresIn: "1m",
      },
    );
    const refreshToken = jwt.sign(
      { email, id },
      process.env.SECRET_REFRESH_JWT || "secret-refresh-key",
      {
        expiresIn: "7d",
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.SECRET_ACCESS_JWT || "secret-access-key",
      );

      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.SECRET_REFRESH_JWT || "secret-refresh-key",
      );

      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await prisma.token.findFirst({
      where: { userId },
    });

    if (tokenData) {
      return prisma.token.update({
        where: {
          id: tokenData.id,
        },
        data: { refreshToken },
      });
    }
    const token = await prisma.token.create({
      data: { userId: userId, refreshToken },
    });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await prisma.token.deleteMany({
      where: { refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = prisma.token.findFirst({ where: { refreshToken } });

    return tokenData;
  }
}
export const tokenService = new TokenService();
