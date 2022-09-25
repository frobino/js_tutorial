# JS tutorial

Some examples showing how to write JS applications.
Execute by running:

```
cd <projectFoder>
node <appFile.js>
```

## hello-world-http

Simple http server example.
A node based js program to print helloworld via http.

## hello-world-json-http

Simple http based json server example.
A node based js program to send json via http.

## object-oriented

### class:

Show how to create a class with fields and methods
in different ways.

### simpleproj:

Simple OOP-like project in js (node)
A first project using Java-like OOP.

## socket-io-chat

Client-server application:

- client: html page with button used to trigger the send of message to server
- server: listen and prints the received msg
  - a socket.io server is created on top of the http server
  - the new io server is used to log connections/disconnections
  - a socket.io client is inserted in index.html, so a new client will
    connect every time a browser connects/talks to the server

## proj-folder-strcuture

Simple example showing how to structure classes in different folders (packages)
and how to import/export.
