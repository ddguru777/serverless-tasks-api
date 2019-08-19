'use strict';

//const config = require('./config/config');
//const response = require('./util/response');

const uuid = require('uuid');
const dynamodb = require('./services/dynamodb');

const create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    if (typeof data.name !== 'string') {
      console.error('Validation Failed');
      callback(null, {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the task item.',
      });
      return;
    }
  
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        name: data.name,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
  
    // write the task to the database
    dynamodb.put(params, (error) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t create the task item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(params.Item),
      };
      callback(null, response);
    });
};

const list = (event, context, callback) => {
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
    };
  
    // fetch all tasks from the database
    dynamodb.scan(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the task item.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
      callback(null, response);
    });
};

const triggerStream = (event, context, callback) => {
    console.log('trigger stream was called');
    const eventData = event.Records[0];

    if (eventData.eventName === "INSERT") {
        const item = eventData.dynamodb.NewImage;
        const slug = item.name.S.replace(/ /g, "-");

        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Key: {
                id: item.id.S,
            },
            UpdateExpression: "set slug = :p",
            ExpressionAttributeValues: {
                ":p": slug
            },
            ReturnValues:"UPDATED_NEW"
        };

        // update the task in the database
        dynamodb.update(params, (error, result) => {
            // handle potential errors
            if (error) {
                console.error(error);

                return;
            }
        
            console.log(result.Attributes);
            
        });
    }

    callback(null, null);
};

module.exports = {
    create,
    list,
    triggerStream
}