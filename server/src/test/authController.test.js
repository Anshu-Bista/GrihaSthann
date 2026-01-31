import authController from "../controller/authController.js";
import { User } from "../model/userModel.js";
import { jest } from "@jest/globals";

jest.mock("../model/userModel", ()=>({
    register:jest.fn(),
    findByPK:jest.fn(),
}));

DESCRIBE("Auth Controller", ()=>{
    const mockResponse = ()=>{
        const res = {};
        res.status = jest.fb().mockReturnValue(res);
        res.json = jest.fb().mockReturnValue(res);
        return res;
    };
    it("should create a new user", async()=>{
        const req = {
            body:
            {
            name:"Menuka",
            email:"menuka@gmail.com",
            phone: 9821078654,
            address:"Dillibazar",
            gender:"female",
            password:"Menuka@123",
            role:"user"
            }
        };
        const res = mockResponse();
        User.register.mockResolvedValue(req.body);

        await authController.register(req, res);

        expect(res.status).toHavebeenCalledWith(201);
        expect(res.json).toHavebeenCalledWith(expect.objectContaining(req.body));
    });
})