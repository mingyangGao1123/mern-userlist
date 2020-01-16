import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form'
import  {editUser}  from '../../actions/edituser';
import * as yup from "yup";




const EditSchema = yup.object().shape({
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


function EditUser(props) {
  const {register, handleSubmit, errors} = useForm({mode:'onChange', validationSchema: EditSchema});
  const { dispatch } = props;
  const userDetail = props.location.state.userDetail;
  //console.log(userDetail);

  const onSubmit = data => {
    dispatch(editUser(userDetail._id, data, props.history)); 
    //console.log(data); 
    //props.history.push("/");
    //dispatch(getUsers());
    
  };



  return(
    <div>
    <h2 align="center">Edit User</h2>
    <form  onSubmit={handleSubmit(onSubmit)}>
      <label>First Name</label>
      <input name="firstname"  defaultValue={userDetail.firstname} ref={register({required:true, pattern: /^[A-Za-z]+$/i})} />
      {errors.firstname && <p>{errors.firstname.message}</p>}

      <label>Last Name</label>
      <input name="lastname"  defaultValue={userDetail.lastname} ref={register({required:true, pattern: /^[A-Za-z]+$/i})} />
      {errors.lastname && <p>{errors.lastname.message}</p>}

      <label>Sex</label>
      <select name='sex'   defaultValue={userDetail.sex} ref={register({required:true})}>
        <option value='male'>male</option>
        <option value='female'>female</option>
      </select>
      {errors.sex && <p>{errors.sex.message}</p>}

      <label>Age</label>
      <input name="age" type="number" defaultValue={userDetail.age}  ref={register({ min: 1, max: 100 })} />
      {errors.age && <p>{errors.age.message}</p>}

      <label>Password</label>
      <input type='password' name="password" ref={register({ required: true})} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>Repeat Password</label>
      <input type='password' name="repeat" ref={register} />
      {errors.repeat && <p>{errors.repeat.message}</p>}

      <button type="submit" disabled={errors.firstname||errors.lastname||errors.sex||errors.age||errors.password||errors.repeat}>Edit User</button>
  </form>
  </div>
  )
}

  const mapStateToProps = state => {
    return {
      edituser: state.edituser
    };
  };

  export default connect(mapStateToProps)(EditUser);