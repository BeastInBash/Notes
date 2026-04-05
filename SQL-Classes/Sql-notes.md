# Structured Query Language

```sql
-- Creating table of student with all the values mention
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY, -- serial PRIMARY KEY;
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    email VARCHAR(322) UNIQUE NOT NULL,

    phone_number VARCHAR(10) UNIQUE, -- 4000 byte vs 10byte 
    age INT CHECK(age > 12),
    current_status VARCHAR(20) DEFAULT 'active' CHECK(current_status IN ('active', 'graduated','droppedout')), 
    has_joined_masterji BOOLEAN DEFAULT FALSE, 
    current_score INT DEFAULT 0,
    enrollment_date DATE DEFAULT CURRENT_DATE 
);

ALTER TABLE students
ADD COLUMN batch_name VARCHAR(50) DEFAULT 'Web Dev 2025';


CREATE TABLE ipl_team (
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    team VARCHAR(200),
    role VARCHAR(50) NOT NULL,
    runs_scored INT CHECK(runs_scored > 0),
    wicket_taken INT CHECK(wicket_taken > 0),
    auction_price_crores INT

);

ALTER TABLE ipl_team
ADD CONSTRAINT wicket_taken_check CHECK (wicket_taken >= 0);

ALTER TABLE ipl_team
ADD CONSTRAINT runs_scored_check CHECK (runs_scored >= 0);

-- INSERT DATA TO TBALE ********************************************

INSERT INTO ipl_team (name, team, role, runs_scored, wicket_taken, auction_price_crores) VALUES
('Virat Kohli','RCB','Batsman',7263,4,15.00),
('Rohit Sharma','MI','Batsman',6211,15,16.00),
('MS Dhoni','CSK','Wicket-Keeper',5082,0,12.00),
('KL Rahul','LSG','Batsman',4163,0,17.00),
('David Warner','DC','Batsman',6397,0,6.25),
('Shikhar Dhawan','PBKS','Batsman',6617,4,8.25),
('Jos Buttler','RR','Wicket-Keeper',3582,0,10.00),
('Hardik Pandya','MI','All-Rounder',2309,53,15.00),
('Ravindra Jadeja','CSK','All-Rounder',2692,152,16.00),
('Andre Russell','KKR','All-Rounder',2262,96,12.00),
('Sunil Narine','KKR','All-Rounder',1046,163,6.00),
('Rashid Khan','GT','Bowler',400,149,15.00),
('Jasprit Bumrah','MI','Bowler',56,145,12.00),
('Mohammed Shami','GT','Bowler',69,127,6.25),
('Bhuvneshwar Kumar','SRH','Bowler',300,170,4.20),
('Yuzvendra Chahal','RR','Bowler',37,187,6.50),
('Kuldeep Yadav','DC','Bowler',120,87,2.00),
('Ruturaj Gaikwad','CSK','Batsman',2380,0,6.00),
('Devdutt Padikkal','RR','Batsman',1521,0,7.75),
('Shubman Gill','GT','Batsman',2790,0,8.00),
('Ishan Kishan','MI','Wicket-Keeper',2324,0,15.25),
('Sanju Samson','RR','Wicket-Keeper',3888,0,14.00),
('Dinesh Karthik','RCB','Wicket-Keeper',4516,0,5.50),
('Axar Patel','DC','All-Rounder',1350,112,9.00),
('Washington Sundar','SRH','All-Rounder',378,35,8.75),
('Mitchell Starc','KKR','Bowler',95,51,24.75),
('Pat Cummins','SRH','All-Rounder',379,45,20.50),
('Glenn Maxwell','RCB','All-Rounder',2719,31,11.00),
('Faf du Plessis','RCB','Batsman',4133,0,7.00),
('Quinton de Kock','LSG','Wicket-Keeper',3157,0,6.75);

-- Searching based on words
SELECT * FROM ipl_team WHERE name LIKE '__s%';
SELECT * FROM ipl_team WHERE name ILIKE '__s%'; -- Case in sensitive
SELECT * FROM ipl_team WHERE team IN ('CSK','MI','RR');
SELECT * FROM ipl_team WHERE team = 'CSK' OR team = 'RCB'; -- OR 
SELECT * FROM ipl_team WHERE wicket_taken > 10 AND role ='All-Rounder'; -- AND
SELECT * FROM ipl_team WHERE TEAM != 'RCB'; -- Not Equal to 
SELECT * FROM ipl_team WHERE TEAM <> 'RCB'; -- Not Equal to also 
--- SORTING
SELECT name, auction_price_crores FROM ipl_team ORDER BY auction_price_crores DESC; 
SELECT name, auction_price_crores FROM ipl_team ORDER BY auction_price_crores ASC; 
-- Multi column sorting first sorting team and then sorting auction_price_crores
SELECT name, auction_price_crores FROM ipl_team ORDER BY team ASC , auction_price_crores DESC;

-- Pagination ************************

SELECT name, auction_price_crores
FROM ipl_team
ORDER BY auction_price_crores DESC
LIMIT 10 OFFSET 3;

-- Alias  ************************
SELECT name, auction_price_crores , (auction_price_crores * 100) AS auction_price_lakhs 
FROM ipl_team 
LIMIT 10;


--DISTINCT VALUES
SELECT DISTINCT role from ipl_team
```

