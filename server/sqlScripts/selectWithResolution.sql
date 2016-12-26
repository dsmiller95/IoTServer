use birdrecords;


SET @myLast := 1482701823061;
SET @minResolution := 101;
SET @temp := 0;

Select temp, (@temp := measurement_time) as measurement_time
from temp_info
WHERE temp_info.measurement_time > @myLast AND (measurement_time - @temp) >= @minResolution
;

SET @tmp := 0;
SELECT temp, (@tmp := measurement_time) as time
FROM temp_info
WHERE
        measurement_time > 1482620182694 AND measurement_time < 1482706582694
        AND (measurement_time - @tmp) >= 8640000
ORDER BY time