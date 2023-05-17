export default {
  port: 8000,

  // TODO: make it 10 minutes
  accessTokenExpiresIn: 24 * 60, // 10 minutes 
  refreshTokenExpiresIn: 24 * 60, // 24 hours
  origin: "http://localhost:5173",
  emailFrom: "hifarhanali@gmail.com",
  saltRounds: 12,

  emailVerificationCodeExpiresIn: 24 * 60 * 60, // 24 hours
  passwordResetTokenExpiresIn: 20 * 60, // 20 minutes
};