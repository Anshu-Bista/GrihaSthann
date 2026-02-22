User.hasMany(Request, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

Property.hasMany(Request, { foreignKey: "propertyId" });
Request.belongsTo(Property, { foreignKey: "propertyId" });