import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewHeader from '../PreviewHeader';
import styles from '../PreviewHeader.module.scss';

jest.mock('../../hooks/useEditorContext');
jest.mock('src/hooks/useHibanaOverride');

describe('PreviewHeader', () => {
  const subject = ({ editorState } = {}) => {
    useHibanaOverride.mockImplementationOnce(() => styles);
    useEditorContext.mockReturnValue({
      preview: {
        subject: 'Example Subject',
        from: {
          email: 'test@example.com',
          name: 'Test Name',
        },
      },
      ...editorState,
    });

    return shallow(<PreviewHeader />);
  };

  it('renders preview header', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders nothings without a preview', () => {
    const wrapper = subject({ editorState: { preview: {} } });
    expect(wrapper).toBeEmptyRender();
  });

  it('renders only email address when no name is provided', () => {
    const wrapper = subject({
      editorState: {
        preview: {
          subject: 'Example Subject',
          from: { email: 'test@example.com' },
        },
      },
    });

    expect(wrapper.find('strong')).toHaveText('test@example.com');
  });
});
