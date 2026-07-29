import AuthService from "./auth.service.js";
class AuthController {
    async login(req,res){
        try{
            const{email,password} = req.body;
            const data = await AuthService.login(email,password);
            return res.status(200).json({
                success: true,
                message: "Login successful",
                data,
            });
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: error.message,
            });
        }
    }
    async getMe(req,res){
        return res.status(200).json({
            success: true,
            data: req.user,
        });
    }
}
export default new AuthController();