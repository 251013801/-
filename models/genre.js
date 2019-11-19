const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
	name: {
		type: String, 
		require: true, 
		enum:['奇幻', '科幻', '诗歌', '历史','伦理','古装偶像剧','悬疑']
	},
	
});

GenreSchema
	.virtual('url')
	.get(function () {
		return '/catalog/genre/'+this._id;
	});

module.exports = mongoose.model('Genre', GenreSchema);
