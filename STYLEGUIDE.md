# Styleguide for project

This is the styleguide used to set the programming standards for this project.

## Source files

### Folders

Folders should be named with all lowercase, and should be seperated with '-'

### Files

Files should be named with all lowercase, and should be seperated with '_'

## General Naming

### Functions

Function names should be using PascalCase:

```js
function MyFunction() {
    // Code
}
```

### Variables

Variable names should be using camelCase, and should be a const unless the variable is changed:

```js
const myVar = 10;

let myDynamicVar = 10;
++myDynamicVar;
```

## Conditionals

### If else

Consecutive related if-else statements are written directly below the previous statement

```js
if (condition) {
    // do something
}
else if (anotherCondition) {
    // do something
}
else {
    // do something
}
```

### Switch case

Procedures inside a case are indented once more than it's "case x:"

Default should always be at the bottom and contain a "break;" at the end

```js
switch (variable) {
    case x:
        // do something
        // no break;
    case y:
        // do something
        break;
    default
        // do something
        break;
}
```
