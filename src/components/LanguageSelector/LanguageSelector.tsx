import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage } from 'src/slices/language';
import KnobSelector from '../KnobSelector/KnobSelector';

const LanguageSelector = () => {
	const dispatch = useDispatch();
	const language = useSelector((state) => state.language);
	const setLanguage = (lang: 'ens' | 'vn') => dispatch(updateLanguage(lang));

	return (
		<KnobSelector
			options={{ English: 'ens', Vietnamese: 'vn' }}
			onChange={setLanguage}
			currentOption={language === 'pangram' ? 'ens' : language}
		/>
	);
};

export default LanguageSelector;
