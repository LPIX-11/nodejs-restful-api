const mongoose = require('mongoose');

const BasicSiteSettingsSchema = {
    siteName: {
        type: String,
        required: true
    },
    sitePhone: {
        type: String,
        required: false
    },
    siteAdress: {
        type: String,
        required: false
    },
    siteEmail: {
        type: String,
        required: true
    },
    socialLinks: {
        type: Schema.Type.ObjectId,
        ref: 'SocialLinks',
        required: false,
    }
};

module.exports = mongoose.model('BasicSiteSettings', BasicSiteSettingsSchema);