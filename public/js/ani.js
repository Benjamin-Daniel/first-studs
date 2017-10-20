// the elements
var submitbtn = document.querySelector('#submitlink');
var form = document.querySelector('form');
var inputd = document.querySelector('input.form-control');
var food = document.querySelector('#food');
var checked = document.querySelector('#check');
var deleteForm = document.getElementById('deleteForm');
var deleteInput = document.getElementById('deleteInput');
var errorMessage = document.getElementById('errorMessage');


function processd(theValueOfTheText, thespanToChange, themodal) {
    theText = document.createTextNode(`${theValueOfTheText}`);
    thespanToChange.appendChild(theText);
    $(`#${themodal}`).modal('open');
}
function handleTheSubmit(theForm, theInput, theErrorMessage) {
    theForm.onsubmit = function () {
        if (theInput.value == "") {
            theErrorMessage.innerHTML = 'Provide at least a food';
            return false;
        } else {
            theErrorMessage.innerHTML = '';
            return true;
        }
    }
}

//event listener to check when enter is pressed in the input form
inputd.addEventListener('keypress', function (e) {
    if (e.key === "Enter" && e.keyCode == 13) {
        var value = inputd.value;
        if (value.length > 0) {
            fetch(`http://localhost:3003/test/${value}`)
                .then(response => response.json())
                .then(({ results }) => {
                    //to check if the result is empty
                    if (results.name.length === 0 && results.category.length === 0) {
                        processd(results.name, food, 'modal1');
                    } else {
                        //if the result is not empty
                        console.log(results);
                        processd(value, checked, 'modal2');
                        handleTheSubmit(deleteForm, deleteInput, errorMessage);
                    }
                })
        }
    }
})
// event listener to check when the button like link is clicked
submitbtn.addEventListener('click', function () {
    var value = inputd.value;
    if (value.length > 0) {
        fetch(`http://localhost:3003/test/${value}`)
            .then(response => response.json())
            .then(({ results }) => {
                //console.log(results)
                //to check if the result is empty

                if (results.name.length === 0 && results.category.length === 0) {
                    //console.log("results is empty");
                    var theText = document.createTextNode(`${value}`);
                    food.appendChild(theText);
                    $('#modal1').modal('open');
                } else {
                    console.log(results);
                }
            })
    }
})