import React, {useEffect, useState} from 'react';

import {connect} from "react-redux";
import * as actions from './../actions/index'

function CustomerForm({onSave, customerEditing, onCloseForm,isDisplayForm}) {
    // const schema = yup.object().shape({
    //     name: yup.string().required(),
    //     gender: yup.string().required(),
    //     age: yup.number().required(),
    //     address: yup.string().required(),
    //     room: yup.string().required(),
    // });
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [room, setRoom] = useState('1');
    // const {register, handleSubmit, errors} = useForm({
    //     resolver: yupResolver(schema)
    // });

    function onSubmit(event) {
        event.preventDefault();
        const customer = {
            id: id,
            name: name,
            gender: gender,
            age: age,
            address: address,
            room: room
        };
        onSave(customer);
        clearForm();
        closeForm();
    }

    function clearForm() {
        setId('');
        setName('');
        setGender('male');
        setAge('');
        setAddress('');
        setRoom('1')
    }

    function closeForm() {
        onCloseForm();
    }


    useEffect(() => {
        const {id, name, gender, age, address, room} = customerEditing;
        if (customerEditing) {
            setId(id);
            setName(name);
            setGender(gender);
            setAge(age);
            setAddress(address);
            setRoom(room);
        } else {
            setId('');
            setName('');
            setGender('male');
            setAge('');
            setAddress('');
            setRoom('1')
        }
    }, [customerEditing]);
    if (!isDisplayForm){
        return null;
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)}
                           value={name}/>
                </div>
                <div className="form-group">
                    <label>Giới tính</label><br/>
                    <label><input type="radio" name="gender" value="male"
                                  onChange={(e) => setGender(e.target.value)}
                                  checked={gender === "male"}/>Nam</label>
                    <label><input type="radio" name="gender" value="women"
                                  onChange={(e) => setGender(e.target.value)}
                                  checked={gender === "women"} />Nữ</label>

                </div>
                <div className="form-group">
                    <label>Tuổi</label>
                    <input type="text" className="form-control" name="age" onChange={(e) => setAge(e.target.value)}
                           value={age} />

                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" name="address"
                           onChange={(e) => setAddress(e.target.value)}
                           value={address} />

                </div>
                <div className="form-group">
                    <label>Phòng ban</label>
                    <select className="form-control" name="room" onChange={(e) => setRoom(e.target.value)}
                            value={room} >
                        <option>Phòng kế toán</option>
                        <option>Phòng nhân sự</option>
                    </select>

                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="submit" className="btn btn-danger" onClick={closeForm}>Hủy</button>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        customerEditing:state.customerEditing,
        isDisplayForm:state.isDisplayForm

    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSave: (customer) => {
            dispatch(actions.saveCustomer(customer))
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },

    }
};

export default (connect(mapStateToProps, mapDispatchToProps))(CustomerForm);
