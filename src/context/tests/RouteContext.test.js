import React from 'react';
import { shallow } from 'enzyme';
import { ProviderComponent } from '../RouteContext';

describe('RouteContext', () => {
  describe('ProviderComponent', () => {
    const sampleProps = {
      location: {
        hash: '',
        pathname: '/example/123',
        search: '',
        state: undefined
      },
      match: {
        params: {
          id: '123'
        },
        path: '/example/:id',
        url: '/example/123'
      }
    };

    const subject = (props = sampleProps) => shallow(
      <ProviderComponent {...props}>
        <div>Hello!</div>
      </ProviderComponent>
    );

    it('renders a context provider', () => {
      expect(subject()).toMatchSnapshot();
    });

    it('parses query string', () => {
      const wrapper = subject({
        ...sampleProps,
        location: {
          ...sampleProps.location,
          search: '?query=abc'
        }
      });

      expect(wrapper.prop('value')).toHaveProperty('params', { id: '123', query: 'abc' });
    });
  });
});
