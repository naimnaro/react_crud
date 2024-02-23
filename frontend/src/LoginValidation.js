function validation(values) {
    let errors = {};

    // 이메일 유효성 검사
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{8,}$/;

    if (values.email === "") 
    {
        errors.email = "Email should not be empty";
    } 
    else if (!emailPattern.test(values.email)) 
    {
        errors.email = "Invalid email format";
    }
    else
    {
        errors.email = "";
    }

    // 비밀번호 유효성 검사
    
    if (values.password === "") 
    {
        errors.password = "Password should not be empty";
    } 
    else if (!passwordPattern.test(values.password)) 
    {
        errors.password = "Password must contain at least one digit, one lowercase letter, one uppercase letter, and be at least 8 characters long";
    }
    else
    {
        errors.password ="";
    }

    return errors;

}

export default validation;
