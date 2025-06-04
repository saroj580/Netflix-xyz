import { User } from "../models/user.model.js";

const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(401).json(
                {
                    message: "Invalid data",
                    success: false
                }
            )
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json(
                {
                    message: "This email is already used, Please try another email ?",
                    success : false
                }
            )
        }

        await User.create({
            fullName,
            email,
            password
        })

        return res.status(201).json(
            {
                message: "Account created successfully.",
                success: true
            }
        )

    } catch (error) {
        console.log(error);
    }
}

export default Register;
