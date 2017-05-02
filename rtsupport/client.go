package main

import (
	"github.com/gorilla/websocket"
	r "gopkg.in/gorethink/gorethink.v3"
)

type FindHandler func(string) (Handler, bool)

type Client struct {
	send        chan Message
	socket      *websocket.Conn
	findHandler FindHandler
	session     *r.Session
}

type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

func (client *Client) Read() {
	var message Message
	for {
		if err := client.socket.ReadJSON(&message); err != nil {
			break
		}
		// what function to call
		if handler, found := client.findHandler(message.Name); found {
			handler(client, message.Data)
		}

	}
	client.socket.Close()
}

func (client *Client) Write() {
	for msg := range client.send {
		//TODO: socket.sendJSON(msg)
		if err := client.socket.WriteJSON(msg); err != nil {
			break
		}
	}
	client.socket.Close()
}

func NewClient(socket *websocket.Conn, findHandler FindHandler, session *r.Session) *Client {
	return &Client{
		send:        make(chan Message),
		socket:      socket,
		findHandler: findHandler,
		session:     session,
	}
}