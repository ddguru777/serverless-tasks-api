
import Joi from '@hapi/joi';
import uuidv4 from 'uuid';

const tasksModel = (data) => {
    const validationError = Joi.validate(data, {
        name: Joi.string().required()
    }).error;

    if(validationError !== null) {
        throw validationError;
    }

    const timestamp = new Date().getTime();
    
    const item = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuidv4(),
          name: data.name,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
    };
    
    return item;
}

export default tasksModel;