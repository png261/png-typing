import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    column-gap: 1rem;
    padding: 1rem 0.5rem;
`;
export const Options = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    font-size: 1rem;
`;

export const KnobButton = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    box-shadow: 1px 0.2rem 0 0 rgb(0 0 0 / 30%);
    height: 4.4rem;
    width: 4.4rem;
    border-radius: 50%;
    button {
        position: relative;
        transform: rotate(50deg);
        transition: 0.2s;
        width: 100%;
        height: 100%;
        background-color: var(--button);
        border-radius: 50%;
        border: 0.1rem solid #000;
        &:after {
            content: '';
            background-color: #000;
            height: 7px;
            width: 1.6px;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
        &.active {
            transform: rotate(120deg);
        }
    }
`;
