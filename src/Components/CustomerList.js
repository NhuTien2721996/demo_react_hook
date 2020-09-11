import React from 'react';
import {connect} from "react-redux";
import * as actions from "../actions";

function CustomerList({customers, onDelete, onShowForm, onEdit, keyword, sort}) {
    let customerEditing;

    function findIndex(id) {
        let result = -1;
        customers.forEach((customer, index) => {
            if (customer.id === id) {
                result = index
            }
        });
        return result;
    }

    if (keyword) {
        customerEditing = customers.filter((customer) => {
            return customer.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        })
    } else {
        customerEditing = customers
    }
    const elements = customerEditing.map((customer, index) => {
        let result;
        result = <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{customer.name}</td>
            <td>{customer.gender === "male" ? "Nam" : "Nữ"}</td>
            <td>{customer.age}</td>
            <td>{customer.address}</td>
            <td>{customer.room === "1" ? "Phòng kế toán" : "Phòng nhân sự"}</td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>Xóa</button>
            </td>
            <td>
                <button className="btn btn-warning" onClick={() => updateCustomer(customer.id)}>Cập nhật</button>
            </td>
        </tr>;
        return result
    });
    const deleteCustomer = (id) => {
        let index = findIndex(id);
        onDelete(customers[index]);
    };
    const updateCustomer = (id) => {
        onShowForm();
        let index = findIndex(id);
        onEdit(customers[index])
    };
    customers.sort((a, b) => {
        if (a.name < b.name) return sort;
        else if (a.name > b.name) return -sort;
        else return 0
    });

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên nhân viên</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Tuổi</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Phòng ban</th>
                    <th scope="col">Xóa</th>
                    <th scope="col">Cập nhật</th>
                </tr>
                </thead>
                <tbody>
                {elements}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        customers: state.customers,
        keyword: state.search,
        sort: state.sort,

    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowForm: () => {
            dispatch(actions.showForm())
        },
        onDelete: (customer) => {
            dispatch(actions.deleteCustomer(customer))
        },
        onEdit: (customer) => {
            dispatch(actions.editCustomer(customer))
        }
    }
};
export default (connect(mapStateToProps, mapDispatchToProps))(CustomerList);
