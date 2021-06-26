import { getCustomRepository } from "typeorm";
import { Tag } from "../entities/Tag";
import { TagsRepositories } from "../repositories/TagsRepositories";

class ListTagsService {

    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        let tags: Tag[] = await tagsRepositories.find();
        tags = tags.map(tag => ({...tag, customName: `#${tag.name}`}));
        // If I can easily insert the hashtag with the "map" method, I don't think I should use a library

        return tags;
    }
}

export { ListTagsService };