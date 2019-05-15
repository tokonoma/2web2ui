import React from 'react';
import { mount, shallow } from 'enzyme';
import useRouter from 'src/hooks/useRouter';
import useEditorContext from '../hooks/useEditorContext';
import EditAndPreviewPage from '../EditAndPreviewPage';

jest.mock('src/hooks/useRouter');
jest.mock('../hooks/useEditorContext');

describe('EditAndPreviewPage', () => {
  const subject = ({ editorState, render = shallow } = {}) => {
    useEditorContext.mockReturnValue({
      draft: { id: 'test-template', name: 'Test Template' },
      getDraft: () => {},
      getPublished: () => {},
      hasDraftFailedToLoad: false,
      isDraftLoading: false,
      ...editorState
    });
    useRouter.mockReturnValue({ requestParams: { id: 'test-template', subaccount: '123' }});

    return render(<EditAndPreviewPage />);
  };

  it('renders a page', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders loading', () => {
    const wrapper = subject({ editorState: { isDraftLoading: true }});
    expect(wrapper.find('Loading')).toExist();
  });

  it('redirects and alerts when fails to load', () => {
    const wrapper = subject({ editorState: { hasDraftFailedToLoad: true }});
    expect(wrapper.find('RedirectAndAlert')).toExist();
  });

  it('requests draft and published templates on mount', () => {
    const getDraft = jest.fn();
    const getPublished = jest.fn();

    subject({
      editorState: { getDraft, getPublished },
      render: mount // todo, remove when useEffect is supported by enzyme
    });

    expect(getDraft).toHaveBeenCalledWith('test-template', '123');
    expect(getPublished).toHaveBeenCalledWith('test-template', '123');
  });
});
