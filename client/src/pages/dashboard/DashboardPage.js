import React,{useEffect,useState} from 'react';
import { apiRequest } from '../../services/Axios';
import { showToast } from '../../helpers/NotifyHelper';
import { createSearchParams,useNavigate } from 'react-router-dom';

const DashboardPage = () => {

    const navigation = useNavigate();
    const [testData,setTestData] = useState([]);

    useEffect(()=>{
        getAllTestSeries();
    },[]);

    const getAllTestSeries = async () => {
        const response = await apiRequest('get','/tests/allTestSeries');
        if(response.resp) {
            setTestData(response.data);
        } 
        else {
            showToast({
                type: 'error',
                msg: response.msg
            });
        }
    }

    const startTest = (e,data) => {
        navigation({
            pathname: "/start",
            search: createSearchParams({
                id: data.id
            }).toString()
        });
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-8'>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Total Marks</th>
                            <th scope="col">Passing Marks</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                testData.map((data,index)=>(
                                    <tr key={index}>
                                        <th scope="row">{data.id}</th>
                                        <td>{data.name}</td>
                                        <td>{data.total_marks}</td>
                                        <td>{data.passing_marks}</td>
                                        <td>
                                            <button onClick={(e)=>startTest(e,data)} className='btn btn-success'>Start</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-md-2'></div>
            </div>
        </>
    )
}

export default DashboardPage