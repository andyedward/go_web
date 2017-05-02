package main

import (
	"fmt"
	"github.com/mitchellh/mapstructure"
	r "gopkg.in/gorethink/gorethink.v3"
)

const (
	ChannelStop = iota
	UserStop
	MessageStop
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

func subscribeChannel(client *Client, data interface{}) {
	stop := client.NewStopChannel(ChannelStop)
	result := make(chan r.ChangeResponse)
	cursor, err := r.Table("channel").
		Changes(r.ChangesOpts{IncludeInitial: true}).
		Run(client.session)
	if err != nil {
		client.send <- Message{"error", err.Error()}
	}

	go func() {
		var change r.ChangeResponse
		for cursor.Next(&change) {
			result <- change
		}
	}()

	go func() {
		for {
			select {
			case <-stop:
				fmt.Println("closing subscribe channel")
				cursor.Close()
				return
			case change := <-result:
				if change.NewValue != nil && change.OldValue == nil {
					client.send <- Message{"channel add", change.NewValue}
					fmt.Println("sent channel add msg")
				}
			}
		}
	}()
}

func unsubscribeChannel(client *Client, data interface{}) {
	client.StopForKey(ChannelStop)
}
