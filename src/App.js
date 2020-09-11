import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./Components/Header";
import CustomerForm from "./Components/CustomerForm";
import CustomerList from "./Components/CustomerList";
import {connect} from "react-redux";
import * as actions from './actions/index'
function App({toggleForm,isDisplayForm,search,onSort}) {
    function onToggleForm() {
        toggleForm();
    }
    function onChange(keyword) {
        search(keyword);
    }
    function onClick(sort) {
        onSort(sort);
    }
    return (
        <div className="App">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col col-4">
                       <CustomerForm />

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
                                    <a className="dropdown-item" href="#" onClick={()=>onClick(1)} >Từ A->Z</a>
                                    <a className="dropdown-item" href="#" onClick={()=>onClick(-1)} >Từ
                                        Z->A</a>
                                </div>
                            </div>
                            <input type="text" name="keyword" className="form-control"
                                   placeholder="Nhập tên cần tìm kiếm"
                                   onChange={(e) => onChange(e.target.value)}/>
                            <CustomerList />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps=(state) =>{
    return {
        isDisplayForm:state.isDisplayForm
    }
};

const mapDispatchToProps=(dispatch, props) =>{
    return {
        toggleForm:()=>{
            dispatch(actions.toggleForm())
        },
        search:(keyword)=>{
            dispatch(actions.search(keyword))
        },
        onSort:(sort)=>{
            dispatch(actions.sort(sort))
        }
    }
};
export default (connect(mapStateToProps,mapDispatchToProps)) (App);
