class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    sayHello() {
        return "Hello, my name is " + this.name + " and I am " + this.age + " years old.";
    }
}

const person1 = new Person("Abhi", 25);
const person2 = new Person("Siya", 30);
const person3 = new Person("Rohan", 22);

console.log(person1.name);
console.log(person1.age);
console.log(person1.sayHello());

console.log(person2.name);
console.log(person2.age);
console.log(person2.sayHello());

console.log(person3.name);
console.log(person3.age);
console.log(person3.sayHello());
