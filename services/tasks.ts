
import tasksModel from '../models/tasks';
import dynamodb from './dynamodb';

class TasksService {

    async addTasks(data) {
        try {
            const params = tasksModel(data);
            
            // write the task to the database
            const ret = await dynamodb.put(params, (error) => {

                // handle potential errors
                if (error) {

                    throw error;
                }

                return params.Item;
            });

            return ret;
        } catch(err) {
            throw err;
        }
    }

    async updateTasks(data) {
        try {
            if (data.eventName !== "INSERT") {
                return false;
            }

            const item = data.dynamodb.NewImage;
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
            const ret = await dynamodb.update(params, (error, result) => {
                // handle potential errors
                if (error) {
                    console.error(error);

                    throw error;
                }
            
                return result.Attributes;
            });

            return ret;
        } catch(err) {
            throw err;
        }
    }
}

export default TasksService;
