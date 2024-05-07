import {TweetRepo,HashtagRepo} from '../repository/index.js'

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepo();
        this.hashtagRepository = new HashtagRepo();
    }
    async create(data) {
        const content = data.content;
        // const tags = content.match(/#[a-zA-Z0-9_]+/g)
        //                 .map((tag) => tag.substring(1).toLowerCase());
        //                  //regex
        const tagsMatch = content.match(/#[a-zA-Z0-9_]+/g);
        const tags = tagsMatch ? tagsMatch.map((tag) => tag.substring(1).toLowerCase()) : [];
        const tweet = await this.tweetRepository.create(data);
        
        if(tags.length > 0){
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags); 
        let titlePresentTags = alreadyPresentTags.map(tags => tags.title);
        let newTags = tags.filter(tag => !titlePresentTags.includes(tag));
        
        newTags = newTags.map(tag => {
            return {title: tag, tweets: [tweet.id]}
        });

        await this.hashtagRepository.bulkCreate(newTags);
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id);
            tag.save();
        });
    }
        return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}

export default TweetService;