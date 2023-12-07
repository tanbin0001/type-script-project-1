 
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err : any) : TGenericErrorResponse => {
    console.log(err);

    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = Math && match[1];

    const errorSources :TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exists`
    }]

      
    const  statusCode = 400;
    return  {
        statusCode,
        message : 'Invalid ID',
        errorSources
        
    }
}

export default handleDuplicateError;