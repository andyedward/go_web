package main

import (
	"github.com/mitchellh/mapstructure"
	r "gopkg.in/gorethink/gorethink.v3"
)

func addChannel(client *Client, data interface{}) {
	var channel Channel

	err := mapstructure.Decode(data, &channel)
	if err != nil {
		client.send <- Message{"error", err.Error()}
		return
	}
	go func() {
		if err := r.Table("channel").Insert(channel).Exec(client.session); err != nil {
			client.send <- Message{"error", err.Error()}
		}
	}()

}
