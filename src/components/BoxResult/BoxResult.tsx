import { Wrapper } from './BoxResult.style';

type Props = {
	label: string;
	value: string | number;
	isHighLight?: boolean;
	textLeft?: boolean;
};

const BoxResult = ({ label, value, isHighLight, textLeft }: Props) => {
	return (
		<Wrapper isHighLight={isHighLight} textLeft={textLeft}>
			<label>{label}</label>
			<span>{value}</span>
		</Wrapper>
	);
};

export default BoxResult;
