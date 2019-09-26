import { shallow } from 'enzyme';
import React from 'react';
import cases from 'jest-in-case';

import ContentEditor from './ContentEditor';

describe('ContentEditor', () => {
  let wrapper;
  let props;

  const selectTabByContent = (wrapper, content) => {
    wrapper
      .find('Tabs')
      .prop('tabs')
      .find((tab) => tab.content === content)
      .onClick();
  };

  beforeEach(() => {
    wrapper = shallow(<ContentEditor {...props} />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.state().selectedTab).toBe(0);
  });

  it('should render without test data tab', () => {
    wrapper.setProps({ contentOnly: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render editor with an action', () => {
    wrapper.setProps({ action: <a>Click Here</a> });
    expect(wrapper.exists('.Action')).toEqual(true);
  });

  it('should select tabs', () => {
    selectTabByContent(wrapper, 'Text');
    expect(wrapper.find('Tabs')).toHaveProp('selected', 1);
  });

  it('should set field read only correctly', () => {
    wrapper.setProps({ readOnly: true });
    expect(wrapper.find('Field')).toHaveProp('readOnly', true);

    // 'Test Data' is always editable
    selectTabByContent(wrapper, 'Test Data');
    expect(wrapper.find('Field')).toHaveProp('readOnly', false);
  });

  it('should set HTML syntax validation correctly', () => {
    selectTabByContent(wrapper, 'HTML');
    expect(wrapper.find('Field')).toHaveProp('name', 'content.html');
    expect(wrapper.find('Field')).toHaveProp('syntaxValidation', false);
  });

  it('should set Text syntax validation correctly', () => {
    selectTabByContent(wrapper, 'Text');
    expect(wrapper.find('Field')).toHaveProp('name', 'content.text');
    expect(wrapper.find('Field')).toHaveProp('syntaxValidation', false);
  });

  it('should set Test Data syntax validation correctly', () => {
    selectTabByContent(wrapper, 'Test Data');
    expect(wrapper.find('Field')).toHaveProp('name', 'testData');
    expect(wrapper.find('Field')).toHaveProp('syntaxValidation', true);
  });

  it('should set AMP syntax validation correctly', () => {
    selectTabByContent(wrapper, 'AMP HTML');
    expect(wrapper.find('Field')).toHaveProp('name', 'content.amp_html');
    expect(wrapper.find('Field')).toHaveProp('syntaxValidation', false);
  });

  it('should set required content validation correctly for just HTML and Text', () => {
    expect(wrapper.find('Field').props().validate[0]).toBe(wrapper.instance().requiredHtmlTextOrAmp);
  });

  it('should set required content validation correctly for HTML, Text, and AMP', () => {
    wrapper.setProps({ contentOnly: true });
    expect(wrapper.find('Field').props().validate[0]).toBe(wrapper.instance().requiredHtmlTextOrAmp);
  });

  cases('.normalize', ({ expected, value }) => {
    expect(wrapper.instance().normalize(value)).toEqual(expected);
  }, {
    'when undefined': {
      expected: '',
      value: undefined
    },
    'when empty': {
      expected: '',
      value: ' \t\n\t '
    },
    'when filled': {
      expected: ' <p>testing</p> ',
      value: ' <p>testing</p> '
    }
  });

  describe('.requiredHtmlTextOrAmp', () => {
    const subject = (content) => (
      wrapper.instance().requiredHtmlTextOrAmp(undefined, { content })
    );

    it('returns undefined with html content', () => {
      expect(subject({ html: '<p>test</p>' })).toBeUndefined();
    });

    it('returns undefined with text content', () => {
      expect(subject({ text: 'test' })).toBeUndefined();
    });

    it('returns undefined with amp content', () => {
      expect(subject({ amp_html: '<span>test</span>' })).toBeUndefined();
    });

    it('returns undefined with all content', () => {
      expect(subject({ html: '<p>test</p>', text: 'test', amp_html: '<span>test</span>' })).toBeUndefined();
    });

    it('returns required validation message', () => {
      expect(subject({})).toMatch(/required/);
    });

    it('returns required validation message with whitespace', () => {
      expect(subject({ html: '     ' })).toMatch(/required/);
    });

    it('returns required validation message with null', () => {
      expect(subject({ html: null })).toMatch(/required/);
    });
  });

  describe('.validTestDataJson', () => {
    const subject = (testData) => (
      wrapper.instance().validTestDataJson(undefined, { testData })
    );

    it('returns undefined with valid test data json', () => {
      expect(subject('{}')).toBeUndefined();
    });

    it('returns undefined when test data tab is invalid, but hidden', () => {
      wrapper.setProps({ contentOnly: true });
      expect(subject(undefined)).toBeUndefined();
    });

    it('returns invalid message', () => {
      expect(subject('')).toMatch(/invalid/i);
    });
  });
});
