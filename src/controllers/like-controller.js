import LikeService from '../services/like-service.js';
const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.params.modelId, req.params.modelType, req.body.userId);
        return res.status(201).json({
            success: true,
            message: 'Successfully toggles like',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
}