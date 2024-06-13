import SelectAll from './SelectAll';
import { mount } from 'enzyme';
import { TableData } from '../../data/data';

describe('SelectAll component', () => {
  const mockData: TableData[] = [
    { id: "mockedId", device: 'Device 1', path: '/path/1', name: 'jui', status: 'available' },
    { id: "mockedId1", device: 'Device 2', path: '/path/2', name: 'jui2', status: 'available' }
  ];

  const setSelectedRowIds = jest.fn();
  const tableData = mockData;

  test('DownloadAction component should match snapshot', () => {
    const component = mount(<SelectAll selectedRowIds ={[]} selectAll={false} setSelectedRowIds={setSelectedRowIds} tableData = {tableData}/>);
    expect(component).toMatchSnapshot();
  });

  test('selectAll Checkbox on click select all rows when checked and remove all rows when unchecked', () => {
    const setSelectedRowIds = jest.fn()
    const component = mount(<SelectAll selectedRowIds ={[]} selectAll={false} setSelectedRowIds={setSelectedRowIds} tableData = {tableData}/>);
    const selectAllCheckbox = component.find("input");

    selectAllCheckbox.at(0).simulate('change', { target: { checked: true } });

    expect(selectAllCheckbox.length).toBe(1);
    expect(setSelectedRowIds).toHaveBeenCalledWith(["mockedId","mockedId1"])

    selectAllCheckbox.at(0).simulate('change', { target: { checked: false } });

    expect(setSelectedRowIds).toHaveBeenLastCalledWith([])
  });

  test('selectAll check indeterminate state if one is selected out of 2 ', () => {
    const setSelectedRowIds = jest.fn()
    const component = mount(<SelectAll selectedRowIds ={["mockedId"]} selectAll={false} setSelectedRowIds={setSelectedRowIds} tableData = {tableData}/>);
    const selectAllCheckbox = component.find("input");

    expect(selectAllCheckbox.length).toBe(1);
    expect((selectAllCheckbox.getDOMNode() as any).indeterminate).toBe(true);
  });

  test('selectAll Checkbox on key Up select all rows when checked', () => {
    const setSelectedRowIds = jest.fn()
    const component = mount(<SelectAll selectedRowIds ={[]}  selectAll={false} setSelectedRowIds={setSelectedRowIds} tableData = {tableData}/>);
    const selectAllCheckbox = component.find("input");

    selectAllCheckbox.at(0).simulate('keyup', { key: 'Enter', keyCode: 13, which: 13 });

    expect(selectAllCheckbox.length).toBe(1);
    expect(setSelectedRowIds).toHaveBeenCalledWith(["mockedId","mockedId1"]);
  });
  
});
