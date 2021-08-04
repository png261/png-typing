import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.7rem;
    span {
        display: block;
        font-size: 1.8rem;
        ${({ textLeft }) => !textLeft && `text-align: right;`}
        ${({ isHighLight }) => isHighLight && `color:#f6646d`}
    }
`;
