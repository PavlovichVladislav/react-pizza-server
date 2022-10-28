module.exports = class UserDto {
   email;
   id;
   isActivated;
   phone;
   name;
   surname;
   date;

   constructor(model) {
      this.email = model.email;
      this.phone = model.phone;
      this.name = model.name;
      this.surname = model.surname;
      this.date = model.date;
      this.id = model._id;
      this.isActivated = model.isActivated;
   }
};
