MVC follow principle of SoC(Separation of Concerns) by separating different parts of the application into distinct components like models, views, and controllers.
But still they are tightly integrated to work together to handle requests, process data, and render views and cannot work with different types of views which you want to use.
Due to tight coupling, complexity as application grows, difficult to make changes, limited reusability, and challenges in testing individual components in isolation.
The MVC pattern often leads to tight coupling between views and controllers, reducing their reusability. This could limit flexibility and customization, key requirements in a scenario where unique interfaces are being created.
API's provide loose coupling interface.
Types of APIs:-
1. SOAP (Simple Object Access Protocol) -> is very old. SOAP is not used much these days. SOAP is a technique to send data from server to client using XML format over HTTP, SMTP, TCP, etc to handle client requests. Data headers are heavy and makes SOAP slow.
2. REST (Representational State Transfer) -> is most popular these days. It uses HTTP methods and status codes, supports multiple data formats like JSON, XML, etc., and is stateless. It is lightweight and scalable and fast.
3. GraphQL -> is a query language for APIs that allows clients to request only the data they need. It provides flexibility and efficiency in data retrieval.
4. gRPC (Google Remote Procedure Call) -> is a high-performance RPC framework that uses Protocol Buffers for serialization. It is suitable for microservices architecture and supports multiple programming languages.

APIs enable seamless integration with diverse external systems regardless of client implementations.
APIs provide cross-platform compatibility, allowing different platforms and devices to interact with the same backend services through standardized interfaces, serving data to web, mobile, and IoT devices.
APIs aim for loose coupling to ensure flexibility, reusability, and ease of integration.
APIs do not guarantee faster response times as performance depends on various factors like network latency, server load, and data processing efficiency.
REST, SOAP, and GraphQL serve as API protocols for constructing backend APIs. They establish the guidelines and standards for communication between clients and servers, facilitating data exchange and interoperability.
RESTful API: (Representational State Transfer) is an architectural style for designing networked applications.
It relies on stateless, client-server communication, typically over HTTP, and uses standard HTTP methods (GET, POST, PUT, DELETE) to perform operations on resources identified by URLs. RESTful APIs are known for their simplicity, scalability, and ease of use, making them a popular choice for web services.
Data stored in server is either in database or in files which client can't understand directly.So 2 popular formats for sending data over RESTful APIs are JSON and XML. Representational state means representation of data not actual data present in database. It is what client get when it request for data from server.
Benefits of RESTful APIs:
1. Scalability: RESTful APIs are stateless, allowing servers to handle multiple requests independently, making it easier to scale applications horizontally.
2. Flexibility: RESTful APIs can handle various data formats (JSON, XML, etc.), making them adaptable to different client needs.
3. Simplicity: RESTful APIs use standard HTTP methods and status codes, making them easy to understand and implement.
4. Performance: RESTful APIs can be optimized for performance through caching and efficient data retrieval techniques.
5. Interoperability: RESTful APIs can be consumed by clients built on different platforms and technologies, promoting cross-platform compatibility.
6. Great support for caching: caching provide quicker response time and reduce server load.

REST Methods:-
1. GET: Get data from the server. To fetch details of a resource
2. POST: Send data to the server to create a new resource. To create a new resource on the server.
3. PUT: Update an existing resource on the server.
4. DELETE: Remove a resource from the server.
5. PATCH: Partially update an existing resource on the server.
Every request made to server contain URL, headers, data, methods, etc. Server process the request and send response back to client with status code, data, headers, etc.
One of the primary attributes of RESTful APIs is their capability to enable seamless integration with diverse platforms and systems. RESTful APIs enjoy extensive support across various types of platforms, facilitating smoother communication between servers and clients.
Backend API can be scaled independently without affecting the client. It becomes easier to replicate servers or add more resources to handle increased traffic since the server does not store client-specific information.
Implement caching to store the response of the particular section, reducing the need for constant database querying and provide faster responses.
Multiple server instances can be set up to distribute incoming requests and handle increased traffic efficiently.
RESTful APIs offer standardized interfaces, making it easier for third-party developers to interact with SaaS product. This approach ensures compatibility, scalability, and simplicity, fostering a smooth integration experience.
By implementing an authentication and authorization system with role-based aaccess control. Role-based user management grants specific editing permissions to team members based on their roles or responsibilities, limiting access to sensitive project files and ensuring authorized collaboration within the project management tool.

