import { Button } from './Switch.styles';

const Switch = ({ options, currentOption, onChange }) => {
	options = Object.entries(options);
	const index = options.findIndex(
		([label, value]) => value === currentOption
	);

	const onClick = () => {
		if (!onChange) return;
		onChange(options[(index + 1) % options.length][1]);
	};

	return (
		<Button onClick={onClick} className={index ? 'active' : ''}>
			{options.map(([label], i: number) => (
				<span key={i}>{label}</span>
			))}
		</Button>
	);
};

export default Switch;
