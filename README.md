# EUREKA API

Restful api to manipulate the eureka database

### Prerequisites

A decent browser
A json formatter

### Resources

Typically this api works with the tables in the database as end point

Simple usage:

```
mutalldevs.co.ke/api/{table name}
The above example returns all records of the particular table in json format

eg:
http://mutalldevs.co.ke/api/client
will print all client details from the client table
```

## Routes

    GET     /{tablename}
    ```
    gets all values for the table
    ```
    GET     /{tablename}/{column}/{column_value}
    ```
    gets values of a table where {column name} = {column value}
    eg mutalldevs.co.ke/api/client/code/kh001

    This returns a client whose code is kh001
    ``
    GET     /{tablename}/job/{job number}
    ```
    These are custom queries or as we call them 'jobs' you may want an output out of
    This is still in alpha stage so it is buggy
    ```
    POST    /{tablename}
    ```
    Add a new record to table name supplied. In the request body you must supply key-value pairs for the record to be inserted.
    For testing use postman to do post, put and delete requests
    ```
    PUT     /{tablename}/{column}/{record_id}
    ```
    Update the record. Supply the new values in the request body
    Use postman to test your endpoints
    ```
    DELETE  /{tablename}/{column}/{record_id}
    ```
    Delete the record.
    Use postman to test your endpoints
    ```

## Deployment

This api can be used in any programming language that supports RESTful principles

## Built With

- [Express js](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Node js](https://maven.apache.org/) - The web server used
- [MySQL](https://rometools.github.io/rome/) - The database used

## Contributing

Please read [CONTRIBUTING.md](https://github.com/amshelhack3r/eureka_api) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Samuel Kanyi** - _Initial work_ - [amshelhack3r](https://github.com/amshelhack3r)

See also the list of [contributors](https://github.com/amshelhack3r/eureka_api/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Our Saviours STACKOVERFLOW :)
- NESCAFE cofee \* **for being my best friend**
