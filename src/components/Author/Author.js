import React from 'react';
import useGetSentences from 'src/hooks/useGetSentences';
import { Wrapper } from './Author.styles';

const Author = () => {
    const { currentAuthor } = useGetSentences();

    return <Wrapper>{currentAuthor}</Wrapper>;
};

export default Author;
