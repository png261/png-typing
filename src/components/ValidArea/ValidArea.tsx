import { Char, Wrapper } from './ValidArea.styles';

type Props = {
	curSentence: string;
	typedText: string;
};

const ValidArea = ({ curSentence, typedText }: Props) => {
	return (
		<Wrapper>
			{[...curSentence].map((c, i) => (
				<Char key={i}>
					{c}
					{c !== typedText[i] && typedText[i] && <div></div>}
				</Char>
			))}
		</Wrapper>
	);
};

export default ValidArea;
