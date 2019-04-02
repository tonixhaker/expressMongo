export const getValidationError = data =>{
    console.log(data);
    const { name,details } = data;
    return {
        name,
        message:details[0].message
    };
};