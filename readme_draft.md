#README

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
all back-end action is driven by user interaction.

## Unsolved Problems

I originally intended to include more options for the user to customize the
front-end, i.e. a username separate from their email address, different colors,
and different symbols. The initial frameworks for these ideas can be seen in the
user objects.

There are also a few glitchy CSS/jQuery animations, most likely caused by the
ad-hoc and disorganized nature by which they were implemented. Ideally, I would
group them into functions like the top-bar animations to make them more
modular, organized, and keep the code cleaner and clearer.
