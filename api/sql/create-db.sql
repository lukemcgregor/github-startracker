--
-- PostgreSQL database dump
--

-- Dumped from database version 10.0
-- Dumped by pg_dump version 10.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: startracker; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE startracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


\connect startracker

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: repo_stars; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE repo_stars (
    id integer NOT NULL,
    username text NOT NULL,
    repo text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT now() NOT NULL,
    stargazer_count text NOT NULL
);


--
-- Name: repo_stars_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE repo_stars_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: repo_stars_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE repo_stars_id_seq OWNED BY repo_stars.id;


--
-- Name: tracked_repos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE tracked_repos (
    id integer NOT NULL,
    username text NOT NULL,
    repo text NOT NULL
);


--
-- Name: tracked_repos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE tracked_repos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tracked_repos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE tracked_repos_id_seq OWNED BY tracked_repos.id;


--
-- Name: repo_stars id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY repo_stars ALTER COLUMN id SET DEFAULT nextval('repo_stars_id_seq'::regclass);


--
-- Name: tracked_repos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY tracked_repos ALTER COLUMN id SET DEFAULT nextval('tracked_repos_id_seq'::regclass);


--
-- Name: repo_stars repo_stars_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY repo_stars
    ADD CONSTRAINT repo_stars_pkey PRIMARY KEY (id);


--
-- Name: tracked_repos tracked_repos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY tracked_repos
    ADD CONSTRAINT tracked_repos_pkey PRIMARY KEY (id);


--
-- Name: repo_stars_username_repo_timestamp_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX repo_stars_username_repo_timestamp_idx ON repo_stars USING btree (username, repo, "timestamp");


--
-- Name: tracked_repos_username_repo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX tracked_repos_username_repo_idx ON tracked_repos USING btree (username, repo);


--
-- PostgreSQL database dump complete
--

