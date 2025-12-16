/**
 * @typedef {Object} SocialLink
 * @property {string} id
 * @property {string} influencersId
 * @property {string} url
 * @property {string} type - facebook, instagram, twitter, tiktok, youtube
 * @property {number} orderIndex
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} name
 * @property {string} influencersId
 * @property {string} url
 * @property {string} image
 * @property {number} orderIndex
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} bio
 * @property {string} date
 * @property {string} image
 * @property {string} profileUrl
 * @property {string} url
 * @property {string} location
 * @property {number} orderIndex
 * @property {string} type - PROJECT_TYPES
 * @property {boolean} isActive
 * @property {SocialLink[]} social
 * @property {Video[]} videos
 */

/**
 * @typedef {Object} CreateProjectDto
 * @property {string} name
 * @property {string} description
 * @property {string} bio
 * @property {string} date
 * @property {string} image
 * @property {string} profileUrl
 * @property {string} url
 * @property {string} location
 * @property {number} orderIndex
 * @property {string} type
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} CreateSocialLinkDto
 * @property {string} influencersId
 * @property {string} url
 * @property {string} type
 * @property {number} orderIndex
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} CreateVideoDto
 * @property {string} name
 * @property {string} influencersId
 * @property {string} url
 * @property {string} image
 * @property {number} orderIndex
 * @property {boolean} isActive
 */

export const SOCIAL_TYPES = {
    FACEBOOK: 'facebook',
    INSTAGRAM: 'instagram',
    TWITTER: 'twitter',
    TIKTOK: 'tiktok',
    YOUTUBE: 'youtube'
};