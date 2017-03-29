package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"strconv"
	"time"
)

func main() {
	var answer, msg string
	var question string
	var maxAttemps uint8 = 6
	var attempts uint8 = 1
	var noOfDigits int = 4
	var win bool = false
	var lose bool = false
	var slice = make([]string, noOfDigits)
	var n *big.Int
	var err error
	max := *big.NewInt(99999999999)

	slice = []string{"", "", "", ""}
	question = createQuestion(noOfDigits, slice)
	fmt.Println("question is :", question)

	for {
		fmt.Printf("Attempt #%d. Guess the numbers: ", attempts)
		fmt.Scanf("%s\n", &answer)
		fmt.Printf("You guess %s in attempt #%d\n", answer, attempts)
		win, msg = check(answer, question)
		attempts++
		fmt.Println(msg)
		if win {
			break
		}

		if attempts == maxAttemps {
			lose = true
			fmt.Println("You Lose. The answer is: ", question)
		}

		if lose {
			break
		}

	}
}

func check(answer string, question string) (bool, string) {
	if answer == question {
		return true, "You Guess Correctly. You Win"
	} else {
		var ans []string
		status1 := make(map[int]int, 4)
		status2 := make(map[int]int, 4)
		status3 := make(map[int]int, 4)
		state := make(map[int]string, 4)

		for i := 0; i <= len(answer)-1; i++ {
			ans = append(ans, string(answer[i]))
		}
		var quest []string
		for i := 0; i <= len(question)-1; i++ {
			quest = append(quest, string(question[i]))
		}
		for i := 0; i < len(ans); i++ {
			status1, status2, status3 = compare(i, ans[i], quest, status1, status2, status3)
		}
		fmt.Println(status1, status2, status3)

		for _, v := range status1 {
			state[v] = "_"
		}
		for _, v := range status2 {
			state[v] = "O"
		}
		for _, v := range status3 {
			state[v] = "X"
		}

		fmt.Println(state)

		fmt.Println(ans)
		fmt.Print("[")
		for k := 0; k <= 3; k++ {
			if k == 3 {
				fmt.Print(state[k])
			} else {
				fmt.Print(state[k], " ")
			}
		}
		fmt.Println("]")

		//fmt.Println(ans, quest)
		return false, "Not the right answer"
	}

}

func compare(slicePos int, answerSlice string, question []string, status1 map[int]int, status2 map[int]int, status3 map[int]int) (map[int]int, map[int]int, map[int]int) {
	//CHECK STATUS 1 -> WRONG LOCATION BUT GOT THE NUMBER
	//CHECK STATUS 2 -> CORRECT LOCATION AND GOT THE NUMBER
	//CHECK STATUS 3 -> WRONG NUMBER
	for i := 0; i < len(question); i++ {
		if answerSlice == question[i] {
			status1[i] = slicePos
		}
		if answerSlice == question[i] && slicePos == i {
			status2[i] = i
		}
	}
	var found bool = false
	for i := 0; i < len(question); i++ {
		if answerSlice == question[i] {
			found = true
		}
	}
	if !found {
		status3[slicePos] = slicePos
	}
	return status1, status2, status3
}

func createQuestion(noOfDigits int, slice []string) string {
	var buffer string

	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1)
	newNumber := r1.Intn(9)

	fmt.Println(slice)
	//for {
	for i := 0; i < noOfDigits; i++ {
		newNumber = generateNewNumber(newNumber, slice)
		fmt.Println(newNumber)
		if strconv.Itoa(newNumber) == slice[i] {
			fmt.Println(newNumber, " equals ", slice[i])
			createQuestion(noOfDigits, slice)
		} else {
			fmt.Println(newNumber, " not equals ", slice[i])
			if slice[i] == "" {
				slice[i] = strconv.Itoa(newNumber)

			}
		}
	}
	fmt.Println(slice)
	//if arrayFilledUp(slice, noOfDigits) {
	//	break
	//}
	//}

	for _, v := range slice {
		buffer += v
	}
	return buffer
}

func generateNewNumber(newNumber int, slice []string) int {
	fmt.Println(newNumber, slice)
	var newNumber2 int
	for _, v := range slice {
		if strconv.Itoa(newNumber) == v {
			//Generate a new number please
			//s1 := rand.NewSource(time.Now().UnixNano())
			//r1 := rand.New(s1)

			n, err = rand.Int(rand.Reader, &max)
			fmt.Println("newnumber2 - ", n)
			newNumber2 = r1.Intn(9)
			generateNewNumber(newNumber2, slice)
			break
		} else {
			//
			fmt.Println(newNumber, slice, "not exists")
			return newNumber
		}
	}
	return 0
}

func arrayFilledUp(slice []string, noOfDigits int) bool {
	for i := 0; i < noOfDigits; i++ {
		if slice[i] == "" {
			return false
		}
	}
	return true
}
