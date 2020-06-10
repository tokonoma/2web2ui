import styled from 'styled-components';
import { tokens } from '@sparkpost/design-tokens-hibana';

export const Content = styled.div`
  display: grid;
  grid-gap: ${() => tokens.spacing_500};
  grid-template-columns: ${() => `${tokens.spacing_600} 75% auto`};
  align-items: center;
`;

export const ActivityWrapper = styled.div``;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${() => tokens.color_gray_600};
`;

export const DateValue = styled.div`
  background-color: #fff;
  white-space: nowrap;
  font-weight: ${() => tokens.fontWeight_semibold};
  padding-right: ${() => tokens.spacing_300};
`;

export const DateBorder = styled.hr`
  margin: 0;
  width: 100%;
`;
