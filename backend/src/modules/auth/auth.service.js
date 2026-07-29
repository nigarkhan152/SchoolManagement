import AuthRepository from "./auth.repository.js";
import {generateToken} from "../../app/utils/jwt.js";

class AuthService{
    async login(email, password){
        console.log("Email received in AuthService:", email);
        const user = await AuthRepository.findByEmail(email);
        console.log("User:", user);
        if(!user){
            throw new Error("Invalid email or passowrd");
        }
        const isPasswordCorrect = await user.comparePassword(password);
        console.log("Password Match:", isPasswordCorrect);
        if(!isPasswordCorrect){
            throw new Error("Invalid email or password");
        }
        await AuthRepository.updateLastLogin(user._id);
        const token = generateToken(user);
        return {user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
        ,token,};
    }
}
export default new AuthService();