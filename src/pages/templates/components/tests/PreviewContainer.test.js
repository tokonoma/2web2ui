import React from 'react';
import { shallow } from 'enzyme';
import useHibanaOverride from 'src/hooks/useHibanaOverride';
import useEditorContext from '../../hooks/useEditorContext';
import PreviewContainer from '../PreviewContainer';
import styles from '../PreviewContainer.module.scss';

jest.mock('../../hooks/useEditorContext');
jest.mock('src/hooks/useHibanaOverride');

describe('PreviewContainer', () => {
  const subject = ({ editorState } = {}) => {
    useHibanaOverride.mockImplementationOnce(() => styles);
    useEditorContext.mockReturnValue({ previewDevice: 'desktop', ...editorState });
    return shallow(<PreviewContainer children={<div>Example</div>} />);
  };

  it('renders desktop container', () => {
    expect(subject()).toMatchSnapshot();
  });

  it('renders mobile container', () => {
    expect(subject({ editorState: { previewDevice: 'mobile' } })).toMatchSnapshot();
  });
});
