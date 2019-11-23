import React from 'react';
import { expect } from 'chai';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SortManager } from './index';

configure({ adapter: new Adapter() });

let wrapper: any;
let store: any;



const props = {
  currentPage: 1,
  currentSortField: '',
  currentSortDirection: '',
  fetchSortedTasks: jest.fn(),
}

wrapper = mount(<SortManager {...props} />);

describe('SortManager component', () => {
  test('should have 1 button element', () => {
    expect(wrapper.find('button')).to.have.length(4)
  })
});
