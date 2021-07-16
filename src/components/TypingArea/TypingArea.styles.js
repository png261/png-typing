import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 18.6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 4.3rem 4.5rem 0 4.5rem;
    font-size: 1.7rem;
    border-radius: 0.2rem;
    background-color: var(--boxbg);
    letter-spacing: -0.7px;
    input {
        width: 100%;
        height: 2.8rem;
        font-family: inherit;
        line-height: 1.13;
        caret-color: var(--caret);
        color: var(--input);
        resize: none;
        border: none;
        outline: none;
        background: none;
        letter-spacing: -0.7px;
        &::placeholder {
            padding-left: 0.5rem;
            color: var(--gb);
            opacity: 1; /* Firefox */
        }
        &::-ms-input-placeholder {
            /* Microsoft Edge */
            padding-left: 0.5rem;
            color: var(--gb);
        }
    }
`;

export const Next = styled.p`
    margin-top: 2rem;
    color: var(--npt);
    font-size: 1.5rem;
    span {
        margin-right: 10px;
        font-size: 1.8rem;
    }
`;
