import {CommentRepository, TweetRepo} from "../repository/index.js";

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepo();
    }
    async create(modelId, modelType, userId) {
        if(modelType == 'Tweet') {
            var commentable = await this.tweetRepository.get(modelId);
        } 
        else if(modelType == 'Comment') {
            var commentable = await this.commentRepository.get(modelId);
        }
        else {
            throw new Error('Unkmown model type')
        }

        const comment = await this.commentRepository.create({
            content: content,
            userId: userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });
        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }

    async getCommentsRecursive(commentId, depth) {
        const comment = await this.commentRepository.get(commentId);
        if (!comment) return [];

        let comments = [comment];
        if (depth > 0) {
            for (const subCommentId of comment.comments) {
                const subComments = await this.getCommentsRecursive(subCommentId, depth - 1);
                comments = comments.concat(subComments);
            }
        }
        return comments;
    }

    async getCommentsWithDepth(commentId, depth) {
        return await this.getCommentsRecursive(commentId, depth);
    }
}

export default CommentService;