<?php
class Sql
{
    protected $link;
    public function __construct($ax)
    {
        $this->link = $ax;
    }
    public function users_image($user_id)
    {
        $result = mysqli_query($this->link, "SELECT image FROM users WHERE user_id = $user_id");
        $row = mysqli_fetch_assoc($result);
        return $row["image"];
    }
    public function users($userName, $password)
    {
        $row = false;
        $sql = sprintf("SELECT user_id,userName,password,firstName,lastName,email,phone FROM users WHERE userName = '%s' and password = '%s'", $userName, $password);
        try{
            $result = mysqli_query($this->link, $sql);
            $row = mysqli_fetch_assoc($result);
        }catch(Exception $ex){
            $row = false;
        }
        return $row;
    }
    public function movies()
    {
        $result = mysqli_query($this->link, "SELECT * FROM movies");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function screen()
    {
        $sql = "
        SELECT  screenings.screen_id,
                screenings.show_date,
                screenings.show_time,
                screenings.price,
                screenings.remaining_seats,
                theaters.name as theatersName,
                theaters.capacity,
                cinemas.name as cinemasName,
                cinemas.address,
                cinemas.phone,
                cinemas.image,
                cinemas.longitude,
                cinemas.latitude,
                movies.name_CN as movieName_CN,
                movies.name_EN as movieName_EN,
                movies.content as movieContent,
                movies.duration as movieDuration,
                movies.type as movieType,
                movies.image as movieImage,
                movies.mp4 as movieMp4,
                movies.listing_date,
                categorys.name as categorysName
        FROM `screenings`
        JOIN theaters ON screenings.theater_id = theaters.theater_id
        JOIN cinemas ON theaters.cinema_id = cinemas.cinema_id
        JOIN categorysAll ON screenings.categorysAll_id = categorysAll.categorysAll_id
        JOIN movies ON categorysAll.movie_id = movies.movie_id
        JOIN categorys ON categorys.category_id = categorysall.category_id
        ";

        $result = mysqli_query($this->link, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function actors()
    {
        $result = mysqli_query($this->link, "SELECT * FROM `actors`");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function movieall()
    {
        $result = mysqli_query($this->link, "SELECT * FROM `movieall`");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function cinema()
    {
        $result = mysqli_query($this->link, "SELECT * FROM `cinemas`");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function ticket(){
        $result = mysqli_query($this->link,"SELECT * FROM `movie_ticket`");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function food(){
        $result = mysqli_query($this->link,"SELECT * FROM `foods`");
        while ($row = mysqli_fetch_assoc($result)) {
            $rows[] = $row;
        }
        return $rows;
    }
    public function movie_ticket($user_id)
    {
        $rows = false;
        $sql = "SELECT movie_ticket.ticket_id,
                       movie_ticket.foodAll,
                       movie_ticket.priceAll,
                       movie_ticket.number,
                       screenings.show_date,
                       screenings.show_time,
                       movie_ticket.seat_name,
                       theaters.name as theatersName,
                       cinemas.name as cinemasName,
                       categorys.name as categorysName,
                       movies.name_CN as movieName_CN,
                       movies.name_EN as movieName_EN,
                       movies.type              
                       FROM screenings
                       JOIN movie_ticket ON screenings.screen_id = movie_ticket.screen_id
                       JOIN theaters ON theaters.theater_id = screenings.theater_id
                       JOIN cinemas ON cinemas.cinema_id = theaters.cinema_id
                       JOIN categorysall ON categorysall.categorysAll_id = screenings.categorysAll_id
                       JOIN categorys ON categorysall.category_id = categorys.category_id
                       JOIN movies ON movies.movie_id = categorysall.movie_id
                       JOIN users ON users.user_id = movie_ticket.user_id
                       WHERE movie_ticket.user_id = $user_id
                       order by movie_ticket.ticket_id desc;";
        try {
            $result = mysqli_query($this->link, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } catch (Exception $ex) {
            return false;
        };
        return $rows;
    }
    public function creditcards($user_id)
    {
        $rows = false;
        try {
            $result = mysqli_query($this->link, "SELECT * FROM creditcards WHERE user_id = $user_id");
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } catch (Exception $ex) {
            return false;
        }
        return $rows;
    }


    public function creditcard_insert($array)
    {
        $array = explode(',', $array);
        $sql = sprintf("INSERT INTO creditcards(bankName,account,year,month,userName,user_id) VALUES ('%s','%s','%s',%s,'%s','%s')", $array[0], $array[1], $array[2], $array[3], $array[4], $array[5]);
        $result = mysqli_query($this->link, $sql);
        return (!$result) ? 'false' : 'true';
    }
    public function register_insert($array)
    {
        $array = explode(',', $array);
        $sql = sprintf("INSERT INTO users (userName,password,firstName,lastName,email,phone,image) VALUES ('%s','%s','%s','%s','%s','%s',null)", $array[0], $array[1], $array[2], $array[3], $array[4], $array[5]);
        $result = mysqli_query($this->link, $sql);
        return (!$result) ? 'false' : 'true';
    }
    public function movie_ticket_insert($array){
        $array = explode(',', $array);
        $str = $array[2];
        $seat = str_replace(' ',',',$str);
        $sql = sprintf("INSERT INTO movie_ticket (user_id,screen_id,seat_name,foodAll,priceAll,number) VALUES ('%s','%s','%s','%s',%d,%d)", $array[0], $array[1], $seat, $array[3], $array[4], $array[5]);
        $result = mysqli_query($this->link, $sql);
        return (!$result) ? false : true;
    }
    public function screening_insert($array){
        $array = explode(',', $array);
        $sql = sprintf("INSERT INTO screenings (theater_id,categorysAll_id,show_date,show_time,price,remaining_seats) VALUES ((SELECT theater_id FROM `theaters` WHERE cinema_id = (SELECT cinema_id FROM cinemas WHERE name = '%s')),
                                                                                                                              (SELECT categorysAll_id FROM categorysall WHERE movie_id = (SELECT movie_id FROM movies WHERE name_CN = '%s') AND category_id =(SELECT category_id FROM categorys WHERE name = '%s')),
                                                                                                                              '%s',
                                                                                                                              '%s',
                                                                                                                              0,
                                                                                                                              0)",$array[3],$array[2],$array[4],$array[0],$array[1]);
        $result = mysqli_query($this->link,$sql);
        return $result?'false':'true';
    }





    public function user_ticket_delete($ticket_id)
    {
        $result = mysqli_query($this->link, "DELETE FROM movie_ticket WHERE ticket_id = $ticket_id");
        return (!$result) ? 'false' : 'true';
    }
    public function screening_delete($screen_id){
        $result = mysqli_query($this->link,"DELETE FROM screening WHERE screen_id = $screen_id");
        return (!$result) ? 'false' : 'true';
    }








    public function users_update_ok($userName)
    {
        $sql = sprintf("SELECT user_id,userName,password,firstName,lastName,email,phone FROM users WHERE userName = '%s'", $userName);
        $result = mysqli_query($this->link, $sql);
        if ($result === false) {
            return false;
        } else {
            $row = mysqli_fetch_assoc($result);
            return $row;
        }
    }
    public function user_name_update($first, $last, $userName)
    {
        $result = mysqli_query($this->link, "UPDATE users SET firstName = '$first' , lastName = '$last' WHERE userName = '$userName'");
        return (!$result) ? 'false' : $this->users_update_ok($userName);
    }
    public function user_email_update($email, $userName)
    {
        $result = mysqli_query($this->link, "UPDATE users SET email = '$email' WHERE userName = '$userName'");
        return (!$result) ? 'false' : $this->users_update_ok($userName);
    }
    public function user_phone_update($phone, $userName)
    {
        $result = mysqli_query($this->link, "UPDATE users SET phone = '$phone' WHERE userName = '$userName'");
        return (!$result) ? 'false' : $this->users_update_ok($userName);
    }
    public function user_userName_update($pass, $userName)
    {
        $result = mysqli_query($this->link, "UPDATE users SET userName = '$pass' WHERE userName = '$userName'");
        return (!$result) ? 'false' : $this->users_update_ok($userName);
    }
    public function user_image_update($file, $userName)
    {
        $result = mysqli_query($this->link, sprintf("UPDATE users SET image = %s WHERE userName = '%s'", "'" . $file . "'", $userName));
        return (!$result) ? 'false' : $this->users_update_ok($userName);
    }
    public function screening_update($array){
        $result = false;
        $array = explode(',', $array);
        // echo json_encode($array);
        $sql = sprintf("UPDATE screenings SET theater_id = (SELECT theater_id FROM `theaters` WHERE cinema_id = (SELECT cinema_id FROM cinemas WHERE name = '%s')),
                                              categorysAll_id = (SELECT categorysAll_id FROM categorysall WHERE movie_id = (SELECT movie_id FROM movies WHERE name_CN = '%s') AND category_id =(SELECT category_id FROM categorys WHERE name = '%s')),
                                              show_date = '%s',
                                              show_time = '%s'
                                              WHERE screen_id = '%s'",$array[1],$array[3],$array[2],$array[4],$array[5],$array[0]);
        try{
            $result = mysqli_query($this->link,$sql);
        }catch(Exception $ex){
            $result = false;
        };
        
        return $result?true:false;
    }
    public function director()
    {
        $rows = false;
        $sql = "SELECT  movieAll_id,
                        movies.movie_id,
                        movies.name_CN AS movie_name_CN,
                        director.name AS director_name 
                        FROM `movieall` 
                        JOIN director ON director.director_id=movieall.director_id 
                        JOIN movies ON movieall.movie_id=movies.movie_id";
        try {
            $result = mysqli_query($this->link, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
                $rows[] = $row;
            }
        } catch (Exception $ex) {
            return false;
        };
        return $rows;
    }
}
