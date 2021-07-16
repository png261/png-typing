import styled from 'styled-components';

export const Wrapper = styled.div`
    height: 100vh;
    main {
        width: 58.1rem;
        height: 38.6rem;
        padding: 0.2rem;
        overflow: hidden;
        position: relative;
        top: 40%;
        background-color: #000;
        box-shadow: rgba(0, 0, 0, 0.3) 0.4rem 0.4rem 0 0;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        row-gap: 0.2rem;
        border-radius: 0.5rem;
    }
    @media (min-width: 1025px) {
        main {
            width: 90.7rem;
            height: 34.4rem;
        }
    }
`;
export const InfoTable = styled.div`
    /* height: 15.2rem; */
    overflow: hidden;

    /* display: grid;
    grid-template-columns: ;
    grid-template-areas:
        'langues result typing'
        'langues result typing'
        'langues result typing'
        'sentences goal speed accuracy count'
        'sentences goal speed accuracy count'
        'sentences goal author author author';
    .languages-options {
        grid-area: 'langues';
    }
    .sentences-options {
        grid-area: 'sentences';
    }
    .typing-options {
        grid-area: 'typing';
    }
    .result {
        grid-area: 'result';
    }
    .goal-speed {
        grid-area: 'goal-speed';
    }
    .speed {
        grid-area: 'speed';
    }
    .accuracy {
        grid-area: 'accuracy';
    }
    .count {
        grid-area: 'count';
    }
    .author {
        grid-area: 'accuracy';
    } */
    & > * {
        background-color: var(--boxbg);
    }
`;
export const BoxResult = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    padding: 0.3rem 0.7rem;
    span {
        display: block;
        text-align: right;
        font-size: 1.8rem;
    }
`;
export const TypeSentences = styled.div``;
export const OptionTyping = styled.div``;
export const Author = styled.div``;
export const Result = styled.div``;
