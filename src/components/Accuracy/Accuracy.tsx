import { useSelector } from 'react-redux';
import BoxResult from 'src/components/BoxResult/BoxResult';

function Accuracy() {
	const ACC = useSelector((state) => state.realTimeInfo.acc);

	return <BoxResult label="Accuracy" value={ACC} />;
}

export default Accuracy;
