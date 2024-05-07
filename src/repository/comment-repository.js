import Comment from "../models/comment.js";
import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }
    
    async findWithLikes(id) {
        try {
            const comment = await Comment.findById(id).populate({ path: 'likes' });
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CommentRepository;