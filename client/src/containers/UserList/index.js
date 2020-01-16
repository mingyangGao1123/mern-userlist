import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/users';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';

import 'antd/dist/antd.css';
import { deleteUser } from '../../actions/deleteuser';

import FetchError from '../ErrorMessage';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
    };
    props.dispatch(getUsers());
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          style={{ width: 100, backgroundColor: 'white', color: 'black' }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          style={{ width: 100, backgroundColor: 'white', color: 'black' }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handleDelete(_id) {
    const { dispatch } = this.props;
    dispatch(deleteUser(_id));
    //console.log(_id);
    //dispatch(getUsers());
  }

  routerTo(record) {
    this.props.history.push({
      pathname: '/edituser/' + record._id,
      state: { userDetail: record },
    });
  }

  render() {
    const { users } = this.props;
    if (users.isLoading) {
      return <div>Loading</div>;
    }

    console.log(users);

    const columns = [
      {
        title: 'FirstName',
        dataIndex: 'firstname',
        sorter: (a, b) => {
          return a.firstname.localeCompare(b.firstname);
        },
        //sortDirections: ['descend'],
        ...this.getColumnSearchProps('firstname'),
      },
      {
        title: 'LastName',
        dataIndex: 'lastname',
        sorter: (a, b) => {
          return a.lastname.localeCompare(b.lastname);
        },
        //sortDirections: ['descend'],
        ...this.getColumnSearchProps('lastname'),
      },
      {
        title: 'Age',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age,
        ...this.getColumnSearchProps('age'),
      },
      {
        title: 'Sex',
        dataIndex: 'sex',
      },

      {
        title: 'Action',
        render: (text, record) => (
          <span>
            <button onClick={() => this.handleDelete(record._id)}>
              Delete
            </button>
            <button onClick={() => this.routerTo(record)}>Edit</button>
          </span>
        ),
      },
    ];

    //error handler

    if (users.error.message === 'Request failed with status code 500') {
      return <FetchError />;
    }

    function onChange(pagination, sorter, extra) {
      console.log('params', pagination, sorter, extra);
    }

    let usersUI;
    //if (users.isLoading) {
    //  usersUI = <p>Loading</p>;
    //} else if (users.error !== '') {
    //  usersUI = <p style={{ color: 'red' }}>{users.error}</p>;
    //} else if (users.data.length !== 0) {
    usersUI = (
      <Table
        columns={columns}
        dataSource={users.data}
        onChange={onChange}
        rowKey="_id"
      />
    );
    //}

    return (
      <div>
        <h2>User List</h2>
        {usersUI}
        <Link to="/adduser">
          <button> Create User</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps)(UserList);
