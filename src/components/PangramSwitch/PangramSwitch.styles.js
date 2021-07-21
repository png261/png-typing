import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0.5rem 0.7rem;
    &,
    label {
        cursor: pointer;
    }
`;
export const Switch = styled.div`
    position: absolute;
    top: 0.4rem;
    right: 0.8rem;
    width: 1.1rem;
    height: 2rem;
    margin-left: 0.7rem;
    border: 0.1rem solid #000000;
    border-radius: 0.5rem;
    box-shadow: inset 0 0.1rem 0.3rem 0 rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    background-color: var(--pangbox);
    ${({ active }) => active && ' background-color: var(--timebtn);'}

    &:before {
        content: '';
        display: block;
        width: 0.9rem;
        height: 0.9rem;
        border-radius: 50%;
        background: var(--pangbtn);
        transition: all 0.2s;
        ${({ active }) => !active && 'margin-top:0.9rem'}
    }
`;
