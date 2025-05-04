ALTER TABLE issue_reports
DROP COLUMN reported_by;

ALTER TABLE issue_reports
ADD COLUMN IF NOT EXISTS officer_id VARCHAR;