In a RESTful API, the flow of a request starts from the client to the server. The server then directs the request to the appropriate route. The route invokes the appropriate controller function, which may interact with the model to fetch or manipulate data. The controller then sends a response back to the client.
client -> server -> route -> controller -> model -> controller -> client

Securing Application:-
Why do we secure apps : How do we secure apps
For controlled access : Verify who user is (attempting to add, rate item before login)
Data Privacy          : Verify what users can access (only public data, friends can access data)

Authentication :-
Verifying user's identity.
Confirms that a user is who they claim to be.
Examples include verifying credentials, tokens.

Authorization :-
Granting or denying access to specific resources based on user's privileges.
Controls access to resource based on the user's privileges.
Examples include checking if the authenticated user has the permissions to access a resource.

Types of Authentication :-

1. Basic Authentication : Requires user's credentials on each request.

2. API Keys : API keys are provided by signing up users on developer portals.
Google gives an unique API key for user account which helps google to identify that, this user is making this request. Developers in google can sign up and they can access these API key, which allow access to google's resources.

3. OAuth : (Open Authentication) which is basically protocol to provide authentication using third party applications.
Third-party app integration.
Open Authentication protocol, where third-party library, third-party authentication system (like google account) is responsible for verifying if this user is valid or not. 
For example, relying on Facebook's authentication system offers enhaunced security, and compatibility with various devices and platforms, and increases user trust and familiarity with the Facebook brand.

4. JWT (JSON Web Token Authentication) : Creates a reusable token with option to refresh

ProductController
Get Products
Get one product
Add a product
Rate product
Filter product
Rate product
Add items to cart
Get items of cart
Remove items from cart

UserController
signup - Email, Name, Password, TypeOfUser (customer, seller)
signin - (Email, Password)

For clients to use APIs and make them easy to use, we need an API documentation tool. Documentation tool can help our clients understand what they can use API, how they can call APIs. All these details are provided in documentation.
Standard called OpenAPI tells how should document our APIs for our clients to make it easier for them to use the APIs. 
One of the popular tool to document API, is known as Swagger.
Swagger is implementation of specification, which helps you to implement documentation of APIs.
The purpose of API documentation is to provide a standardized description of APIs for servers, making it easier for clients to understand and use them effectively.
Swagger for cowin.gov -> API Setu
Swagger.json tells what API contains, what user can expect and what user need to provide.
In swagger.json, "in" -> inside body
Swagger UI is used in a Node.js API application to provide improved documentation and enhaunce consumer experience for APIs. It offers an interactive, user-friendly interface that allows consumers to understand and test API functionalities effectively.

The purpose of specifying security definiions in the Swagger JSON file is to define security mechanisms for API endpoints, enabling developers to enforce secure access using authentication methods like JWT tokens or API keys.

The swagger.serve middleware is used to serve the Swagger UI files.
The swagger.setup(apiDocs) is used to set up the Swagger UI with the provided JSON documentation from swagger.json.
In swagger 3.0, "host" is replaced by "servers" which allows for multiple server configuration.
OpenAPI 3.0 provides more options to specify components, such as model schemas and detailed media types, which allows for better documentation and handling of data in the API.
"parameters" object has been replaced by "requestBody" to specify the data sent in a request.
"servers" section allows to define different URLs for various environments.

CORS -> Cross Origin Resource sharing -> It's a browser security feature that controls how web pages can make requests to a different origin.
The purpose of CORS policy in API-based applications is to restrict API access to specific clients and prevent unauthorized requests from cross-origin applications. It ensures that only trusted clients, like specific web UI clients or mobile applications, are allowed to access the API while preventing others from doing so.
In a real world implementation, CORS policy is configured to allow access from specific trusted clients (e.g., specific web UI clients or mobile applications). This helps to secure the API and prevents unauthorized access, limiting it only to those clients you trust.

To handle errors that might occur in a function called from another function, use a try-catch block in the calling function (product.controller). This way, any error thrown by the model function can be caught and handled in the controller.
The catch block receives an error object that contains information about the error, including 1. the error message, 2. name of the error, and 3. a stack trace.