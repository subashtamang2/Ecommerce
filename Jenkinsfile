pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/subashtamang2/Ecommerce.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git "${GIT_REPO}"
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Serve App') {
            steps {
                bat 'nohup npx serve -s build -l 8000 > app.log 2>&1 &'
            }
        }
    }
}
