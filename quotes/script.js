// заменить одинарные кавычки на двойные

// var str = `'It's an interesting english text, which is called 'woderful text''`
// str = str.replace(/'/g, '"');
// console.log(str);

// заменить одинарные кавычки на двойные, исключая апострофы

var str = `One: 'Hi Mary.' Two: 'Oh, hi.'
One: 'How are you doing?'
Two: 'I'm doing alright. How about you?'
One: 'Not too bad. The weather is great isn't it?'
Two: 'Yes. It's absolutely beautiful today.'
One: 'I wish it was like this more frequently.'
Two: 'Me too.'
One: 'So where are you going now?'
Two: 'I'm going to meet a friend of mine at the department store'
One: 'Going to do a little shopping?'
Two: 'Yeah, I have to buy some presents for my parents.'
One: 'What's the occasion?'
Two: 'It's their anniversary.'
One: 'That's great. Well, you better get going. You don't want to be late.'
Two: 'I'll see you next time.'
One: 'Sure.' Bye.'`

// заменяет кавычки в начале слова
// var regexp = /\B'/g
// console.log(str.replace(regexp, '"'));

// заменяет кавычки в конце слова
// var regexp = /'\B/g
// console.log(str.replace(regexp, '"'));

//таким образом исключаются апострофы внутри слова (It's)

// более цивильный вид
str = str.replace(/\B'|'\B/g, '"');
console.log(str);

//разве что не знаю, как быть с апострофами на конце слова у притяжательной формы во множественном числе
//например, students'
//ибо такой апостроф данный паттерн заменит на двойную кавычку
