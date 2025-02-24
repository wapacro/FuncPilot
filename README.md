<img align="left" width="300" src="https://user-images.githubusercontent.com/11590853/232176109-a2a3a733-2651-4a7d-9cc0-c363f58bc192.png">

**FuncPilot** is a project brought to life by the introduction of the new [Node Programming Model in Azure Functions](https://techcommunity.microsoft.com/blog/appsonazureblog/azure-functions-node-js-v4-programming-model-is-generally-available/3929217). Thanks to the improvements in the new programming model, this project aims to provide a
solid structure for your Node function apps written in TypeScript while offering frequently used services and components
with a first-class developer experience, inspired and known from great frameworks
like [Laravel](https://laravel.com), [Adonis](https://adonisjs.com) and similar.

> :warning: **Warning:** This project is currently in Alpha stage. Do not use it in production environments.

## Get Started

In order to locally develop and run your code using **FuncPilot** make sure you
have **[Node.js v18 or above](https://nodejs.org)** as well as the
**[Azure Functions Core Tools v4.0.5095 or above](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Clinux%2Ccsharp%2Cportal%2Cbash)**
installed and configured. Once you are ready:

1. [Use this repository as a template](https://github.com/wapacro/FuncPilot/generate) to create your own Function App
   based on **FuncPilot** and clone the new repository to your local machine
   ```shell
   $ git clone https://github.com/{YourName}/{YourProject}
   ```
2. Create a `local.settings.json` file based on the provided example file (or bring your own)
   ```shell
   $ mv example.settings.json local.settings.json
   ```
3. Define the routes aka functions within your Function App in the provided routes file under `src/routes/api.ts`
   ```typescript
   export default function (route: Route) {
     route.get('/hello', [HelloController, 'index'])
   }
   ```
4. Create corresponding controllers under `src/app/Http/Controllers` to handle invocations of your functions
   ```typescript
   export default class HelloController extends BaseController {
    
     public async index(request: HttpRequest): Promise<HttpResponseInit> {
       const name = request.query.get('name')

       return {
         status: 200,
         jsonBody: {
           message: name ? `Hello, ${name}!` : 'Hello World!'
         }
       }
     }

   }
   ```
5. Build and run the Function App locally to test if everything works
   ```shell
   $ npm run start
   ```