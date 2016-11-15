use birdRecords;


drop table if exists temp_info; 
create table temp_info ( 
	temp float, 
	measurement_time bigint);

insert into temp_info
	(temp, measurement_time)
    values
    (52.3, 1479192970000);
insert into temp_info
	(temp, measurement_time)
    values
    (52.8, 1479192977000);
insert into temp_info
	(temp, measurement_time)
    values
    (53.00004, 1479192987000);
insert into temp_info
	(temp, measurement_time)
    values
    (54.03, 1479193017000);
insert into temp_info
	(temp, measurement_time)
    values
    (55.834, 1479193043000);
insert into temp_info
	(temp, measurement_time)
    values
    (52.102, 1479193055000);
insert into temp_info
	(temp, measurement_time)
    values
    (48.7, 1479193060000);
    
select *
from temp_info
order by measurement_time;