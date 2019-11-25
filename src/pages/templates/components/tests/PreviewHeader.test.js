import React from 'react';
import { shallow } from 'enzyme';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewHeader from '../PreviewHeader';

jest.mock('../../hooks/useEditorContext');

describe('PreviewHeader', () => {
  const subject = ({ editorState } = {}) => {
    useEditorContext.mockReturnValue({
      preview: {
        subject: 'Example Subject',
        from: {
          email: 'test@example.com',
          name: 'Test Name'
        }
      },
      ...editorState
    });

    return shallow(<PreviewHeader />);
  };

  it('renders preview header', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders nothings without a preview', () => {
    const wrapper = subject({ editorState: { preview: {}}});
    expect(wrapper).toBeEmptyRender();
  });

  it('renders only email address when no name is provided', () => {
    const wrapper = subject({
      editorState: {
        preview: {
          subject: 'Example Subject',
          from: { email: 'test@example.com' }
        }
      }
    });

    expect(wrapper.find('strong')).toHaveText('test@example.com');
  });
});
