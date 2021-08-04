import 'react-redux';
import { AppState } from 'src/store/store';

declare module 'react-redux' {
	interface DefaultRootState extends AppState {}
}
