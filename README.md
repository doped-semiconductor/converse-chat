# Converse App

A P2P Temporary Chat App for Casual Data Transfer using Socket. Containerized versions of the database, frontend and backend applications are available on Docker Hub with easy to deploy instructions for Ubuntu and Windows.

## Table of Contents
- [Configuration](#configuration)
- [Docker Images](#docker)
- [Deployment](#deployment)

## Configuration

Setup:

1. **Database:**
    ```
    MySQL8
    DB Name: converse-db
    DB User: converse-sql-bot
    Port: 3306
    ```


2. **Backend:**
    ```
    mvn clean install
    java -jar target/converse-0.0.1-SNAPSHOT.jar
    Port: 8070
    ```

3. **Frontend:**
    ```
    npm run install
    npm run start
    Port: 3000
    ```

## Docker Images

The following docker images are publicly available for usage:

1. **Database:** 
    `getsreya/converse-db`
2. **Backend:** 
    `getsreya/converse-backend`
3. **Frontend:** 
    `getsreya/converse-frontend`

## Deployment

The following Jenkinsfile's can be used as an SCM based Pipeline for Deployment:
In the case of Ansible, the hosts and inventory file must be customized.

1. **Windows:** `deployment\windows\Jenkinsfile`
2. **Ubuntu:** `deployment\ubuntu\Jenkinsfile`
3. **Ansible(Ubuntu):** `deployment\ansible\Jenkinsfile`

