
//const config = require('./config/config');
import * as response from './util/response';

import dynamodb from './services/dynamodb';
import TasksService from './services/tasks';

const tasksService = new TasksService();

export const create = (event, context, callback) => {
  try {
    const data = JSON.parse(event.body);

    let result = tasksService.addTasks(data);

    callback(null, response.ok({ data: result }));
  } catch(err) {
    callback(err, response.serverError(err));
  }  
};

// export const list = (event, context, callback) => {
//     const params = {
//       TableName: process.env.DYNAMODB_TABLE,
//     };
  
//     // fetch all tasks from the database
//     dynamodb.scan(params, (error, result) => {
//       // handle potential errors
//       if (error) {
//         console.error(error);
//         callback(null, {
//           statusCode: error.statusCode || 501,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Couldn\'t fetch the task item.',
//         });
//         return;
//       }
  
//       // create a response
//       const response1 = {
//         statusCode: 200,
//         body: JSON.stringify(result.Items),
//       };
//       callback(null, response1);
//     });
// };

export const triggerStream = (event, context, callback) => {
  try {  
    console.log('trigger stream was called');
    
    const data = event.Records[0];

    let result = tasksService.updateTasks(data);

    callback(null, null);
  } catch(err) {
    callback(err, response.serverError(err));
  }
};
