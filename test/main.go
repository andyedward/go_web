package main

import (
	"fmt"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type Message struct {
	Name string      `json:"name"`
	Data interface{} `json:"data"`
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func main() {

	http.HandleFunc("/", testHandler)
	http.ListenAndServe(":4005", nil)
}

func testHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	var message Message
	for {
		if err := conn.ReadJSON(&message); err != nil {
			fmt.Printf("%#v\n", err.Error())
			break
		}
		conn.WriteJSON(message)

	}

}
