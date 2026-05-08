Applications can have various types of data such as cartData, userData, productData, orderData. If they are stored in in-memory, after restart updated data gets vanished.
We need to make sure that this data is managed and stored properly. And also need to perform operations (such as updating data, creating, deleting data, etc) on that data.
The key vulnerability is the non-persistence of in-memory data, leading to potential data loss on server restarts or power loss.
Filesystems versus Database: File systems struggle with managing large volumes of data, scaling adequately, and ensuring efficient data retrieval. These limitations make database a superior alternative for data storage and management.
Database: is a software. It is a tool which allows you to store data inside it.
Types of Databases:-
1. Relational database,
2. NoSQL database,
3. Object-oriented database : store database in terms of objects.
4. Hierarchial database : hierarchial structure is managed.
schema -> is basically structure of how the data should look like.

Relational database:- id's are primary keys (PK) and foreign keys (FK). FK means that values in column maps to id's inside another table. Relational database have schema.
NoSQL database :- doesn't have any schema defined. Data stored in json format. It's a tool of storing unstructured data as we don't know what kind of information might be receiving. It gives flexible structure of storing data in application.
NoSQL database example:
Employee              Department
{_id:1,name:"John"}   {_id:1,name:"Finance"}
{_id:2,name:"Samual"} {_id:2,name:'Sales',manager:'Raman'}
{_id:2,name:"Samual",dept:{name:'Sales'}}

Difference between Relational and NoSQL Database:-
Relational database:
1. has strict schema/structure
2. data stored in row-column format
3. Predictable data
4. Performance issues while reading with large set of data and relationships -> data is distributed across multiple tables. While retrieving data, need to relate these tables, perform operations together on all these tables to retrieve data.
5. MySQL, Postgres, SQL Server
NoSQL:-
1. Schemaless
2. data stored in Json format
3. difficult to predict data
4. Better at reading from large data set as it supports complex nested structure.
5. MongoDB, DynamicDB, CouchDB.

Databases are software that persistently store data and support operations such as insertion, deletion, updating, and data retrieval. They use a schema to describe data organization. Databases can store a variety of data types, not limited to just text and numeric.
The Order table's "CustomerID" is a foreign key that links to the Customer table's primary key "ID". This establishes a many-to-one relationship, as a single customer can have many orders.
In social media platform with NoSQL database, each post can have multiple comments. Possible ways to relate comments to specific post are, 1. store each comment as a separate document with the post ID. 2. store each comment as a nested object inside the post document.

MongoDB Compass is a tool that provides a graphical user interface for visualizing and manipulating MongoDB data. It is not a command-line tool (CLI), a web application framework, or a cloud-based service.

"Table" in relational database is called "Collection" in NoSQL database.
"Row" in relational database is called "Document" in NoSQL database.
"Column" in relational database is called "Attribute" or "field" in NoSQL database.

install mongoDB community server
install mongodb compass

In mongodb compass, database -> collection name -> document name -> set of attributes.

Commands:-
mongosh
show dbs -> will show all the databases .
use bookdb -> switch to database "bookdb". "use" will not create any database, just switch to another existing database that have collections and documents.
db.books.insertOne({title:"Da Vinci Code", author:"Dan Brown", year:2003}) -> will create collection named "books" and attach document present inside curly bracket to that collection.
show dbs
show collections -> will show collections in our database.
db.books.insertMany([{title:"To kill a Mocking bird", author:"Harper Lee", year:1997}, {title:"Harry Potter Series", author:"J.K.Rowling", year:1997}]) -> will create multiple documents in the selected collection "books".
db.books.find() -> will show all the documents in the selected collection "books".
db.books.findOne({author:"Harper Lee"}) -> will show one document that matches first based on attribute given.
db.books.find({year:1997}) -> will show all documents that matches the given attribute.

ID generated is 12 bytes.
1st four byte -> timestamp.
2nd five byte -> unique machine details like machine ID, machine address.
3rd three byte -> counter.
combining these unique details gives unique ObjectID. It is very useful in databases.

mongosh -> is MongoDB's shell interface, a command-line tool that allows interaction with MongoDB databases.
use sales -> it either switches the context to an existing "sales" database or creates a "sales" database when data is first inserted.

insertMany() -> accepts an array of documents to insert multiple records into the collection at once.
insertOne() -> expects a single document, not an array.

Update operations:-
db.books.updateOne({title:"Da Vinci Code"},{$set:{author:"Daniel Brown"}}) -> will update specific fields of one document that matches first parameter attribute and second parameter attribute gets updated.
$set:{} -> is an operator not function which allows to update the attributes of documents.
db.books.updateMany({author:"J.K.Rowling"}, {$set:{year:2015}}) -> will update documents which matches attributes in first parameter and second parameter attributes are get updated.
replaceOne() -> replaces an existing document entirely with a new document.

Delete operations:-
db.books.deleteOne({title:"To Kill a mocking bird"}) -> will delete first document with matching attribute.
db.books.deleteMany({year:2015}) -> will delete multiple document with matching attribute.

db.books.deleteMany({}) -> will delete all documents in the collection.

Data Management Operations :-
1. Storing, updating and deleting data in a database.
2. Backing up data to an external storage device.
3. Performing data validation to ensure data integrity.
4. Retrieving data from a web API.

Node.JS to MongoDB connection: Node.js will behave like a client to mongodb database. Install mongodb client software inside our node.js application.

The primary purpose of the MongoDB driver in a Node.js application is to facilitate the connection between the application and a MongoDB server. This allows the Node.js application to interact with the database.

Managed MongoDB services on the cloud simplify database management tasks like scaling, backups, and security, reducing the operational overhead for developers.