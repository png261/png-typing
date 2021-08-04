import { useDispatch, useSelector } from 'react-redux';
import { updateTypingLength } from 'src/slices/typingLength';
import KnobSelector from '../KnobSelector/KnobSelector';

const TypingLengthSelector = () => {
	const dispatch = useDispatch();

	const typingLength = useSelector((state) => state.typingLength);
	const setTypingLength = (lengthOption: 'sentences' | 'paragraph') => {
		dispatch(updateTypingLength(lengthOption));
	};
	return (
		<KnobSelector
			options={{
				Sentences: 'sentences',
				Paragraph: 'paragraph',
			}}
			onChange={setTypingLength}
			currentOption={typingLength}
		/>
	);
};

export default TypingLengthSelector;
