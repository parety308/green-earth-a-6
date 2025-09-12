
#### 1 What is the difference between var, let, and const?
Ans:var::
      1.Old way to declare variables (before ES6).
      2.Function-scoped,hoisted 
      3.Can be re-declared and re-assigned.
 let::
      1.Introduced in ES6.
      2.Block-scoped ,Also hoisted, but not initialized 
      3.Can be re-assigned, but cannot be re-declared in the same scope
 const::
      1.Introduced in ES6.
      2.Block-scoped, like let.
      3.Cannot be re-assigned or re-declared.
      4.Must be initialized when declared.        
#### 2 What is the difference between map(), forEach(), and filter()? 
forEach()::
          1.Loops through each element of an array.
          2.Does NOT return anything (undefined).
          3.Mainly used for side effects (like logging, modifying external variables).
map()::
          1.Loops through each element and returns a new array.
          2.Great for transforming data.
filter()::
          1.Loops through each element and returns a new array with elements that pass a test.
          2.Great for selecting certain items.

#### 3 What are arrow functions in ES6?
Arrow functions (=>)
    1.Shorter syntax for writing functions.
    2.Implicit return for single expressions.
    3.this is taken from the surrounding scope.
    4.Use them for cleaner and shorter functions.
#### 4 How does destructuring assignment work in ES6?
1.Array destructuring → assign elements of an array to variables.
2.Object destructuring → assign properties of an object to variables.
3.You can also set default values.
#### 5 Explain template literals in ES6. How are they different from string concatenation?
Template Literals (ES6)
1.Strings enclosed in backticks ` instead of quotes.
2.Allow embedded expressions using ${…}.
3.Support multi-line strings easily.

Difference from string concatenation:
1.Concatenation: uses + to join strings → messy with variables.
2.Template literals: embed variables directly → cleaner and easier to read.