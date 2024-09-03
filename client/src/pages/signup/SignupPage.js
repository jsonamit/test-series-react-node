import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user/userAction';
import { useNavigate } from 'react-router-dom';
import { ValidateEmail }  from '../../helpers/ValidationHelper';
import { apiRequest } from '../../services/Axios';
import './SignupPage.css';
import { showToast } from '../../helpers/NotifyHelper';

function SignupPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error,setErrors] = useState({});
    const [getFormData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const validateFormData = (formData) => {
        let errors = {};
        if(!formData.email) {
            errors.email = 'Email is required';
        }
        else if(!ValidateEmail(formData.email)) {
            errors.email = 'Email is invaild';
        } 
        else if(!formData.name) {
            errors.name = 'Name is required';
        }
        else if(!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...getFormData,
            [name]: value,
        });
    };

    const onSubmitSignup = async () => {
        let errors = validateFormData(getFormData);
        setErrors(errors);
        if(errors.length > 0) {
            return false;
        }
        let params = {
            ...getFormData
        }
        const response = await apiRequest('post','/user/signup',params);
        if(response.resp) {
            let user = {
                id: response.data.id,
                name: response.data.name,
                mobile: response.data.mobile,
                email: response.data.email,
                token: response.data.token
            }
            localStorage.setItem('token',response.data.token);
            dispatch(setUser(user));
            navigate('/dash');
        } 
        else {
            showToast({
                type: 'error',
                msg: response.msg
            });
        }
    }

    return (
        <>
             <div className="container-fluid">
                <div className="card">
                    <div className="card_title">
                        <h1>Create Account</h1>
                        <span>Already have an account? <a href="/login">Sign In</a></span>
                    </div>
                    <div className="form">
                        <input type="text" name="name" onChange={handleChange} id="name" placeholder="name" />
                        {
                            error.name && <span className='error'>{error.name}</span>
                        }
                        <input type="email" name="email" onChange={handleChange} placeholder="Email" id="email" />
                        {
                            error.email && <span className='error'>{error.email}</span>
                        }
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" id="password" />
                        {
                            error.password && <span className='error'>{error.password}</span>
                        }
                        <button onClick={onSubmitSignup}>Sign Up</button>
                    </div>
                    <div className="card_terms">
                        <input type="checkbox" name="" id="terms" /> <span>I have read and agree to the <a href="/">Terms of Service</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupPage