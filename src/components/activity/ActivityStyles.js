import styled from 'styled-components';
import { tokens } from '@sparkpost/design-tokens-hibana';

export const Content = styled.div`
  display: grid;
  grid-gap: ${() => tokens.spacing_500};
  grid-template-columns: ${() => `${tokens.spacing_600} 75% auto`};
  align-items: center;
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
  transition: ${() => `transform ${tokens.motionDuration_fast} ${tokens.motionEase_out}`};

  ${ItemWrapper}:hover &,
  ${ItemWrapper}:focus-within & {
    transform: scale(1.25);
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
