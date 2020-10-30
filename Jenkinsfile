pipeline {
  agent {
    docker { image 'node:14-alpine' }
  }
  stages{
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Unit Test, Linting and Code Coverage') {
      steps {
        sh 'npm install'
        sh 'npm test'
        sh 'npm run lint'
        sh 'npm run cc'
      }
    }
    stage('Build Docker Image'){
      steps {
        sh 'docker build -t app .'
        sh 'mkdir ~/jenkins && mkdir ~/jenkins/artifact-repository'
        sh 'docker save --output ~/jenkins/artifact-repository/app.tar app'
        archiveArtifacts artifacts: 'jenkins/artifact-repository/app.tar', fingerprint: true
      }
    }
    stage('Deploy : Explode archive docker image'){
      steps {
        sh 'mkdir ~/jenkins/deployment/'
        copyArtifacts fingerprintArtifacts: true, projectName: '${JOB_NAME}', selector: specific('${BUILD_NUMBER}')
        sh 'mv app.tar ~/jenkins/deployment/'
        sh 'docker load --input ~/jenkins/deployment/app.tar'
      }
    }
  }
}