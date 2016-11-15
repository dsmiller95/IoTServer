drop schema if exists birdRecords;
create schema birdRecords;
use birdRecords;


drop table if exists temp_info; 
create table temp_info ( 
	temp float, 
	measurement_time bigint);
    
select *
from temp_info;
