<?php
class connect{
    public function local(){
        $link = mysqli_connect(db_host, db_user, db_password, db_name);
        mysqli_query($link, "set names utf8");
        if ($link === false) {
            echo "沒開阿";
        } else {
            return $link;
        }
    }
}

