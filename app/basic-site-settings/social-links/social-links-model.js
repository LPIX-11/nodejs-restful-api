const mongoose = require('mongoose');

const SocialLinkSchema = {
    socialSiteName: {
        type: String,
        required: true
    },
    socialSiteLink: {
        type: String,
        required: true
    },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'BasicSiteSettings'
    }
};

module.exports = mongoose.model('SocialLinks', SocialLinkSchema);