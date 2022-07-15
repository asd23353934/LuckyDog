<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
session_start();
require_once '../config/config.php';
require_once '../models/Connect.php';
require_once '../models/Sql.php';
$first="";
$last="";
$userName="";
$id="";
if(isset($_REQUEST['q'])){
    $first = $_REQUEST['q'];
}
if(isset($_REQUEST['c'])){
    $last = $_REQUEST['c'];
}
if(isset($_REQUEST['d'])){
    $userName = $_REQUEST['d'];
}
if(isset($_REQUEST['id'])){
    $id = $_REQUEST['id'];
}
class ajax
{
    public function __construct()
    {
        $link = new connect;
        $link = $link->local();
        $this->sql = new Sql($link);
    }
    public function login($userName,$password){
        return $this->sql->users($userName,$password);
    }
    public function userImage($user_id){
        return $this->sql->users_image($user_id);
    }
    public function movieticket($user_id){
        return $this->sql->movie_ticket($user_id);
    }
    public function card($user_id){
        return $this->sql->creditcards($user_id);
    }


    public function name($first, $last,$userName)
    {
        return $this->sql->user_name_update($first, $last, $userName);
    }
    public function email($email, $userName)
    {
        return $this->sql->user_email_update($email, $userName);
    }
    public function phone($phone, $userName)
    {
        return $this->sql->user_phone_update($phone, $userName);
    }
    public function password($password, $userName)
    {
        return $this->sql->user_password_update($password, $userName);
    }
    public function image($file, $userName){
        return $this->sql->user_image_update($file, $userName);
    }
    public function screening_update($array){
        return $this->sql->screening_update($array);
    }

    public function screening_delete($screen_id){
        return $this->sql->screening_delete($screen_id);
    }
    public function ticket($ticket_id){
        return $this->sql->user_ticket_delete($ticket_id);
    }


    public function card_add($array){
        return $this->sql->creditcard_insert($array);
    }
    public function register($array){
        return $this->sql->register_insert($array);
    }
    public function movie_ticket_add($array){
        return $this->sql->movie_ticket_insert($array);
    }
    public function screening_insert($array){
        return $this->sql->screening_insert($array);
    }

    public function screening(){
        return $this->sql->screen();
    }
    public function movie(){
        return $this->sql->movies();
    }
    public function actors(){
        return $this->sql->actors();
    }
    public function movieall(){
        return $this->sql->movieall();
    }
    public function cinema(){
        return $this->sql->cinema();
    }
    public function ticketAll(){
        return $this->sql->ticket();
    }
    public function food(){
        return $this->sql->food();
    }
    public function director(){
        return $this->sql->director();
    }
}

$app_name = new ajax;
if($id == "login"){
    echo json_encode(call_user_func_array(array($app_name,$id),array($first,$last))) ;
}
if($id == "director"){
    echo json_encode(call_user_func(array($app_name,$id))) ;
}
if($id == "movieticket" || $id == "card"){
    echo json_encode(call_user_func_array(array($app_name,$id),array($first))) ;
}
if($id == "name"){
    echo json_encode(call_user_func_array(array($app_name,"name"),array($first,$last,$userName))) ;
}
if($id == "email" || $id == "phone" || $id == "password"){
    echo json_encode(call_user_func_array(array($app_name,$id),array($first,$userName))) ;
}
if($id == "ticket" || $id == "card_add" || $id == "register" || $id == "userImage" || $id == "movie_ticket_add" || $id == "screening_update" || $id == "screening_delete" || $id == "screening_insert"){
    echo call_user_func_array(array($app_name,$id),array($first));
}
if($id == "screening" || $id == "movie" || $id == "cinema" || $id == "actors" || $id =="movieall" || $id == "ticketAll" || $id == "food"){
    echo json_encode(call_user_func(array($app_name,$id)));
}
if (isset($_FILES['image'])) {
    $filetype = $_FILES['image']['type'];
    // echo "123";
    if ($filetype == 'image/jpeg' || $filetype == 'image/png' || $filetype == 'image/jpg') {
        $filename = $_FILES['image']['name'];
        $tmpname = $_FILES['image']['tmp_name'];
        $filesize = $_FILES['image']['size'];
        $file = null;
        if (isset($_FILES['image']['error'])) {
            if ($_FILES['image']['error'] == 0) {
                $instr = fopen($tmpname, 'rb');
                $file = addslashes(fread($instr, filesize($tmpname)));
            }
        }
        echo call_user_func_array(array($app_name,"image"),array($file,$userName));
    }
}