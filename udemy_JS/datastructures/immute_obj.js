function test() {

    // meal record or meal object which is immutable
    const meal = {
        id: 1,
        description: 'breakfast',
    };
    console.log('Meal : ' + JSON.stringify(meal));

    const updatedmeal = {...meal, calories: 200, };
    console.log('updatedmeal : ' + JSON.stringify(updatedmeal));

    // const updatedmealImmutableVal = {
    //    id: 2, 
    //    calories: 400,
    // }
    // console.log('updatedmealImmutableVal : ' + JSON.stringify(updatedmealImmutableVal));

    // const combineMeal = {...updatedmealImmutableVal, ...updatedmeal};
    // console.log('combineMeal : ' + JSON.stringify(combineMeal));

    const {description, calories} = updatedmeal;
    console.log(description, calories);

    //Destructuring & Rest Operator
    const {id, ...mealWithoutId} = updatedmeal;
    console.log(JSON.stringify(mealWithoutId))    
}

function testAnother() {
    function applyAndNew(constructor, args) {
        function partial() {
            //console.log('4. When does it come here');
            return constructor.apply(this, args);
        }
        
        //console.log('2. Type of Constructor Prototype : ' + constructor.prototype);
        if (typeof constructor.prototype === 'object') {
            console.log('3. Does it come here');
            //partial.prototype = Object.create(constructor.prototype);
            partial.prototype = constructor.prototype;
        }
        return partial;
    }

     function myConstructor() {
         console.log('1. My Arguments : ' + arguments.length);
         console.log(arguments);
         this.prop1 = 'val1';
         this.prop2 = 'val2';
     };

     var myArguments = ['Hi', 'How', 'are', 'you', 'mr', null];
     var myConstructorWithArguments = applyAndNew(myConstructor, myArguments);
     console.log(new myConstructorWithArguments);
}

function testAnotherA() {
    function applyAndNew(constructor, args) {
        function partial () {
           return constructor.apply(this, args);
        };
        if (typeof constructor.prototype === "object") {
           partial.prototype = Object.create(constructor.prototype);
        }
        return partial;
     }
     
     
     function myConstructor () {
        console.log("arguments.length: " + arguments.length);
        console.log(arguments);
        this.prop1="val1";
        this.prop2="val2";
     };
     
     var myArguments = ["hi", "how", "are", "you", "mr", null];
     var myConstructorWithArguments = applyAndNew(myConstructor, myArguments);
     
     console.log(new myConstructorWithArguments);
     // (internal log of myConstructor):           arguments.length: 6
     // (internal log of myConstructor):           ["hi", "how", "are", "you", "mr", null]
     // (log of "new myConstructorWithArguments"): {prop1: "val1", prop2: "val2"}
}

function testCourse(){
    const meals = [
        {id: 1, description: "Breakfast", calories: 420},
        {id: 2, description: "Lunch", calories: 520},
    ];

    const meal = {id: 3, description: "dinner", calories: 620};

    // Add a new meal object to the array via spread syntax
    const updatedMeals = [...meals, meal];
    //console.log(meals, updatedMeals);

    // Update an existing meal object in the array based on id using Transform Map function
    // Pass a named function. As this is array, each item in the array would be parameter to the function
    const updatedMealsDescription = updatedMeals.map(updateDescription);
    function updateDescription(meal) {
        if(meal.id === 2) {
            return {
                ...meal,
                description: "Early " + meal.description,
            }
        }
        
        return meal;
    }
    //console.log(updatedMealsDescription);

    // Purpose of anonymouse function would be to return data which doesn't fullfill the case
    const filteredMeals = updatedMeals.filter((meal) => {
        return meal.id !== 1;
    });
    console.log(filteredMeals);
}

function testExercise(){
    const friends = ['Manjeet Malaga', 'Shrinkhla Singh'];

    const updatedFriends = [...friends, 'Dost Malaga Singh'];
    console.log(updatedFriends);
   
    const friendNameLengths = updatedFriends.map(friendNameLength)
    console.log(friendNameLengths);

    var longestFriendNameLength = Math.max(...friendNameLengths);
    const shorterNameFriends = updatedFriends.filter((name) => {  
        return name.length != longestFriendNameLength;
    });        
    console.log(shorterNameFriends);

    function friendNameLength(name) {
        return name.length;
    }

}

function testHighOrderAndClosureExercise(){
    const studentGrades = [
        {name:'Ram', grade: 88},
        {name:'Sita', grade: 95},
        {name:'Laxman', grade: 77},
        {name:'Arjun', grade: 60},
        {name:'Bheem', grade: 54},
    ];

    const gradeAndMessage = {
        a: 'Excellent Job',
        b: 'Nice Job',
        c: 'Well done',
        d: 'What happenend',
        e: 'Not good'
    };

    function letterGrade(gradenum) {
        switch (true) {
            case (gradenum >= 90) : 
                return 'a';
            case (gradenum >= 80 && gradenum < 90) : 
                return 'b';
            case (gradenum >= 70 && gradenum < 80) : 
                return 'c';
            case (gradenum >= 60 && gradenum < 70) : 
                return 'd';     
            case (gradenum >= 50 && gradenum < 60) : 
                return 'e';
            default :
                return '';
        }           
    }

    const studentFeedback = studentGrades.map(gradeStudentWithFeedback(gradeAndMessage));

    function gradeStudentWithFeedback(feebackRules) {
       return function (student) {
            const letterG = letterGrade(student.grade);
            const message = feebackRules[letterG];
           return `${message} ${student.name}, you got an ${letterG}`;
       };
    }

    console.log(studentFeedback);
}

function testArrayMapAsync() {
    var async = require('async');
    // const arr = ['1', '2'];
    // async.map(arr, getInfo);

    // function getInfo(name, cb) {
    //     console.log(name);
    // }
}

exports.test = test; //testArrayMapAsync;