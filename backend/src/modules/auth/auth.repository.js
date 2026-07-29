import User from "./auth.model.js";
class AuthRepository {
    async findByEmail(email) {
        return await User.findOne({email});
    }

    async updateLastLogin(userId){
        return await User.findByIdAndUpdate(userId,{
            lastLogin: new Date(),
        });
    }
}
export default new AuthRepository();