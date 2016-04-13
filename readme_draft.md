# README

## Technologies

I used HTML and CSS for the front-end styling. The cell animations and drop down
menues were created using CSS pseudo-classes, as well as jQuery selectors and
methods. The top-bar animations in particular were created by grouping commmon
jQuery and CSS actions into functions that were called on-click.

I tried to maintain modularity by creating a 'resources' file, where I would
store global variables and functions that were either being called in multiple
places in the file structure or where being assigned and used in different
places. I also created a 'users' file for the same purpose.

The backend interface uses Javascript, jQuery, and AJAX.

## Approach

My approach to this project was to create the front-end first, since
all back-end action is driven by user interaction. I tried to guide the user through the necessary sign-up/sign-in process by hiding the board until both players have signed in, and I hid the 'new game' and 'previous winner' buttons until at least one game has been played.

*[Wireframes](https://moqups.com/#!/edit/philschoof/6Oo0ssCT)

*User Stories

    * As a user, I want to know what cell I'm going to place my x or o in.
    * As a developer, I want to use pseudo-classes to animate the page to make the game more interactive
    * As a user, I want to be able to customize my game peice.
    * As a developer, I want to include a drop down menu of icon choices that willl update the user objects 'symbol' property.
    * As a user, I want to be able to restart a game at any time.
    * As a developer, I plan to have a new game button that when pushed will reset the game board

## Unsolved Problems

I originally intended to include more options for the user to customize the
front-end, i.e. a username separate from their email address, different colors,
and different symbols. The initial frameworks for these ideas can be seen in the
user objects.

There are also a few glitchy CSS/jQuery animations, most likely caused by the
ad-hoc and disorganized nature by which they were implemented. Ideally, I would
group them into functions like the top-bar animations to make them more
modular and organized, which would make the overall code cleaner and clearer.
