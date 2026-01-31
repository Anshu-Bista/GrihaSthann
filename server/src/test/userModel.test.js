const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define('User',{
    id:1,
    name:"Menuka",
    email:"menuka@gmail.com",
    phone: 9821078654,
    address:"Dillibazar",
    gender:"female",
    password:"Menuka@123",
    role:"user"
});

describe("User Model",()=>{
    it("should create a user", async ()=>{
        const user = await UserMock.create({
            name:"Menuka",
            email:"menuka@gmail.com",
            phone: 9821078654,
            address:"Dillibazar",
            gender:"female",
            password:"Menuka@123",
            role:"user"
        });
        expect(user.name).toBe("Menuka");
        expect(user.email).toBe("menuka@gmail.com");
        expect(user.phone).toBe(9821078654);
        expect(user.address).toBe("Dillibazar");
        expect(user.gender).toBe("female");
        expect(user.password).toBe("Menuka@123")
        expect(user.role).toBe("user");
    });
    it("should require name, email and password", async()=>{
        await expect(UserMock.create({})).rejects.toThrow();
    });
});