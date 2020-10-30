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
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test'
        sh 'npm run lint'
        sh 'npm run cc'
      }
    }
    stage('Build'){
      steps {
        sh 'docker build -t app --no-cache .'
        sh 'mkdir ~/jenkins/artifact-repository/ && docker save --output ~/jenkins/artifact-repository/app.tar app'
        archiveArtifacts artifacts: '~/jenkins/artifact-repository/app.tar', fingerprint: true
      }
    }
    stage('Deploy'){
      steps {
        sh 'mkdir mkdir ~/jenkins/deployment/'
        copyArtifacts fingerprintArtifacts: true, projectName: '${JOB_NAME}', selector: specific('${BUILD_NUMBER}'), target : '~/jenkins/deployment/'
        sh 'docker load --input ~/jenkins/deployment/app.tar'
        sh 'docker run -p 3000:3000 --name node app'
      }
    }
  }
}