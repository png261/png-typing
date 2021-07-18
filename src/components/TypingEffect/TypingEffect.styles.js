import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 32.3rem;
    height: 10rem;
    padding-top: 0.4rem;
    padding-left: 1.1rem;
    padding-right: 1.1rem;
    line-height: 0;
    & > span {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background-color: var(--vkb);
        transition: 0.2s;
        margin-top: 0.2rem;
        margin-left: 0.2rem;
    }

    ${({ currentKey }) => `.${currentKey}{
            background: var(--timebtn);
            transition: 0.1s;
    }`}
`;
