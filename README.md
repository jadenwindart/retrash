DB Migration

baseline
flyway baseline -url=jdbc:postgresql://localhost:5433/retrash -user=postgres -password=postgres -configFiles=./migrations/retrash/flyway.toml

migrate
flyway migrate -url=jdbc:postgresql://localhost:5433/retrash -user=postgres -password=postgres -configFiles=./migrations/retrash/flyway.toml

Info
flyway info -url=jdbc:postgresql://localhost:5433/retrash -user=postgres -password=postgres -configFiles=./migrations/retrash/flyway.toml