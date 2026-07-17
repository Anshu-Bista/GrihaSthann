import { User } from "./userModel.js";
import { Request } from "./requestModel.js";
import { Property } from "./propertyModel.js";

/* Associations */

User.hasMany(Request, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

Property.hasMany(Request, { foreignKey: "propertyId" });
Request.belongsTo(Property, { foreignKey: "propertyId" });