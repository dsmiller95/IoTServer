use birdRecords;


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
    (49.02, 1479195000000);
    
select *
from temp_info
order by measurement_time;