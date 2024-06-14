ALTER TABLE Salaries
ADD Minimum varchar(max);

ALTER TABLE Salaries
ADD Maximum varchar(max);

Update Salaries SET Minimum = 11000, Maximum = 33000
where Id=1

Update Salaries SET Minimum = 33001, Maximum = 44000
where Id=2

Update Salaries SET Minimum = 44001, Maximum = 53000
where Id=3

Update Salaries SET Minimum = 53001, Maximum = 66000
where Id=4

Update Salaries SET Minimum = 66001, Maximum = 95000
where Id=5

Update Salaries SET Minimum = 95001, Maximum = 125000
where Id=6

Update Salaries SET Minimum = 125001, Maximum = null
where Id=7

--Select * from Salaries

Update Occupations Set SalaryRangeId = (
Select Id from Salaries where Occupations.Income BETWEEN Salaries.Minimum AND Salaries.Maximum
)

