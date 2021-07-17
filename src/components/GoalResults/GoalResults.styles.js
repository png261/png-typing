import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem 2rem;
    height: 100%;
    overflow: auto;
`;
export const Result = styled.div`
    display: flex;
    text-transform: uppercase;
    justify-content: space-between;
    margin-top: 0.1rem;
    span {
        display: inline-block;
        width: 2.5rem;

        &:nth-child(1) {
            width: 1.5rem;
        }
        &:nth-child(2) {
            margin: 0 1rem 0 0;
            border-right: 0.1rem solid;
        }
        &:nth-child(3) {
            margin: 0 1rem 0 0;
            border-right: 0.1rem solid;
        }
    }
`;
