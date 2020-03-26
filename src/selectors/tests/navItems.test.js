import _ from 'lodash';
import { prepareNavItems } from '../navItems';

jest.mock('src/config/routes', () => [
  {
    path: '/no/children',
    condition: ({ blocked = [] }) => !blocked.includes('/no/children'),
  },
  {
    path: '/with/children',
    condition: ({ blocked = [] }) => !blocked.includes('/with/children'),
  },
  {
    path: '/child/a',
    condition: ({ blocked = [] }) => !blocked.includes('/child/a'),
  },
  {
    path: '/child/b',
    condition: ({ blocked = [] }) => !blocked.includes('/child/b'),
  },
  {
    path: '/child/c',
    condition: ({ blocked = [] }) => !blocked.includes('/child/c'),
  },
  {
    path: '/no/condition',
  },
  {
    path: '/nav/condition',
  },
]);

const mockItems = [
  {
    label: 'No Children',
    to: '/no/children',
  },
  {
    label: 'With Nav Condition',
    to: '/nav/condition',
    condition: ({ blocked = [] }) => !blocked.includes('/nav/condition'),
  },
  {
    label: 'With Children',
    to: '/with/children',
    children: [
      {
        label: 'Child A',
        to: '/child/a',
      },
      {
        label: 'Child B',
        to: '/child/b',
      },
      {
        label: 'Child C',
        to: '/child/c',
      },
    ],
  },
  {
    label: 'No Condition',
    to: '/no/condition',
  },
];

// jest.mock('src/config/navItems', () => mockItems);

describe('NavItems Selectors', () => {
  let store;

  beforeEach(() => {
    store = {
      blocked: [],
    };
  });

  it('should select all nav items if none are blocked', () => {
    const selected = prepareNavItems(mockItems, store);
    expect(selected).toHaveLength(4);
    expect(selected[2].children).toHaveLength(3);
    expect(selected).toMatchSnapshot();
  });

  it('should remove blocked parents and children', () => {
    store.blocked.push('/no/children');
    store.blocked.push('/child/b');

    const selected = prepareNavItems(mockItems, store);
    expect(selected).toHaveLength(3);
    expect(selected[1].children).toHaveLength(2);
    expect(selected).toMatchSnapshot();
  });

  it('should remove a parent if all children are blocked', () => {
    store.blocked.push('/child/a');
    store.blocked.push('/child/b');
    store.blocked.push('/child/c');

    const selected = prepareNavItems(mockItems, store);
    expect(selected).toHaveLength(3);
    expect(selected).toMatchSnapshot();
  });

  it('should remove a parent and all of its children if parent is blocked', () => {
    store.blocked.push('/with/children');

    const selected = prepareNavItems(mockItems, store);
    expect(selected).toHaveLength(3);
    expect(selected).toMatchSnapshot();
  });

  it('should not mutate items', () => {
    store.blocked.push('/child/a');
    store.blocked.push('/child/b');
    store.blocked.push('/child/c');

    const selected1 = prepareNavItems(mockItems, store);
    expect(selected1).toHaveLength(3);
    expect(selected1).toMatchSnapshot();

    store.blocked = [];
    const selected2 = prepareNavItems(mockItems, store);
    expect(selected2).toHaveLength(4);
    expect(selected2[2].children).toHaveLength(3);
    expect(selected2).toMatchSnapshot();
  });

  it('should remove item if the nav blocks it', () => {
    store.blocked.push('/nav/condition');

    const selected = prepareNavItems(mockItems, store);
    expect(selected).toHaveLength(3);
    expect(selected).toMatchSnapshot();
  });

  it('should render the "to" value based on child nav items', () => {
    const selected = prepareNavItems(mockItems, store);

    // Returns with the `to` value of the nav item when no children are present
    expect(_.find(selected, ['label', 'No Children']).to).toBe('/no/children');

    // Returns with the `to` value of the nav item's first child when present
    expect(_.find(selected, ['label', 'With Children']).to).toBe('/child/a');
  });
});
