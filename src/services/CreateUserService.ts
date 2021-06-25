import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash, genSalt } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    isAdmin?: boolean;
}

class CreateUserService {
    async execute({ name, email, password, isAdmin = false }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!name)
            throw new Error("Incorrect name");

        if (!email)
            throw new Error("Incorrect e-mail");

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists)
            throw new Error("User already exists");

        if (password.length < 8)
            throw new Error("Password is too short (must have at least 8 characters)");

        const salt = await genSalt(12);
        const passwordHash = await hash(password, salt);

        const user = usersRepository.create({
            name,
            email,
            password: passwordHash,
            isAdmin
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };