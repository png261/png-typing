import { NextButton, PrevButton, Value, Wrapper } from './ArrowSwitch.styles';

type Props = {
	options: [];
	currentOption: string;
	value?: unknown;
	onChange: (option: number) => void;
};

const ArrowSwitch = ({ options, currentOption, value, onChange }: Props) => {
	const index = options.findIndex((option) => option === currentOption);

	const changeValue = (option: number) => {
		const newIndex = (options.length + index + option) % options.length;
		onChange(options[newIndex]);
	};
	const goToPrev = () => changeValue(-1);
	const goToNext = () => changeValue(+1);

	return (
		<Wrapper>
			<PrevButton onClick={goToPrev}></PrevButton>
			<Value currentOption={currentOption}>
				{value || currentOption}
			</Value>
			<NextButton onClick={goToNext}></NextButton>
		</Wrapper>
	);
};

export default ArrowSwitch;
