CREATE TABLE repo_stars (
    id serial NOT NULL PRIMARY KEY,
    username text NOT NULL,
    repo text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    stargazer_count text NOT NULL
);

CREATE TABLE tracked_repos (
    id sequence NOT NULL PRIMARY KEY,
    username text NOT NULL,
    repo text NOT NULL
);

CREATE UNIQUE INDEX repo_stars_username_repo_timestamp_idx ON repo_stars USING btree (username, repo, "timestamp");

CREATE UNIQUE INDEX tracked_repos_username_repo_idx ON tracked_repos USING btree (username, repo);