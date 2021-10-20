import * as core from '@actions/core'
import * as fs from 'fs'
import * as util from 'util'
import {inspect} from 'util'
import fetch from 'node-fetch'

async function run() {
  const inputs = {
    token: core.getInput('postman-key'),
    apiId: core.getInput('postman-api-id'),
    apiVersionId: core.getInput('postman-api-version'),
    schemaId: core.getInput('postman-api-schema-id'),
    schemaType: core.getInput('postman-schema-type'),
    schemaLanguage: core.getInput('postman-schema-language'),
    contentFilepath: core.getInput('schema-filepath')
  }
  core.debug(`Inputs: ${inspect(inputs)}`)

  // Check the file exists
  if (await util.promisify(fs.exists)(inputs.contentFilepath)) {
    // Fetch the file content
    const fileContent = await fs.promises.readFile(inputs.contentFilepath, {
      encoding: 'utf8'
    })

    // Send the request to the Postman API
    const url = `https://api.getpostman.com/apis/${inputs.apiId}/versions/${inputs.apiVersionId}/schemas/${inputs.schemaId}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': inputs.token
      },
      body: JSON.stringify({
        schema: {
          type: inputs.schemaType,
          language: inputs.schemaLanguage,
          schema: fileContent
        }
      })
    })

    const json = await response.json()

    core.info(`Update postman schema ${url} response: ${inspect(json)}`)

    if (response.status !== 200) {
      core.setFailed('The schema was not updated')
    }
    // Set output
    // core.setOutput('issue-number', issueNumber)
  } else {
    core.info(`File not found at path '${inputs.contentFilepath}'`)
    core.setFailed('The schema was not updated')
  }
}

run()
