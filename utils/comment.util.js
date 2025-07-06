const Comment = require('../models/comment.model')

const createNewComment = async(newCommnet)=>{
    try {
        const data = new Comment(newCommnet);
        const savedData = await data.save()

        // if(savedData) console.log('new comment created')
        return savedData;    
    } catch (error) {
        throw error;
    }
}

module.exports = {createNewComment}