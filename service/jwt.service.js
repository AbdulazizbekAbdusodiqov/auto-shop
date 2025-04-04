import config from "config";
import jwt from "jsonwebtoken";

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }
  generateTokens(payload) {
    console.log(payload);

    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}

export const AdminJwt = new JwtService(
  config.get("admin_access_key"),
  config.get("admin_refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);
export const CustomerJwt = new JwtService(
  config.get("customer_access_key"),
  config.get("customer_refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);