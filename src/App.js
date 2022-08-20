import React from 'react';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import MyRouter from './routes/index'
import store from './store/index'
import { Provider } from 'react-redux'


function App() {
  return (
    <Provider store={store}>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <MyRouter></MyRouter>
    </Provider>
  );
}

export default App;
