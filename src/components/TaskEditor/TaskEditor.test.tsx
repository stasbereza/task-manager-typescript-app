import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as Adapter from 'enzyme-adapter-react-16';
// import { Provider } from 'react-redux';
import ConnectedTaskEditor, { TaskEditor } from '../TaskEditor';

configure({ adapter: new Adapter.default() });

const mockStore = configureStore();
let wrapper: any;
let store: any;

const props = {
  addTask: jest.fn(),
  onCancel: jest.fn()
}

const initialState = {
  username: '',
  email: '',
  text: '',
};

const updatedState = {
  username: 'Stanilsav',
  email: 'stanislav.bereza@gmail.com',
  text: 'New task',
};

beforeEach(() => {
  store = mockStore(initialState);
  // wrapper = mount(<Provider store={store}><TaskEditor {...props} /></Provider>);
  wrapper = mount(<TaskEditor {...props } />);
})

describe('TaskEditor component', () => {
  test('should have 1 form element', () => {
    expect(wrapper.find('form')).to.have.length(1);
  })

  test('should have 2 input elements', () => {
    expect(wrapper.find('input')).to.have.length(2);
  });

  test('should have 1 textarea element', () => {
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  test('should have 1 textarea element', () => {
    expect(wrapper.find('textarea')).to.have.length(1);
  });

  test('should have 2 button elements', () => {
    expect(wrapper.find('button')).to.have.length(2);
  });

  test('should handle form <<submit>> event', () => {
    wrapper.find('form').simulate('submit');

    expect(wrapper.state()).to.eql(initialState);
});

  test('should respond to state change properly', () => {
    wrapper.setState({
      username: updatedState.username,
      email: updatedState.email,
      text: updatedState.text
    });

    expect(wrapper.state()).to.eql(updatedState);
    expect(wrapper.find('textarea').text()).to.equal(updatedState.text);

    wrapper.setState({
      username: '',
      email: '',
      text: '',
    });

    expect(wrapper.state()).to.eql(initialState);
    expect(wrapper.find('textarea').text()).to.equal('');
  });
});

describe('When the form is submitted', () => {
  it('should call the mock addTask function', () => {
    wrapper.find('form').simulate('submit', { preventDefault() { } })
    expect(props.addTask.mock.calls).to.be.an('array');
  })
})



