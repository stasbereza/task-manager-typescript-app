import React from 'react';
import { expect } from 'chai';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SortManager } from './index';

configure({ adapter: new Adapter() });

let wrapper: any;

describe('SortManager component', () => {
  const props = {
    currentPage: 1,
    currentSortField: '',
    currentSortDirection: '',
    fetchSortedTasks: jest.fn(),
  };
  wrapper = shallow(<SortManager {...props} />);
  
  test('should have 1 button element', () => {
    expect(wrapper.find('Button')).to.have.length(4);
  });
});
