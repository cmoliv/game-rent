import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
   static init(sequelize) {
      super.init(
         {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            tipo: Sequelize.ENUM("admin", "cliente"),
            is_active: {
               type: Sequelize.BOOLEAN,
               defaultValue: true,
            },
            data_cadastro: {
               type: Sequelize.DATE,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            name: {
               singular: "user",
               plural: "users",
            },
         }
      );

      this.addHook("beforeSave", async (user) => {
         if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
         }
      });
   }

   static associate(models) {
      this.hasMany(models.Rent, { foreignKey: "id_usuario", as: "alugueis" });
   }

   checkPassword(password) {
      return bcrypt.compare(password, this.password_hash);
   }
}

export default User;
