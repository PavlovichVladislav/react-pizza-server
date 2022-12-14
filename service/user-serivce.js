const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
   async registration(email, password, phone, name, surname, date) {
      const candidate = await UserModel.findOne({ email });

      if (candidate) {
         throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
      }

      const hashPassword = await bcrypt.hash(password, 3); // хэшируем пароль, второй параметр - соль
      const activationLink = uuid.v4();

      const user = await UserModel.create({
         email,
         password: hashPassword,
         phone,
         name,
         surname,
         date,
         activationLink,
      });

      await mailService.sendActivationMail(
         email,
         `${process.env.API_URL}/api/activate/${activationLink}`
      );

      const userDto = new UserDto(user); // id, email, isActivated, name, surname, phone, data

      const tokens = tokenService.generateTokens({ ...userDto }); // spread because generateTokens expects regular object
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }

   async activate(activationLink) {
      const user = await UserModel.findOne({ activationLink });

      if (!user) {
         throw ApiError.BadRequest(`Некорректная ссылка активации`);
      }

      user.isActivated = true;

      await user.save();
   }

   async login(email, password) {
      const user = await UserModel.findOne({ email });

      if (!user) {
         throw ApiError.BadRequest("Пользователь с таким email не был найден");
      }

      const isPassEquals = await bcrypt.compare(password, user.password);

      if (!isPassEquals) {
         throw ApiError.BadRequest("Некорректный пароль");
      }

      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }

   async logout(refreshToken) {
      const token = await tokenService.removeToken(refreshToken);

      return token;
   }

   async refresh(refreshToken) {
      if (!refreshToken) {
         throw ApiError.UnauthorizedError();
      }

      const userData = tokenService.validateRefreshToken(refreshToken);

      const tokenFromDb = await tokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
         throw ApiError.UnauthorizedError();
      }

      const user = await UserModel.findById(userData.id);
      const userDto = new UserDto(user);
      const tokens = tokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
         ...tokens,
         user: userDto,
      };
   }
}

module.exports = new UserService();
