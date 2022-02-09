<?php
//var_dump($_COOKIE);
if (!isset($_COOKIE['email']) or trim($_COOKIE['email']) == '') {
  header("Location: sign_up.html");
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!--Import Google Icon Font-->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <!--Import materialize.css-->
  <link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection" />
  <link rel="stylesheet" href="css/style.css" media="screen,projection" />
  <link rel="shortcut icon" href="favicon.png" type="image/png">


  <title>Profile</title>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col l12 center-align">
        <h1 class="user-cabinet-header">Welcome to your account</h1>
      </div>
    </div>
    <div class="row">
      <div class="col l12 center-align">
        <button id="edit" class="deep-purple accent-3 waves-effect waves-light btn"><i class="material-icons right">edit</i>Edit profile</button>
      </div>
    </div>
    <div class="row">
      <div class="col l6">
        <div class="row">
          <div class="input-field col s6">
            <input id="update-name" type="text" class="validate has-character-counter" data-length="10" minlength="3" pattern="[A-za-z]{3,10}" disabled>
            <label class="active" for="update-name">Name</label>
          </div>

          <div class="input-field col s6">
            <input id="update-pass" type="password" class="validate" minlength="5" maxlength="15" disabled>
            <label class="active" for="update-pass">Password</label>
          </div>
          <div class="input-field col s12">
            <input id="update-birthday" type="text" class="datepicker validate" pattern="^(?:(?:31(\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$" disabled>
            <label class="active" for="update-birthday">Birthday</label>
          </div>
        </div>
        <div class="row">
          <p>Sex:</p>
          <p>
            <label>
              <input class="with-gap" name="sex" type="radio" value="male" disabled />
              <span>male</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="sex" type="radio" value="female" disabled />
              <span>female</span>
            </label>
          </p>
          <p>
            <label>
              <input class="with-gap" name="sex" type="radio" value="other" disabled />
              <span>other</span>
            </label>
          </p>
        </div>
        <div class="row">
          <div class="col l6 center-align">
            <button type="submit" id="update" class="deep-purple accent-3 waves-effect waves-light btn"><i class="material-icons right">update</i>Update</button>
          </div>
          <div class="col l6 center-align">
            <button id="logout" class="deep-purple accent-3 waves-effect waves-light btn"><i class="material-icons right">exit_to_app</i>Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="js/materialize.min.js"></script>
  <script src="script/logout.js"></script>
  <script src="script/ajax.js"></script>
  <script src="script/get_user_data.js"></script>
</body>

</html>