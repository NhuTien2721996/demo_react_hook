import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers';
import * as yup from "yup";

function CustomerForm({onHandleSubmit, customerEditing, closeForm}) {
    const schema = yup.object().shape({
        name: yup.string().required(),
        gender: yup.string().required(),
        age: yup.number().required(),
        address: yup.string().required(),
        room: yup.string().required(),
    });
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [room, setRoom] = useState('1');
    const {register, handleSubmit, errors} = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = event => {
        event.preventDefault();
        const formValue = {
            id: id,
            name: name,
            gender: gender,
            age: age,
            address: address,
            room: room
        };
        onHandleSubmit(formValue);
        clearForm()
    };

    function clearForm() {
        setId('');
        setName('');
        setGender('male');
        setAge('');
        setAddress('');
        setRoom('1')
    }


    useEffect(() => {
        // const {id, name, gender, age, address, room} = customerEditing;
        if (customerEditing) {
            setId(customerEditing.id);
            setName(customerEditing.name);
            setGender(customerEditing.gender);
            setAge(customerEditing.age);
            setAddress(customerEditing.address);
            setRoom(customerEditing.room);
        } else {
            setId('');
            setName('');
            setGender('male');
            setAge('');
            setAddress('');
            setRoom('1')
        }
    }, [customerEditing]);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Tên nhân viên</label>
                    <input type="text" className="form-control" name="name" onChange={(e) => setName(e.target.value)}
                           value={name} ref={register({required: true})}/>
                    <p>{errors.name?.message}</p>
                </div>
                <div className="form-group">
                    <label>Giới tính</label><br/>
                    <label><input type="radio" name="gender" value="male"
                                  onChange={(e) => setGender(e.target.value)}
                                  checked={gender === "male"} ref={register({required: true})}/>Nam</label>
                    <label><input type="radio" name="gender" value="women"
                                  onChange={(e) => setGender(e.target.value)}
                                  checked={gender === "women"} ref={register({required: true})}/>Nữ</label>
                    <p>{errors.gender?.message}</p>

                </div>
                <div className="form-group">
                    <label>Tuổi</label>
                    <input type="text" className="form-control" name="age" onChange={(e) => setAge(e.target.value)}
                           value={age} ref={register({required: true})}/>
                    <p>{errors.age?.message}</p>

                </div>
                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" name="address"
                           onChange={(e) => setAddress(e.target.value)}
                           value={address} ref={register({required: true})}/>
                    <p>{errors.address?.message}</p>

                </div>
                <div className="form-group">
                    <label>Phòng ban</label>
                    <select className="form-control" name="room" onChange={(e) => setRoom(e.target.value)}
                            value={room} ref={register({required: true})}>
                        <option>Phòng kế toán</option>
                        <option>Phòng nhân sự</option>
                    </select>
                    <p>{errors.room?.message}</p>

                </div>
                <button type="submit" className="btn btn-primary">Lưu</button>
                <button type="submit" className="btn btn-danger" onClick={closeForm}>Hủy</button>
            </form>
        </div>
    );
}

export default CustomerForm;
