-- Up Migration

ALTER TABLE events RENAME COLUMN startdate TO "startDate";
ALTER TABLE events RENAME COLUMN enddate TO "endDate";
ALTER TABLE events RENAME COLUMN hallid TO "hallId";
ALTER TABLE events RENAME COLUMN createdat TO "createdAt";

ALTER TABLE seats RENAME COLUMN hallid TO "hallId";
ALTER TABLE seats RENAME COLUMN seatnumber TO "seatNumber";

ALTER TABLE halls RENAME COLUMN zipcode TO "zipCode";
ALTER TABLE halls RENAME COLUMN createdat TO "createdAt";

-- Down Migration

ALTER TABLE events RENAME COLUMN "startDate" TO startdate;
ALTER TABLE events RENAME COLUMN "endDate" TO enddate;
ALTER TABLE events RENAME COLUMN "hallId" TO hallid;
ALTER TABLE events RENAME COLUMN "createdAt" TO createdat;

ALTER TABLE seats RENAME COLUMN "hallId" TO hallid;
ALTER TABLE seats RENAME COLUMN "seatNumber" TO seatnumber;

ALTER TABLE halls RENAME COLUMN "zipCode" TO zipcode;
ALTER TABLE halls RENAME COLUMN "createdAt" TO createdat;