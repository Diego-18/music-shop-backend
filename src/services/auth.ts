import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encryptPassword, verifiedPassword } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

// Register new users.
const registerNewUser = async ({ email, password, name }: User) => {
	const checkIs = await UserModel.findOne({ email });
	if (checkIs) return "ALREADY_USER";
	const passHash = await encryptPassword(password);
	const registerNewUser = await UserModel.create({
		email,
		password: passHash,
		name,
	});
	return registerNewUser;
};

// Log In
const loginUser = async ({ email, password }: Auth) => {
	const checkIs = await UserModel.findOne({ email });
	if (!checkIs) return "NOT_FOUND_USER";

	const passwordHash = checkIs.password;
	const isCorrect = await verifiedPassword(password, passwordHash);

	if (!isCorrect) return "PASSWORD_INCORRECT";

	const token = generateToken(checkIs.email);
	const data = {
		token,
		userName: checkIs.name,
		userEmail: checkIs.email,
	};
	return data;
};

export { registerNewUser, loginUser };
