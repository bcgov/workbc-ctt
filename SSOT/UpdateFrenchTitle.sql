ALTER TABLE Occupations ALTER COLUMN Title nvarchar(max) not null

DBCC CLEANTABLE (WorkBC_CareerTransitionTool, 'Occupations', 100000)

ALTER TABLE Occupations REBUILD


------------------------------------------------------------------------------
--Update Occupations table records from temp table
Update Occupations
Set Title = (N'Maîtres d''hôtel and hosts / hostesses')
where NOC=64300;

--Check results
Select * from Occupations
where NOC=64300
