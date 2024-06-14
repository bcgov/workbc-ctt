 --Load file contents into a table
Declare @JSON varchar(max)
SELECT @JSON=BulkColumn
FROM OPENROWSET (BULK 'C:\src_ctt\SSOT\wages.json', SINGLE_CLOB) import
SELECT * Into #TempWages
FROM OPENJSON (@JSON)
WITH 
(
    noc varchar(100), 
    calculated_median_annual_salary varchar(100) 
)
--Select * from #TempWages
-------------------------
DECLARE @Counter INT , @MaxId INT, 
		@income NVARCHAR(20)
SELECT @Counter = min(Id) , @MaxId = max(Id) 
FROM Occupations

WHILE(@Counter IS NOT NULL
      AND @Counter <= @MaxId)
BEGIN
   Update Occupations SET Income = #TempWages.calculated_median_annual_salary
   FROM #TempWages WHERE Occupations.NOC = #TempWages.noc
    
   SET @Counter  = @Counter  + 1        
END

--Select * from Occupations
 
Drop table #TempWages


