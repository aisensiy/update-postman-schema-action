# Update Postman Schema from File

A GitHub action to update postman api schema from a local schema file.

## Usage

```yml
      - name: Updae Schema from File
        uses: aisensiy/update-postman-schema-action@master
        with:
          postman-key: ${{ secrets.POSTMAN_KEY }}
          postman-api-id: "xxx"
          postman-api-version: "xxx"
          postman-api-schema-id: "xxx"
          schema-filepath: ./schema.graphql
```

### Action inputs

| Name | Description | Default |
| --- | --- | --- |
| `postman-key` | (**required**) Postman API key. | |
| `postman-api-id` | (**required**) Postman API id. | |
| `postman-api-version` | (**required**) Postman API version. | |
| `postman-api-schema-id` | (**required**) Postman schema id. | |
| `schema-filepath` | (**required**) The file path contain schema content. | |
| `postman-schema-language` | (**required**) Allowed languages are json and yaml for OpenAPI and RAML schema types. GraphQL schema type accepts only graphql language. | graphql |
| `postman-schema-type` | (**required**) Postman API schema type, allowed types are openapi3, openapi2, openapi1, raml and graphql. | graphql |

### Outputs

No outputs

## License

MIT License - see the [LICENSE](LICENSE) file for details
