# a realtime collaborative post-it note app 
***

<!--![](./imgs/demo.gif)-->

<img src="https://raw.githubusercontent.com/ahsanazim/note_taking_app_react/master/imgs/demo.gif" height="600">

hosted at: `http://post-it.surge.sh/`


## Short general overview:

This post-it note app was built using React, with an emphasis on the use of separate components for separate parts of app functionality. 

Ultimately, the following component structure seemed best for our site's uses: 

```
App
|
|--> NoteCreateBar
|
`--> NoteContainer ---> Note
						|->  ...
						|->  ... 
						|->  ... 
```
***App*** - general state of the program, contains all other components

***NoteCreateBar*** - the textarea and button responsible for choosing title of a new note

***NoteContainer*** - container component holding all notes

***Note*** - individual note component, holds local state (for now, only whether you're currently editing the note or not)

## Extra Credit 

- **styling** (observable with the naked eye)
- **zIndex sorting**: note you're dragging gets popped to front
- **resizeable notes** (bottom right corner of note)