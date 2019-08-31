import React from 'react';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './index';
import { BrowserRouter as Router } from 'react-router-dom';

configure({ adapter: new Adapter() });

const store = configureStore([
  thunk,
])();

it('render without crashing', () => {
  shallow(
    <Provider store={store}><App /></Provider>
  ).dive();
  });


  it('renders Router', () => {
    const wrapper = shallow(
      <Provider store={store}><App><Router /></App></Provider>
    ).dive();

    expect(wrapper.contains(<Router />)).to.equal(true);
  });

