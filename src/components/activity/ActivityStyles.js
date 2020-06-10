import styled from 'styled-components';
import { tokens } from '@sparkpost/design-tokens-hibana';

export const Content = styled.div`
  display: grid;
  grid-gap: ${() => tokens.spacing_200};
  grid-template-columns: ${() => `${tokens.spacing_600} auto`};
  grid-template-rows: 1fr 1fr;
  align-items: center;

  @media (min-width: ${() => tokens.mediaQuery_sm}) {
    grid-template-columns: ${() => `${tokens.spacing_600} 75% auto`};
    grid-template-rows: 1fr;
    grid-gap: ${() => tokens.spacing_500};
  }
`;

export const ActivityWrapper = styled.div``;

export const ItemWrapper = styled.div``;

export const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${() => tokens.color_gray_200};
  color: ${() => tokens.color_gray_800};
  border-radius: ${() => tokens.borderRadius_circle};
  width: ${() => tokens.sizing_600};
  height: ${() => tokens.sizing_600};
  transition-property: transform, box-shadow;
  transition-duration: ${() => tokens.motionDuration_fast};
  transition-timing-function: ${() => tokens.motionEase_in_out};

  ${ItemWrapper}:hover &,
  ${ItemWrapper}:focus-within & {
    transform: scale(1.1);
    box-shadow: ${() => tokens.boxShadow_200};
  }
`;

export const TimeWrapper = styled.div`
  grid-column: 3;
  grid-row: 2;

  @media (min-width: ${() => tokens.mediaQuery_md}) {
    grid-column: unset;
    grid-row: unset;
  }
`;

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
