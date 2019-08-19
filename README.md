# Serverless REST API with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Tasks stored in a DynamoDB.
A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start --stage dev (optional)
```

## Usage

You can create tasks and update slug with triggerstream with the following commands:

### Create a Task

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/tasks --data '{ "name": "Serverless tasks 1" }'
```

Example Result:
```bash
{"data":"Task has been created."}%
```

### Update a Task (insert slug in the task record) with triggerstream

Automatically update when the task has been created.

No output

### List all Tasks

```bash
curl -H "Content-Type:application/json" http://localhost:3000/tasks
```

Example Result:
```bash
{"name": "Serverless tasks 1","createdAt": 1566211214272,"id": "ba343c00-c26d-11e9-a601-cd53305d4681","slug": "Serverless-tasks-1","updatedAt": 1566211214272}%
```