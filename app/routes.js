var express = require('express'),
    router = express.Router(),
    session = require('express-session');

var app = express();
var student = {
    fname: String,
    lname: String,
    level: String,
    added: String
};
var school = [
    {
        "fname": "new",
        "lname": "Benjamin",
        "level": "beginner",
        "added": "Sat Oct 07 2017 07:59:47 GMT+0100 (WAT)"
    }
];

function Person(fname, lname, level) {
    this.fname = fname || 'anonymous',
        this.lname = lname || 'anonymous',
        this.level = level,
        this.added = Date();
}

function checkforduplicate(newStudent, database) {
    var check = false;
    var one = newStudent;
    database.map(function (two, num) {
        if (one.fname === two.fname && one.lname === two.lname && one.level === two.level) {
            check = true
        }
    })
    return check
}
function remove(array, index) {
    return array.slice(0, index)
        .concat(array.slice(index + 1));
}
function update(array, num, toadd) {
    var first = array.slice(0, num)
    first.push(toadd)
    var second = array.slice(num + 1)
    return (first.concat(second))
}

function getOldStudent(stud, database) {
    var n;
    database.map(function (two, num) {
        if (stud === two.fname) {
            n = num;
        }
    })
    return n
}

function lookfornumstudent(studName, database) {
    var num;
    database.map(function (two, n) {
        if (studName === two.fname) {
            num = n
            check = true
        }
    })
    return num;

}


router.get('/', function (req, res) {
    res.status(200).send("yay, studs how are you?")
})

router.get('/api', function (req, res) {
    res.status(200).json(school);
});

router.post('/api/add', function (req, res) {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var level = req.body.level;

    var newStudent = new Person(fname, lname, level);

    console.log(newStudent)

    var check = checkforduplicate(newStudent, school);
    if (check === true) {
        return res.send('a student like that already exist');
    } else {
        school.push(newStudent);
        return res.send(school);
    }
})

router.put('/update/:oldname', function (req, res) {
    var oldName = req.params.oldname;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var level = req.body.level;

    // i create an new student from the data gotten
    var newStudent = new Person(fname, lname, level);

    // check if the oldname is found in the database
    var check = false;
    school.map(function (stud) {
        if (oldName == stud.fname) {
            check = true;
        }
    });
    // if the oldname is found in the database
    if (check === true) {
        var num;
        num = lookfornumstudent(oldName, school);
        // console.log(lookfornumstudent(oldName, school))
        // console.log(oldName);

        //  get the object of the oldname
        var oldStudent = school[num];
        var newSchool = update(school, num, newStudent);
        school = newSchool
        return res.json(school);
    } else {
        return res.send("this student is not in the database")
    }
})

router.delete('/delete/:name', function (req, res) {
    var student = req.params.name;
    var check = false;
    school.map(function (stud) {
        if (student == stud.fname) {
            check = true;
        }
    });
    if (check === true) {
        var num;
        num = lookfornumstudent(student, school);
        school = remove(school, num);
        return res.send(school)
    } else {
        return res.send('the student isn\'t in the database');
    }

})

module.exports = router;