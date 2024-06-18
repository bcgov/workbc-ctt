--Load file contents into a temp table
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
--Update new income in Occupations table from temp table
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

--Drop temp table
Drop table #TempWages

--Check results
Select * from Occupations


