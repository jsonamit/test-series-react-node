import React,{ useState,useEffect } from 'react';
import './startTest.css';
import { apiRequest } from '../../services/Axios';
import { showToast } from '../../helpers/NotifyHelper';
import { useSearchParams,useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StartTestSeries = () => {

    const navigation = useNavigate();
    const user = useSelector(state => state.user);
    const [testData,setTest] = useState();
    const [searchParams] = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState({});

    useEffect(() => {
        getTestSeries(searchParams.get("id"));
    }, [searchParams]);

    const getTestSeries = async (testId) => {
        
        const response = await apiRequest('get',`/tests/start/${testId}`);

        if(response.resp) {
            setTest(response.data);
        } 
        else {
            showToast({
                type: 'error',
                msg: response.msg
            });
        }
    }

    const handleOptionChange = (questionId, selectedValue,index) => {
        setSelectedOptions({
          ...selectedOptions,
          [questionId]: selectedValue,
        });

        testData.test_series_has_questions[index].question.selected = true;
        testData.test_series_has_questions[index].question.answer = selectedValue;

        setTest(testData);
    };

    const onSubmitTest = async () => {
        let params = {
            user_id: user.id,
            test_id: testData.id,
            data: testData.test_series_has_questions
        }
        const response = await apiRequest('post','/tests/submitTest',params);

        if(response.resp) {
            showToast({
                type: 'success',
                msg: 'Your test submitted successfully'
            });
            navigation('/dash');
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
        <div className='row'>
            <div className='col-md-12 text-right mt-4'>
                <button className='btn btn-primary mr-4' onClick={onSubmitTest}>Submit</button>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
                {testData && testData.test_series_has_questions.map((data, index) => (
                    <div className="question-container mb-2" key={index}>
                    <h5 className="question">{data.question.question}</h5>
                    <div className="options">
                        <label className="option">
                            <input
                                type="radio"
                                name={`option-${data.question.id}`}
                                value={data.question.option1}
                                checked={selectedOptions[data.question.id] === data.question.option1}
                                onChange={() => handleOptionChange(data.question.id, data.question.option1,index)}
                            />
                            <span>{data.question.option1}</span>
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name={`option-${data.question.id}`}
                                value={data.question.option2}
                                checked={selectedOptions[data.question.id] === data.question.option2}
                                onChange={() => handleOptionChange(data.question.id, data.question.option2,index)}
                            />
                            <span>{data.question.option2}</span>
                        </label>
                            <label className="option">
                            <input
                                type="radio"
                                name={`option-${data.question.id}`}
                                value={data.question.option3}
                                checked={selectedOptions[data.question.id] === data.question.option3}
                                onChange={() => handleOptionChange(data.question.id, data.question.option3,index)}
                            />
                            <span>{data.question.option3}</span>
                        </label>
                        <label className="option">
                            <input
                                type="radio"
                                name={`option-${data.question.id}`}
                                value={data.question.option4}
                                checked={selectedOptions[data.question.id] === data.question.option4}
                                onChange={() => handleOptionChange(data.question.id, data.question.option4,index)}
                            />
                            <span>{data.question.option4}</span>
                        </label>
                    </div>
                    </div>
                ))}
            </div>
            <div className='col-md-2'></div>
        </div>
    </>
  )
}

export default StartTestSeries