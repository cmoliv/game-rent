import Sequelize from "sequelize";

import { development } from "../config/database";

import User from "../app/models/User";
import Game from "../app/models/Game";
import Rent from "../app/models/Rent";
import Genre from "../app/models/Genre";
import Platform from "../app/models/Platform";
import GameRent from "../app/models/GameRent";
import Payments from "../app/models/Payments";

const models = [User, Platform, Genre, Game, Rent, GameRent, Payments];

class Database {
   constructor() {
      this.connection = new Sequelize(development);
      this.init();
      this.associate();
   }

   init() {
      models.forEach((model) => model.init(this.connection));
   }

   associate() {
      Object.values(this.connection.models).forEach((model) => {
         if (model.associate) {
            model.associate(this.connection.models);
         }
      });
   }
}

export default new Database();
