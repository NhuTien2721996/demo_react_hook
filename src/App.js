import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Header";
import CustomerForm from "./Components/CustomerForm";
import CustomerList from "./Components/CustomerList";
import demo from "./tranning/demo";
function App() {
    const [customers, setCustomers] = useState([]);
    const [isDisplayForm, setIsDisplayForm] = useState(false);
    const [customerEditing, setCustomerEditing] = useState('');
    const [keyword, setKeyword] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortValue, setSortValue] = useState('');

    function onHandleSubmit(data) {
        let newCustomers = [...customers];
        if (data.id === "") {
            data.id = generateID();
            newCustomers.push(data);
        } else {
            let index = findIndex(data.id);
            newCustomers[index] = data;
        }
        setCustomers(newCustomers);
        localStorage.setItem('customers', JSON.stringify(customers));
        closeForm();
    }

    function findIndex(id) {
        const newCustomers = [...customers];
        let result = -1;
        newCustomers.forEach((customer, index) => {
            if (customer.id === id) {
                result = index
            }
        });
        return result;
    }

    useEffect(() => {
        if (localStorage && localStorage.getItem('customers')) {
            let customers = JSON.parse(localStorage.getItem('customers'));
            setCustomers(customers)
        }
    }, []);

    function s4() {
        return Math.floor((1 + Math.random()) * 0x1000).toString(16).substring(1);
    }

    function generateID() {
        return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
    }

    function onToggleForm() {
        if (isDisplayForm === true) {
            setIsDisplayForm(false);
            setCustomerEditing(null)
        } else {
            setIsDisplayForm(!isDisplayForm);
            setCustomerEditing(null)
        }
    }

    function showForm() {
        setIsDisplayForm(true)
    }

    function closeForm() {
        setIsDisplayForm(false)
    }

    function onDelete(id) {
        let index = findIndex(id);
        const newCustomers = [...customers];
        newCustomers.splice(index, 1);
        setCustomers(newCustomers);
        localStorage.setItem('customers', JSON.stringify(customers));
    }

    function onUpdate(id) {
        showForm();
        let index = findIndex(id);
        const newCustomer = [...customers];
        const customerEditing = newCustomer[index];
        setCustomerEditing(customerEditing);
    }

    let customerFilter = [...customers];
    if (keyword) {
        customerFilter = customers.filter((customer) => {
            return customer.name.toLowerCase().indexOf(keyword) !== -1
        })
    } else {
        customerFilter = customers;
    }

    function onClick(sortBy, sortValue) {
        setSortBy(sortBy);
        setSortValue(sortValue);
        customers.sort((a, b) => {
            if (a.name > b.name) return sortValue;
            else if (a.name < b.name) return -sortValue;
            else return 0;
        })
    }

    return (
        <div className="App">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col col-4">
                        {isDisplayForm === true ? <CustomerForm
                            onHandleSubmit={onHandleSubmit}
                            customerEditing={customerEditing}
                            closeForm={closeForm}
                        /> : ""}

                    </div>
                    <div className={isDisplayForm === true ? "col col-8" : "col col-12"}>
                        <div className="list-table">
                            <button className="btn btn-primary" onClick={onToggleForm}>Thêm nhân viên</button>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Sắp xếp
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" href="#" onClick={() => onClick('name', 1)}>Từ A->Z</a>
                                    <a className="dropdown-item" href="#" onClick={() => onClick('name', -1)}>Từ
                                        Z->A</a>
                                </div>
                            </div>
                            <input type="text" name="keyword" className="form-control"
                                   placeholder="Nhập tên cần tìm kiếm"
                                   onChange={(e) => setKeyword(e.target.value.toLowerCase())}/>
                            <CustomerList
                                customers={customerFilter}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
