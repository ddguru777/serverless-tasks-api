// 'use strict';

// const TasksModel = require('../models/tasks');

// const uuid = require('uuid');
// const dynamodb = require('./dynamodb');

// function TasksService(opts) {
//     Object.assign(this, opts);
// }

// module.exports = TasksService;

// TasksService.prototype = {
//     addTasks
// }

// const addTasks = (data) => {
//     const timestamp = new Date().getTime();

//     if (typeof data.name !== 'string') {
//         // console.error('Validation Failed');
//         // callback(null, {
//         //   statusCode: 400,
//         //   headers: { 'Content-Type': 'text/plain' },
//         //   body: 'Couldn\'t create the task item.',
//         // });
//         // return;
//         return 'Validation Failed';
//     }

//     const params = {
//         TableName: process.env.DYNAMODB_TABLE,
//         Item: {
//           id: uuid.v1(),
//           name: data.name,
//           createdAt: timestamp,
//           updatedAt: timestamp,
//         },
//     };
    
//     // write the task to the database
//     dynamodb.put(params, (error) => {
//         // handle potential errors
//         if (error) {
//             // console.error(error);
//             // callback(null, {
//             //     statusCode: error.statusCode || 501,
//             //     headers: { 'Content-Type': 'text/plain' },
//             //     body: 'Couldn\'t create the task item.',
//             // });
//             // return;
//             return error;
//         }
    
//         // create a response
//         // const response = {
//         //     statusCode: 200,
//         //     body: JSON.stringify(params.Item),
//         // };
//         // callback(null, response);
//         return params.Item;
//     });
// }