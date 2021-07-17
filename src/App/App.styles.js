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
    height: 15.2rem;
    overflow: hidden;
    display: grid;
    grid-gap: 0.2rem;
    grid-template-areas:
        'langues result result result result typing typing typing notice'
        'langues result result result result typing typing typing notice'
        'langues result result result result typing typing typing typing-effect'
        'sentences goal speed speed accuracy accuracy count count typing-effect'
        'sentences goal speed speed accuracy accuracy count count typing-effect'
        'sentences goal author author author author author author typing-effect';
    grid-template-columns: 14rem 11rem repeat(6, 1fr) 32.3rem;
    grid-template-rows: repeat(6, 1fr);
    .languages-options {
        grid-area: langues;
    }
    .sentences-options {
        grid-area: sentences;
    }
    .goal-results {
        grid-area: result;
    }
    .typing-options {
        grid-area: typing;
    }
    .notice {
        grid-area: notice;
    }
    .typing-effect {
        grid-area: typing-effect;
    }
    .goal-speed {
        grid-area: goal;
    }
    .speed {
        grid-area: speed;
    }
    .accuracy {
        grid-area: accuracy;
    }
    .count {
        grid-area: count;
    }
    .author {
        grid-area: author;
    }
    & > * {
        background-color: var(--boxbg);
        border-radius: 0.3rem;
    }
`;

export const TypeSentences = styled.div``;
export const OptionTyping = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 1rem;
`;
export const Author = styled.div`
    display: grid;
    place-items: center;
`;
export const Notice = styled.div`
    padding: 0.7rem 1rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.9rem;
    & > *:not(p) {
        text-align: right;
        font-size: 1.2rem;
    }
`;
