import User from "../../modules/auth/auth.model.js";
import { ROLES } from "../constants/index.js";

const seedAdmin = async() => {
    try{
        const adminExists = await User.findOne({
            email: "raunakhan@gmail.com",
        });
        if(adminExists){
            console.log("Admin already exits.");
            return;
        }
        await User.create({
            name: "School Administartor",
            email: "raunakhan@gmail.com",
            password: "Admin@123",
            role: ROLES.ADMIN
        });
        console.log("Admin created successfully.");
    } catch (error) {
        console.error("Error occurred while seeding admin:", error);
    }
};
export default seedAdmin;