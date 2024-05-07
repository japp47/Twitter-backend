import {CommentRepository, LikeRepository, TweetRepo} from "../repository/index.js";

class LikeService {
    constructor() {
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepo();
        this.commentRepository = new CommentRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        if(modelType == 'Tweet') {
            var likeable = await this.tweetRepository.find(modelId);
        } 
        else if(modelType == 'Comment') {
            var likeable = await this.commentRepository.findWithLikes(modelId);
        }
        else {
            throw new Error('Unknown model type')
        }
        const exist = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel: modelType,
            likeable: modelId
        });

        if(exist){
            likeable.likes.pull(exist.id);
            await likeable.save();
            await exist.remove();
            var isRemoved = true;
        }
        else{
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isRemoved = false;

        }
        return isRemoved;
    }
}

export default LikeService;