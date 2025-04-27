CREATE TABLE IF NOT EXISTS residents (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "resident_phonenumber_uidx" ON residents USING BTREE(phone_number);
CREATE INDEX IF NOT EXISTS "resident_name_idx" ON residents USING BTREE(name);
CREATE INDEX IF NOT EXISTS "resident_createdat_idx" ON residents USING BTREE(created_at);
CREATE INDEX IF NOT EXISTS "resident_updatedat_idx" ON residents USING BTREE(updated_at);

CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR PRIMARY KEY,
    amount NUMERIC NOT NULL,
    invoice_date DATE NOT NULL,
    last_sent_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR NOT NULL,
    resident_id VARCHAR NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "invoice_date_idx" ON invoices USING BTREE(invoice_date);
CREATE INDEX IF NOT EXISTS "invoice_resident_idx" ON invoices USING BTREE(resident_id);
CREATE INDEX IF NOT EXISTS "invoice_status_idx" ON invoices USING BTREE(status);
CREATE INDEX IF NOT EXISTS "invoice_createdat_idx" ON invoices USING BTREE(created_at);
CREATE INDEX IF NOT EXISTS "invoice_updatedat_idx" ON invoices USING BTREE(updated_at);

CREATE TABLE IF NOT EXISTS transactions (
    id VARCHAR PRIMARY KEY,
    invoice_id VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    paid_amount NUMERIC,
    transaction_timestamp TIMESTAMP WITH TIME ZONE,
    resident_id VARCHAR NOT NULL,
    is_manual BOOLEAN DEFAULT false,
    manual_officer VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "transaction_invoice_idx" ON transactions USING BTREE(invoice_id);
CREATE INDEX IF NOT EXISTS "transaction_transactiontimestamp_idx" ON transactions USING BTREE(transaction_timestamp);
CREATE INDEX IF NOT EXISTS "transaction_resident_idx" ON transactions USING BTREE(resident_id);
CREATE INDEX IF NOT EXISTS "transaction_createdat_idx" ON transactions USING BTREE(created_at);
CREATE INDEX IF NOT EXISTS "transaction_updatedat_idx" ON transactions USING BTREE(updated_at);

CREATE TABLE IF NOT EXISTS officers (
    id VARCHAR PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR,
    type VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS "officer_username_uidx" ON officers USING BTREE(username);
CREATE INDEX IF NOT EXISTS "officer_createdat_idx" ON officers USING BTREE(created_at);
CREATE INDEX IF NOT EXISTS "officer_updatedat_idx" ON officers USING BTREE(updated_at);

CREATE TABLE IF NOT EXISTS issue_reports(
    id VARCHAR PRIMARY KEY,
    reported_by VARCHAR NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "issue_reportedby_idx" ON issue_reports USING BTREE(reported_by);
CREATE INDEX IF NOT EXISTS "issue_createdat_idx" ON issue_reports USING BTREE(created_at);
CREATE INDEX IF NOT EXISTS "issue_updatedat_idx" ON issue_reports USING BTREE(updated_at);
