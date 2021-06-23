import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    isAdmin?: boolean;
}

class CreateUserService {
    async execute({ name, email, isAdmin }: IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email)
            throw new Error("E-mail incorrect");

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists)
            throw new Error("User already exists");

        const user = usersRepository.create({
            name,
            email,
            isAdmin
        });

        await usersRepository.save(user);

        return user;
    }
}

export { CreateUserService };