<hr>

## Creating

```sql


-- CREATING TABLE
CREATE TABLE canteen_menu (
 item_id SERIAL PRIMARY KEY,
 item_name VARCHAR(100),
 category VARCHAR(50),
 price int,
 is_available BOOLEAN DEFAULT TRUE
)

```
<hr>

## INSERTING 

```sql

-- INSERTING VALUE
INSERT INTO canteen_menu (item_name, category, price)-- This paranthisis ask for name of the column in which you want to add the values
VALUES
('Masal Chai','Beverages', 10 ), -- This will take the value in the same order like first item_name and then category and then price 
('Burger','Snack', 80 ), -- This will take the value in the same order like first item_name and then category and then price 
('Pizza','Snack', 180 ),
('Cold Coffee','Beverages', 180 );
```

<hr>

## UPDATE 
```sql

-- UPDATING VALUE 
UPDATE canteen_menu
SET price = 20  -- Jisko Set krna hia 
WHERE item_name = 'Burger' -- and using where to  deifne whose price will be updated you  can also  use Id to specify 

UPDATE canteen_menu
SET price = price - 5
where category = 'Beverages';
```


<hr>

## DELETE
```sql
DELETE FROM canteen_menu
WHERE item_name = 'Cold Coffee';

```

>  NEVER Use Delete without where, wrna (table khali ho jayega)  


<hr>

## Aggregation

```sql
SELECT COUNT(*) as total_rows FROM ipl_team -- Return the number of rows 
SELECT SUM(auction_price_crores) as total_auction_pool FROM ipl_team -- Return the sun of auction_price_crores 
SELECT SUM (runs_scored * wicket_taken) as faltu_Calculation FROM ipl_team -- Multiply the runs_scored and wicket_taken

-- Average

SELECT AVG(auction_price_crores) as average_auction_price FROM ipl_team -- Average milega auction_price_crores ka.

SELECT MIN(auction_price_crores) as min_auction_price FROM ipl_team
SELECT MAX(auction_price_crores) as max_auction_price FROM ipl_team
```


<hr>

## GROUP BY
```sql
SELECT team, SUM(auction_price_crores) FROM ipl_team
GROUP BY team
-- Aggregation based on group (team)

-- Merg same team and then perform Sum on there auction_price_crores column
-- Same we can apply MIN, MAX, AVG, COUNT

SELECT team, COUNT(auction_price_crores) FROM ipl_team
GROUP BY team


SELECT team, MIN(auction_price_crores) FROM ipl_team
GROUP BY team


SELECT team, MAX(auction_price_crores) FROM ipl_team
GROUP BY team


SELECT team, AVG(auction_price_crores) FROM ipl_team
GROUP BY team

SELECT team, SUM(auction_price_crores) as total_auction_price FROM ipl_team
GROUP BY team
ORDER BY total_auction_price ASC

--- Multi Column
SELECT team, name , SUM(auction_price_crores) as total_auction_price from ipl_team
GROUP BY team, name,
ORDER BY total_auction_price DESC

```

> Using Having Keyword (Study For this its where clause for GROUP BY) 

<hr>

## IN Operator
- Include the values from a result set
```sql
SELECT * FROM ipl_team WHERE team IN ('CSK','MI','RR');
```

<hr>

## NOT IN Operator
- `NOT IN` in SQL is used to exclude values from a result set
```sql

SELECT team, name FROM ipl_team
WHERE team NOT IN ('MI', 'CSK','KKR')
```

<hr>

## Between Operator
The BETWEEN operator in SQL is used to filter values within a range (inclusive).

```sql
select name, price from products
where price BETWEEN 20 AND 100
```

<hr>

## Like Pattern Matching
Helps you to filter out the result based on some pattern, 
like here I  wanted the result where the name start with `A` 
To do so sql uses `%` with the char you want to check,
You can check 1st letter or second letter or 3rd letter or nth letter of the name 
`LIKE` is case sensitive
```sql
SELECT team, name from ipl_team
WHERE name LIKE 'A%';

-- Search by Second char 
SELECT team, name from ipl_team
WHERE name LIKE '_s%'  -- Return those result where the name will have 2nd letter as s 
```

## IS NULL
TO check if the value is null;
```sql
SELECT wicket_taken FROM ipl_team 
WHERE wicket_taken IS NULL
```
## IS NOT NULL
To check if the value is not null;

```sql
SELECT wicket_taken FROM ipl_team
WHERE wicket_taken IS NOT NULL
```


