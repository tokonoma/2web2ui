import React from 'react';
import { shallow } from 'enzyme';
import {
  OGBreadCrumbs,
  HibanaBreadCrumbs,
  OGBreadCrumbsItem,
  HibanaBreadCrumbsItem,
} from '../BreadCrumbs';

describe('BreadCrumbs', () => {
  it('should match snapshots', () => {
    const ogProps = {
      children: [
        <OGBreadCrumbsItem onClick={jest.fn()} active={false}>
          A
        </OGBreadCrumbsItem>,
        <OGBreadCrumbsItem onClick={jest.fn()} active={false}>
          B
        </OGBreadCrumbsItem>,
        <OGBreadCrumbsItem onClick={jest.fn()} active={false}>
          C
        </OGBreadCrumbsItem>,
      ],
    };

    expect(shallow(<OGBreadCrumbs {...ogProps} />)).toMatchSnapshot();

    const hibanaProps = {
      children: [
        <HibanaBreadCrumbsItem onClick={jest.fn()} active={false}>
          A
        </HibanaBreadCrumbsItem>,
        <HibanaBreadCrumbsItem onClick={jest.fn()} active={false}>
          B
        </HibanaBreadCrumbsItem>,
        <HibanaBreadCrumbsItem onClick={jest.fn()} active={false}>
          C
        </HibanaBreadCrumbsItem>,
      ],
    };

    expect(shallow(<HibanaBreadCrumbs {...hibanaProps} />)).toMatchSnapshot();
  });
});
