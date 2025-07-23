pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/subashtamang2/Ecommerce.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Serve App') {
            steps {
                sh 'nohup npx serve -s build -l 8000 > app.log 2>&1 &'
            }
        }
    }
}
