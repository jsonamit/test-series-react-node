module.validateMobile = (value = '') =>{

    let res = {
        msg: '',
        resp: 0
    };

    if(value == '') {
        res['msg'] = 'Mobile is missing';
        return res;
    }

    const regex = new RegExp("^(\+91[\-\s]?)?[6789]\d{9}$");
    if(!regex.test(value)) {
        res['msg'] = 'Invalid mobile no.';
        return res;
    }

    res['resp'] = 1;    
    return res;
}