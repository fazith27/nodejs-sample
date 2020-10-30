pipeline {
  agent {
    docker { image 'node:14-alpine' }
  }
  stages{
    stage('Checkout') {
        checkout scm
    }
    stage('Test') {
        sh 'npm install'
        sh 'npm test'
        sh 'npm run lint'
        sh 'npm run cc'
    }
    stage('Build'){
        sh 'docker build -t app --no-cache .'
        sh 'docker save app > app.tar'
        sh 'mv app.tar ~/jenkins/artifact-repository'

    }
    stage('Deploy'){
        sh 'mv ~/jenkins/artifact-repository/app.tar .'
        sh 'docker load < app.tar'
        sh 'docker run -p 3000:3000 --name node app'
    }
  }
}