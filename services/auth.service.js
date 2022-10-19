const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { config } = require("./../config/config");
const UserService = require("./user.service");
const MailService = require("./mail.service");
const userService = new UserService();
const mailService = new MailService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized("There is a problem sending a recovery mail");
    }
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });

    const mail = {
      from: "Anita de Platzi",
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link}</b>`
    };
    const rta = await mailService.sendMail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        throw boom.notAcceptable(err.name);
      }
      return decoded;
    }); //como saber si el token expiró?
    const user = await userService.findOne(payload.sub);
    if (token !== user.recoveryToken) {
      throw boom.notAcceptable("Sorry, valid but not the same token");
    }

    await userService.update(user.id, {
      recoveryToken: null,
      password: newPassword
    });
    return { message: "password changed successfully" };
  }
}

module.exports = AuthService;
