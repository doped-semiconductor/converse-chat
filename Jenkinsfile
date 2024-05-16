pipeline {
    agent any
    stages {
        stage('Cleaning') {
            steps {
                script {
                    echo 'Removing previously GitHub Repo'
                    bat 'IF EXIST ".git" (rmdir /s /q .git)'
                    bat 'IF EXIST "converse-chat" (rmdir /s /q converse-chat)'
                    // bat 'docker stop converse-db'
                    // bat 'docker rm converse-db'
                }
            }
        }
        stage('Git') {
            steps {
                script {
                    echo 'Cloning GitHub Repo'
                    bat 'git clone https://github.com/doped-semiconductor/converse-chat.git'
                    sleep(time: 20, unit: 'SECONDS')
                }
            }
        }
        stage('Database'){
            steps{
                script{
                    echo 'Build DB Image'
                    bat 'docker pull mysql:8'
                    dir('converse-chat/database')
                    {
                        bat "docker build -t getsreya/converse-db ."
                        bat "docker run -dp 127.0.0.1:3306:3306 --name converse-db getsreya/converse-db"
                    }
                }
                
            }
        }
        stage('Backend') {
            steps {
                echo 'Build maven project'
                dir('converse-chat/backend/converse') 
                {
                    sleep(time: 40, unit: 'SECONDS')
                    bat 'mvn clean install'
                    bat 'docker build -t getsreya/converse-backend . '
                    bat 'docker run -dp 127.0.0.1:8070:8070 --name converse-be getsreya/converse-backend'
                }
            }
        }
        stage('Frontend') {
            steps {
                echo 'Building frontend Docker image'
                dir('converse-chat/frontend/p2p-frotend-app') {
                    echo 'Changing to frontend directory'
                    bat "docker build -t getsreya/converse-frontend ."
                    bat "docker run --name converse-fe -dp 127.0.0.1:3000:3000 getsreya/converse-frontend"
                }
            }
        }
        stage('DockerHub') {
            steps {
                echo 'Pushing backend Docker image to DockerHub'
                script {
                    docker.withRegistry('', 'docker-hub-getsreya') {
                        bat 'docker push getsreya/converse-db'
                        bat 'docker push getsreya/converse-backend'
                        bat 'docker push getsreya/converse-frontend'
                    }
                }
            }
        }
    }
}