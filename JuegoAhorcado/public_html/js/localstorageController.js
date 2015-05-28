/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
if (typeof (Storage) !== "undefined") {
    makeTableHTML();
} else {
    alert("Lo sentimos, su navegador no soporta Web Storage...");
}


$("#submit").click(function () {
    if(typeof(Storage) != "undefined"){
        
        var i = countUsers();
        
        var user = {firstlastname:document.getElementById("firstlastname").value, 
                        secondlastname:document.getElementById("secondlastname").value,
                        fullname:document.getElementById("fullname").value,
                        identification:document.getElementById("identification").value,
                        streetaddress:document.getElementById("streetaddress").value,
                        city:document.getElementById("city").value,
                        country:document.getElementById("country").value,
                        email:document.getElementById("email").value,
                    };
        
        localStorage["usuario["+i+"]"] = JSON.stringify(user);
        makeTableHTML();
    }
    else {
        document.getElementById("result").innerHTML = "Lo sentimos, su navegador no soporta Web Storage...";//Error
    }
});
function countUsers(){
    var k, i=0;
    while (true){
        k = "usuario["+i+"]";
        if(window.localStorage.getItem(k) === null) return i;
        i++;
    }
    var string = window.localStorage.getItem(k).valueOf() + ", " + i;
    return string;
}
function makeTableHTML() {
    
    if(countUsers() == 0){
        var result="<small>No hay usuarios creados en la libreta de direcciones, por favor cree alguno.</small>";
        document.getElementById('tabla').innerHTML = result;
    }else{
        var result = "<table class=\"table table-bordered table-striped\">";
        result += "<tr><th>No.</th><th>Full Name</th><th>Firstlast Name</th><th>Secondlast Name</th><th>Identification</th><th>Street Address</th><th>City</th><th>Country</th><th>E-Mail</th><th>Action</th>";
        for(var i=0; i < countUsers(); i++) {
            var user = [], key;
            key = "usuario["+i+"]";
            user.push(JSON.parse(window.localStorage.getItem(key)));

            result += "<tr>";
            result += "<td>"+(i+1)+"</td>";
            result += "<td>"+user[0].fullname+"</td>";
            result += "<td>"+user[0].firstlastname+"</td>";        
            result += "<td>"+user[0].secondlastname+"</td>";
            result += "<td>"+user[0].identification+"</td>";
            result += "<td>"+user[0].streetaddress+"</td>";
            result += "<td>"+user[0].city+"</td>";
            result += "<td>"+user[0].country+"</td>";
            result += "<td>"+user[0].email+"</td>";
            result += "<td><a href=\"#\" onclick=\"deleteUser("+i+")\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Delete</a></td>";
            result += "</tr>";
        }
        result += "</table><button onclick=\"clearLocalStorage()\" class=\"btn btn-danger\" type=\"submit\">Eliminar todos los usuarios</button>";
        document.getElementById('tabla').innerHTML = result;
    }
}

function clearLocalStorage(){
    localStorage.clear();
    makeTableHTML();
}

function deleteUser(id){
    var allUsers = [], num = countUsers()-1;
    for(var i=0; i < num; i++) {
        if(i < id){
            allUsers[i] = localStorage["usuario["+i+"]"];
        } else{
            allUsers[i] = localStorage["usuario["+(i+1)+"]"];
        }
    }
    localStorage.clear();
    for(var i=0; i < num; i++) {
        localStorage["usuario["+i+"]"] = allUsers[i];
    }
    makeTableHTML();
}
