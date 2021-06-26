import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceiveComplimentsService {
    async execute(userId: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                userReceiver: userId
            },
            // relations: ["user_sender", "user_receiver", "tag"] // Commented to avoid excess of data
        });

        return compliments;
    }
}
export { ListUserReceiveComplimentsService };