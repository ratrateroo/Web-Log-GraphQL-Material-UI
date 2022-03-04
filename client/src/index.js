import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from '@apollo/client';
import ColorModeProvider from './context/ColorModeProvider';

import { client } from './apollo/ApolloClient';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ColorModeProvider>
				<Router>
					<App />
				</Router>
			</ColorModeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
