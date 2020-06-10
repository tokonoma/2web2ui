import styled from 'styled-components';
import { tokens } from '@sparkpost/design-tokens-hibana';

export const Content = styled.div`
  display: grid;
  grid-gap: ${() => tokens.spacing_500};
  grid-template-columns: ${() => `${tokens.spacing_600} 50% auto`};

  > * {
    align-self: center;
  }
`;

export const ActivityWrapper = styled.div``;
