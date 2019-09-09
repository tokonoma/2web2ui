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
    reply_to: _.isEmpty(content.reply_to) ? null : content.reply_to,
    text: _.isEmpty(content.text) ? null : content.text,
    html: _.isEmpty(content.html) ? null : content.html,
    amp_html: _.isEmpty(content.amp_html) ? null : content.amp_html
  };

  return shapedContent;
};
