 --Load file contents into a table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\occupations.json', SINGLE_CLOB) import
SELECT * Into #TempOccupations
FROM OPENJSON (@JSON)
WITH 
(
    [Code2016] varchar(10), 
    [Code2021] varchar(10) ,
	[WEID] varchar(10) 
)

------------------------------------------------------------------
DECLARE @Counter INT , @MaxId INT, 
		@workExp NVARCHAR(20)
SELECT @Counter = min(Id) , @MaxId = max(Id) 
FROM Occupations

WHILE(@Counter IS NOT NULL
      AND @Counter <= @MaxId)
BEGIN
   Update Occupations SET WorkExperienceId = #TempOccupations.WEID
   FROM #TempOccupations WHERE Occupations.NOC = #TempOccupations.Code2021
    
   SET @Counter  = @Counter  + 1        
END

Update Occupations Set WorkExperienceId=1
where WorkExperienceId is null
---------------------------------------------------------------------
Drop table #TempOccupations

Select * from Occupations