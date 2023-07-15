const sign_in_btn = document.querySelector('#sign-in-btn');
const sign_up_btn = document.querySelector('#sign-up-btn');
const container = document.querySelector('.container');

sign_up_btn.addEventListener('click', () => {
  container.classList.add('sign-up-mode');
});

sign_in_btn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
});

//code by surya  

console.log("welcome to  login maker-------------------------------------");

console.log("Creating User Database table ");

// Open the database
var request = indexedDB.open("Emplogin", 1);
// Create the object store
request.onupgradeneeded = function (event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("EmpTable", { keyPath: "id", autoIncrement: true });
  objectStore.createIndex("EmployeeID", "EmployeeID", { unique: false });
  objectStore.createIndex("Empmail", "Empmail", { unique: false });
  objectStore.createIndex("Empname", "Empname", { unique: false });
  objectStore.createIndex("Empassword", "Empassword", { unique: false });
  objectStore.createIndex("Empproject", "Empproject", { unique: false });
  objectStore.createIndex("ProjProg", "ProjProg", { unique: false });
  objectStore.createIndex("ProjPriority", "ProjPriority", { unique: false });
  objectStore.createIndex("Overtime", "Overtime", { unique: false });
  objectStore.createIndex("Leave", "Leave", { unique: false });

};
// Insert a user
function addUser(EmployeeID, Empmail, Empname, Empassword, Empproject, ProjProg, ProjPriority, Overtime, Leave) {
  var request = indexedDB.open("Emplogin", 1);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["EmpTable"], "readwrite");
    var objectStore = transaction.objectStore("EmpTable");
    var user = { EmployeeID: EmployeeID, Empmail: Empmail, Empname: Empname, Empassword: Empassword, Empproject: Empproject, ProjProg: ProjProg, ProjPriority: ProjPriority, Overtime: Overtime, Leave: Leave };
    var request = objectStore.add(user);
    request.onsuccess = function (event) {
      console.log("Employee added to the database");
      window.location.href= "namespaceid.html";
    };
    request.onerror = function (event) {
      console.log("Error adding user to the database");
    };
  };
}
document.getElementById("btn_signup").addEventListener("click", registerEmployee);

function registerEmployee() {

  let signupname = document.getElementById("signupname").value;
  let signupemail = document.getElementById("signupemail").value;
  let signuppassword = document.getElementById("signuppass").value;


  let empid = (parseInt(localStorage.getItem("patternofid")) + 1).toString()
  console.log(empid);

  localStorage.setItem("tempname",signupname);
  localStorage.setItem("tempmail",signupemail);
  localStorage.setItem("tempempid",empid);
  localStorage.setItem("emppass",signuppassword);

  addUser(empid, signupemail, signupname, signuppassword, "", "", "", "", "");
  rowcount = localStorage.getItem("rowcount");
  rowcount = parseInt(rowcount) + 1;
  localStorage.setItem("patternofid", empid);
  localStorage.setItem("rowcount", rowcount);

  window.location.href= "namspaceid.html";

}

var getUserByUsername = function (EmployeeID, callback) {
  var request = indexedDB.open("Emplogin", 1);
  request.onsuccess = function (event) {
    var db = event.target.result;
    var transaction = db.transaction(["EmpTable"], "readonly");
    var objectStore = transaction.objectStore("EmpTable");
    var index = objectStore.index("EmployeeID");
    var request = index.get(EmployeeID);
    request.onsuccess = function (event) {
      var user = event.target.result;
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    }
  };
  request.onerror = function (event) {
    console.error("Error retrieving user:", event.target.error);
    callback(null);
  };
};



///
document.getElementById("loginevent").addEventListener("click", checkforlogin);
function checkforlogin() {
  let EmpIDlogin = document.getElementById("logEmpid").value;
  let Emploginpass = document.getElementById("logEmpPass").value;


  getUserByUsername(EmpIDlogin, function (user) {
    if (user) {
      console.log("Found user:", user);
      if (user.Empassword == Emploginpass) {
        const nameofemp = user.Empname;
        const empidofemp= user.EmployeeID
        localStorage.setItem("nameofemp", nameofemp);
        localStorage.setItem("empidofemp",empidofemp)
        window.location.href = "dashboard/empdash/dashboard.html"
      }
      else {
        alert("Please enter correct Username and password")
      }

    }
    else {
      console.log("User not found");
      alert("Incorect data ");
      location.reload();
    }
  });
}

document.getElementById("admin-login-btn").addEventListener("click", adminpagenav);
function adminpagenav() {
  window.location.href = "admin/admin_login.html";
}