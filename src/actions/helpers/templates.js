import _ from 'lodash';

const MODE_ABBRS = {
  draft: 'd',
  published: 'p'
};

/**
 * Gets key for templates test data in local storage
 * @param  {string} id - template id
 * @param  {string} username - current user's username
 * @param  {string} mode - 'draft' | 'published'
 * @return {string} key
 */
export const getTestDataKey = ({ id, username, mode }) => ([ 'tpldata', username, id, MODE_ABBRS[mode] ].join('/'));

// Shape the content attributes for API
export const shapeContent = (content = {}) => {
  const shapedContent = {
    ...content,
    // The API won't create a new template unless either `content.text` or `content.html` has content.
    // This allows a new template to be created by passing an empty string as the template's text content.
    text: content.text,
    reply_to: _.isEmpty(content.reply_to) ? undefined : content.reply_to,
    html: _.isEmpty(content.html) ? undefined : content.html,
    amp_html: _.isEmpty(content.amp_html) ? undefined : content.amp_html
  };

  return shapedContent;
};
