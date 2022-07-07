ALTER TABLE website_user DROP password_hash;
CREATE TABLE auth0_user (
  user_id integer NOT NULL REFERENCES website_user(user_id),
  auth0_id text NOT NULL
);