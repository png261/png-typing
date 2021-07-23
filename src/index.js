import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from 'src/App/App';
import 'src/assets/scss/index.scss';
import store from 'src/store/store';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
