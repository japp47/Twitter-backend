import CommentService from '../services/comment-service.js';

const commentService = new CommentService();

export const createComment = async (req, res) => {
    try {
        const response = await commentService.create(req.query.modelType, req.query.modelId, req.user.id, req.body.content );
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new comment',
            data: response,
            err: {}
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        })
    }
};
export const getCommentsWithDepth = async (req, res) => {
    try {
        const comments = await commentService.getCommentsWithDepth(req.query.commentId, req.query.depth);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched comments with depth',
            data: comments,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            err: error.message
        });
    }
};