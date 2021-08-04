import { useSelector } from 'react-redux';
import BoxResult from '../BoxResult/BoxResult';

const CountTimes = () => {
	const allResult = useSelector((state) => state.results.all);

	return <BoxResult label="Count" value={allResult.length} />;
};

export default CountTimes;
