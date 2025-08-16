FROM postgres:15

COPY init.sql ./docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432