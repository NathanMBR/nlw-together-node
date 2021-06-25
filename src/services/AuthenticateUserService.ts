import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
    email: string,
    password: string
}

class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            email
        });

        if (!user)
            throw new Error("Incorrect email or password");

        const doPasswordsMatch = await compare(password, user.password);

        if (!doPasswordsMatch)
            throw new Error("Incorrect email or password");

        const token = sign({
            email
        }, "dbd8126eee0ea9ef34a8259e57bdca66", {
            subject: user.id,
            expiresIn: "2d"
        });

        return token;
    }
}

export { AuthenticateUserService };