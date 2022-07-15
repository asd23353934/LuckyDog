<?php
class Controller {
    public function construct(){
        $this->host = $this->Connect();//$link 連接資料庫
        $this->server = $this->host->local();
        $this->catch_Sql = $this->Sql($this->server);
    }
    public function Connect(){
        require_once "models/Connect.php";
        return new connect;
    }
    public function Sql($ax){
        require_once "models/Sql.php";
        return new Sql($ax);
    }
}

?>