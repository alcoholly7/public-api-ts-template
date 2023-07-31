import { S3 } from "aws-sdk"
import axios from "axios"

// From https://docs.aws.amazon.com/cdk/latest/guide/serverless_example.html
const handler = async function (event: any, context: any) {
    console.log(`Event: ${JSON.stringify(event)}`)
    console.log("Successfully invoked the public API")

    const privateAPIUrl = "https://b8v7mdb233.execute-api.ap-southeast-2.amazonaws.com/beta/"
    const response = await axios.get(privateAPIUrl)
    console.log("Response:", response.data)

    return {
        statusCode: 200,
        headers: {},
        body: JSON.stringify("Successfully invoked the public API"),
    }
}

export { handler }
