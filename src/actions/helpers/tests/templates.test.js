import { getTestDataKey, shapeContent } from '../templates';

describe('Helper: Templates local storage key', () => {
  it('should get the correct draft key', () => {
    const options = { id: 'one', username: 'user', mode: 'draft' };
    const results = getTestDataKey(options);
    expect(results).toEqual('tpldata/user/one/d');
  });

  it('should get the correct published key', () => {
    const options = { id: 'two', username: 'user', mode: 'published' };
    const results = getTestDataKey(options);
    expect(results).toEqual('tpldata/user/two/p');
  });
});

describe('.shapeContent', () => {
  it('should return content object with reply_to key', () => {
    expect(shapeContent({ reply_to: 'test@example.com' })).toHaveProperty('reply_to');
  });

  it('should return content object without `reply_to` key', () => {
    expect(shapeContent({ reply_to: '' }).reply_to).toBeUndefined();
  });

  it('should return content object without `amp_html` key', () => {
    expect(shapeContent({ amp_html: '' }).amp_html).toBeUndefined();
  });

  it('should return content object without `text` key', () => {
    expect(shapeContent({ text: '' }).text).toBeUndefined();
  });

  it('should return content object without `html` key', () => {
    expect(shapeContent({ html: '' }).html).toBeUndefined();
  });
});
