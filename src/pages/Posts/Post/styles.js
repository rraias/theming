import styled from 'styled-components';

export const Container = styled.article`
  background: ${({ theme }) => theme.currentTheme.postBackgroundColor};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.common.spacing.medium};
  border-radius: ${({ theme }) => theme.common.borderRadius};

  h2 {
    margin: 0 0 8px;
  }

  small {
    opacity: 0.7;
  }

  & + article {
    margin-top: ${({ theme }) => theme.common.spacing.small};
  }
`;
