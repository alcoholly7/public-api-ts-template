// From https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
const handler = async function (event: any, context: any) {
    console.log(`Event: ${JSON.stringify(event)}`)
    console.log("Successfully invoked the public API")

    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify("Successfully invoked the public API"),
    }
}

export { handler }
