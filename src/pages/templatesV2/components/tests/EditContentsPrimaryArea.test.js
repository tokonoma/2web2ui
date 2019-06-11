import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import EditContentsPrimaryArea from '../EditContentsPrimaryArea';
import { RemoveRedEye } from '@sparkpost/matchbox-icons';

jest.mock('../../hooks/useEditorContext');

describe('EditContentsPrimaryArea', () => {
  const subject = (editorStateOverride = {}) => {
    const draft = {
      id: 'foo',
      name: 'Foo'
    };

    const editorState = {
      draft,
      isPublishedMode: false,
      hasPublished: false,
      ...editorStateOverride
    };

    useEditorContext.mockReturnValue(editorState);
    return shallow(<EditContentsPrimaryArea/>);
  };

  describe('draft mode', () => {
    let props;
    const historyPush = jest.fn();
    beforeEach(() => {
      props = {
        history: { push: historyPush },
        isPublishedMode: false
      };
    });

    it('renders actions', () => {
      expect(subject(props)).toMatchSnapshot();
    });

    it('renders view published action when template has published version', () => {
      const wrapper = subject({ ...props, hasPublished: true });
      expect(wrapper.find('ActionList').prop('actions')).toHaveLength(4);
      expect(wrapper.find('ActionList').prop('actions')[2].visible).toBe(true);
      expect(wrapper.find('ActionList').prop('actions')[2].content).toEqual(
        <span><RemoveRedEye/> View Published</span>
      );
    });

    describe('Save and Publish', () => {
      let publishDraft;
      let content;

      beforeEach(() => {
        publishDraft = jest.fn(() => Promise.resolve());
        content = { html: '<h1>Foo</h1>', text: 'Foo' };
      });

      it('saves and publishes template', async () => {
        const wrapper = subject({ ...props, publishDraft, content });

        await wrapper.find('ActionList').prop('actions')[0].onClick();
        expect(publishDraft).toHaveBeenCalledWith({ id: 'foo', content }, undefined);
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/foo/published');
      });

      it('saves and publishes template with subaccount id', async () => {
        const wrapper = subject({ ...props, publishDraft, content, draft: { id: 'foo', subaccount_id: 101 }});

        await wrapper.find('ActionList').prop('actions')[0].onClick();
        expect(publishDraft).toHaveBeenCalledWith({ id: 'foo', content }, 101);
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/foo/published?subaccount=101');
      });
    });

    describe('Save Draft', () => {
      let updateDraft;
      let content;

      beforeEach(() => {
        updateDraft = jest.fn(() => Promise.resolve());
        content = { html: '<h1>Foo</h1>', text: 'Foo' };

      });

      it('saves draft template', async () => {
        const wrapper = subject({ ...props, updateDraft, content });
        await wrapper.find('ActionList').prop('actions')[1].onClick();
        expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, undefined);
      });

      it('saves draft template with subaccount id', async () => {
        const wrapper = subject({ ...props, updateDraft, content, draft: { id: 'foo', subaccount_id: 101 }});
        await wrapper.find('ActionList').prop('actions')[1].onClick();
        expect(updateDraft).toHaveBeenCalledWith({ id: 'foo', content }, 101);
      });
    });

    describe('View Published', () => {
      it('pushes state to publish mode', () => {
        const wrapper = subject({ ...props, hasPublished: true });
        expect(wrapper.find('ActionList').prop('actions')[2].visible).toBe(true);
        wrapper.find('ActionList').prop('actions')[2].onClick();
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/foo/published');
      });
    });

    describe('Duplicate', () => {
      it('pushes state to duplicat path', () => {
        const wrapper = subject({ ...props });
        wrapper.find('ActionList').prop('actions')[3].onClick();
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/create/foo');
      });
    });
  });

  describe('published mode', () => {
    let props;
    const historyPush = jest.fn();
    beforeEach(() => {
      props = {
        history: { push: historyPush },
        isPublishedMode: true
      };
    });
    it('renders  actions', () => {
      expect(subject(props)).toMatchSnapshot();
    });

    describe('Edit Draft', () => {
      it('pushes state to draft mode', () => {
        const wrapper = subject({ ...props });
        wrapper.find('ActionList').prop('actions')[0].onClick();
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/edit/foo');
      });
    });

    describe('Duplicate Template', () => {
      it('pushes state to duplicate path', () => {
        const wrapper = subject({ ...props });
        wrapper.find('ActionList').prop('actions')[1].onClick();
        expect(historyPush).toHaveBeenCalledWith('/templatesv2/create/foo');
      });
    });
  });
});
