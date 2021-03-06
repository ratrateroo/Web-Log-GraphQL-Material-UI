import React from 'react';

import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import { client } from './apollo/ApolloClient';
import App from './App';
import AuthProvider from './context/AuthProvider';
import ColorModeProvider from './context/ColorModeProvider';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<ColorModeProvider>
					<Router>
						<App />
					</Router>
				</ColorModeProvider>
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
