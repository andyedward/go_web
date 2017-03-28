package main

import (
	"fmt"
	//"math"
)

type Shape interface {
	area() float64
}

type Circle struct {
	radius float64
}

type Rectangle struct {
	width, height float64
}

func (c Circle) area() float64 {
	return c.radius * c.radius
}

func (r Rectangle) area() float64 {
	return r.width*2 + r.height*2
}

func measure(s Shape) {
	fmt.Println(s)
	fmt.Println(s.area())
}

func main() {
	c := Circle{10}
	r := Rectangle{3, 4}

	measure(c)
	measure(r)
}
