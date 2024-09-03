import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user/userAction';
import './LoginPage.css';
import { ValidateEmail }  from '../../helpers/ValidationHelper';
import { apiRequest } from '../../services/Axios';
import { showToast } from '../../helpers/NotifyHelper';

const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error,setErrors] = useState({});
    const [getFormData,setFormData] = useState({
        email: '',
        password: ''
    });

    const validateFormData = (formData) => {
        let errors = {};
        if(!formData.email) {
            errors.email = 'Email is required';
        }
        else if(!ValidateEmail(formData.email)) {
            errors.email = 'Email is invaild';
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

    const onSubmitLogin = async () => {
        let errors = validateFormData(getFormData);
        setErrors(errors);
        if(errors.length > 0) {
            return false;
        }
        let params = {
            ...getFormData
        }
        const response = await apiRequest('post','/user/login',params);

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
                        <h1>Logged In</h1>
                        <span>If you dont have account? <a href="/signup">Signup</a></span>
                    </div>
                    <div className="form">
                        <input type="email" name="email" onChange={handleChange} placeholder="Email" id="email" />
                        {
                            error.email && <span className='error'>{error.email}</span>
                        }
                        <input type="password" name="password" onChange={handleChange} placeholder="Password" id="password" />
                        {
                            error.password && <span className='error'>{error.password}</span>
                        }
                        <button onClick={onSubmitLogin}>Submit</button>
                    </div>
                    <div className="card_terms">
                        <input type="checkbox" name="" id="terms" /> <span>I have read and agree to the <a href="/login">Terms of Service</a></span>
                    </div>
                </div>
            </div>
        </>
    )
}



export default LoginPage