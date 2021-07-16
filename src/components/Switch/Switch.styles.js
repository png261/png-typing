import styled from 'styled-components';

export const Button = styled.div`
    position: relative;
    cursor: pointer;
    height: 2.4rem;
    width: 9.4rem;
    z-index: 1;
    display: flex;
    border: 0.1rem solid #000;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.2rem 0 0 rgb(0 0 0 / 30%);
    background-color: var(--timebg);
    &:before {
        content: '';
        position: absolute;
        height: 100%;
        width: 50%;
        border-radius: 0.3rem;
        background-color: var(--timebtn);
        top: 0;
        left: 0;
        z-index: -1;
        transition: all 0.2s;
    }
    span {
        display: grid;
        place-content: center;
        width: 50%;
        height: 100%;
        font-size: 1.1rem;
    }
    &.active:before {
        transform: translateX(100%);
    }
`;
