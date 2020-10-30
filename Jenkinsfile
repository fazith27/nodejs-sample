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
        sh 'docker save --output app.tar app'
        archiveArtifacts artifacts: 'app.tar', fingerprint: true
        sh 'mv app.tar ~/jenkins/artifact-repository'
      }
    }
    stage('Deploy : Explode archive docker image'){
      steps {        
        copyArtifacts fingerprintArtifacts: true, projectName: '${JOB_NAME}', selector: specific('${BUILD_NUMBER}')
        sh 'mkdir ~/jenkins/deployment/'
        sh 'mv app.tar ~/jenkins/deployment/'
        sh 'docker load --input ~/jenkins/deployment/app.tar'
      }
    }
  }
}