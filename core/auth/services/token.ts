import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { tokenModel } from "../../../models/token-model";

class TokenService {
  async generateTokens(payload: { email: string; id: string }) {
    const { email, id } = payload;

    const accessToken = jwt.sign(
      { email, id },
      process.env.SECRET_ACCESS_JWT || "secret-access-key",
      {
        expiresIn: "15m",
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

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(
        token,
        process.env.SECRET_ACCESS_JWT || "secret-access-key",
      );

      return userData;
    } catch (e) {
      console.log(e);
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
    const tokenData = await tokenModel.findOne({ userId: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ userId: userId, refreshToken });

    return token;
  }

  async removeToken(refreshToken: string) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await tokenModel.findOne({ refreshToken });

    return tokenData;
  }
}
export const tokenService = new TokenService();
