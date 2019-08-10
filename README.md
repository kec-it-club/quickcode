# Quick Code

Quick Code is basically IT Quiz developed on top of Node.js and Socket to allow the exectuive members of KEC IT Club to act as Quiz Master conducting the quiz and hanling the JSON files to be loaded for a particular quiz id and participant are allowed to enter the quiz using the same id.

<p align="center">
    <a href="https://github.com/kec-it-club/quickcode" target="_blank"><img src="https://i.imgur.com/d2Zktkc.png" height="330"/></a>
</p>

## Installation

**Install **[git](https://git-scm.com/)** and **[node.js](https://nodejs.org/)**.**

**Clone the source locally:**

```
$ git clone https://github.com/kec-it-club/quickcode
$ cd quickcode
```

**Install required node dependencies:**

```
$ yarn
```

**Open in development mode:**

```
$ node server
```

## Roles

* **Quizmaster** instantiates and conducts the quiz session whith manually counting the timer of 10 seconds. Questions are selected by the quizmaster. After some time, the quizmaster will reveal the correct solution for a given quiz question and present a compilation of the answers provided by the quiz participants.
  
* **Participants** can each provide one answer to the presented question. When the correct solution is revealed, each participant will get individual feedback whether the question was answered correctly.

## Components

The quiz system is comprised of several components that support diverging use cases and roles.

### The quiz editor

Before any quizzes can be conducted, a collection of questions ("a quiz") has to be assembled. This is done in the **editor**, which is available, by default, at `http://localhost:3000/editor`.

A quiz can contain questions of the following types:

 * **Users choose between text options**: The question is accompanied by predetermined text options that participants can select from. One text option is the correct answer, the remaining options represent incorrect answers.
 * **Users mark positions in an image**: The question is accompanied by an image. Each participant can mark one position in the image by clicking in that respective spot. When revealing, the quizmaster will receive a display of all positions marked by the participants in the form of a cloud of points.

### The quizmaster view

With the **quizmaster view**, quizzes can be started and controlled. The contents of the quiz are loaded from a JSON file previously created in the editor. The quizmaster view is available, by default, at `http://localhost:3000/quizmaster`. When entering the quizmaster view, the system prompts for a name for this quiz instance to differentiate quizzes that are run concurrently.

If you want to restrict usage of the quizmaster view only to selected users, it is possible to password-protect this view by starting the Crowd Quiz server with respective command line arguments.

### The participant view

Participants will use the **participant view** to join a quiz currently running and submit answers. The participant view is available, by default, at `http://localhost:3000/`. When entering the participant view, users can select a quiz from a list of currently active quizzes.

## Contributing

1. Fork it (<https://github.com/kec-it-club/quickcode/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request