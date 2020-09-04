import React from 'react';

function CustomerList({customers,onDelete,onUpdate}) {
    const elements = customers.map((customer, index) => {
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
    const deleteCustomer = (index) => {
        onDelete(index);
    };
    const updateCustomer = (index) => {
        onUpdate(index);
    };
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

export default CustomerList;
