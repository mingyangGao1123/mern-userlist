import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
import  {addUser}  from '../../actions/adduser';
import * as yup from "yup";
import './style.css';

const CreateSchema = yup.object().shape({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  age: yup
    .number()
    .required()
    .positive()
    .integer(),
    password: yup.string().required('Password is required'),
    repeat: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

function AddUser(props) {
  const {register, handleSubmit, errors} = useForm({mode:'onChange', validationSchema: CreateSchema});
  const { dispatch } = props;
  const onSubmit =async data => {
    await dispatch(addUser(data)); 
    //console.log(data); 
    props.history.push("/");};

  return(
    <div>
      <h2 align="center" >Create User</h2>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input name="firstname"  ref={register({required:true, pattern: /^[A-Za-z]+$/i})} />
      {errors.firstname && <p>{errors.firstname.message}</p>}

      <label>Last Name</label>
      <input name="lastname"  ref={register({required:true, pattern: /^[A-Za-z]+$/i})} />
      {errors.lastname && <p>{errors.lastname.message}</p>}

      <label>Sex</label>
      <select name='sex'ref={register({required:true})}>
        <option value='male'>male</option>
        <option value='female'>female</option>
      </select>
      {errors.sex && <p>{errors.sex.message}</p>}

      <label>Age</label>
      <input name="age" type="number" ref={register({required: true})} />
      {errors.age && <p>{errors.age.message}</p>}

      <label>Password</label>
      <input type='password' name="password" ref={register({ required: true  })} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat Password</label>
      <input type='password' name="repeat" ref={register({ required: true  })} />
      {errors.repeat && <p>{errors.repeat.message}</p>}
      
      <button type="submit" disabled={errors.firstname||errors.lastname||errors.sex||errors.age||errors.password||errors.repeat} >Create User</button>
  </form>
  </div>
  )
}

  const mapStateToProps = state => {
    return {
      adduser: state.adduser
    };
  };

  export default connect(mapStateToProps)(AddUser);
